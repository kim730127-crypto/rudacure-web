'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { checkBotId } from 'botid/server'

// ============================================================================
// Type Definitions & Validation
// ============================================================================

interface SubmitResult {
  success: boolean
  message: string
}

// Strict field length limits
const MAX_LENGTHS = {
  name: 100,
  email: 254,
  company: 200,
  type: 100,
  message: 5000,
  website: 100, // honeypot
}

// Valid inquiry types across all languages
const VALID_TYPES = new Set([
  'Partnership / Licensing',
  'Investment / IR',
  'CRO Services',
  '合作 / 许可',
  '投资 / IR',
  'CRO 服务',
  'パートナーシップ / ライセンシング',
  '投資 / IR',
  'CROサービス',
  'Alianza / Licencia',
  'Inversión / IR',
  'Servicios CRO',
  'Partenariat / Licence',
  'Investissement / IR',
  'Services CRO',
  '파트너십 / 라이선싱',
  '투자 / IR',
  'CRO 서비스',
])

// Type recipient mapping
const TYPE_RECIPIENT_MAP: Record<string, string> = {
  'Partnership / Licensing': 'sh.kim@rudacure.com',
  'Investment / IR': 'js.shin@rudacure.com',
  'CRO Services': 'jyshin@rudacure.com',
  '合作 / 许可': 'sh.kim@rudacure.com',
  '投资 / IR': 'js.shin@rudacure.com',
  'CRO 服务': 'jyshin@rudacure.com',
  'パートナーシップ / ライセンシング': 'sh.kim@rudacure.com',
  '投資 / IR': 'js.shin@rudacure.com',
  'CROサービス': 'jyshin@rudacure.com',
  'Alianza / Licencia': 'sh.kim@rudacure.com',
  'Inversión / IR': 'js.shin@rudacure.com',
  'Servicios CRO': 'jyshin@rudacure.com',
  'Partenariat / Licence': 'sh.kim@rudacure.com',
  'Investissement / IR': 'js.shin@rudacure.com',
  'Services CRO': 'jyshin@rudacure.com',
  '파트너십 / 라이선싱': 'sh.kim@rudacure.com',
  '투자 / IR': 'js.shin@rudacure.com',
  'CRO 서비스': 'jyshin@rudacure.com',
}

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().trim().min(1).max(MAX_LENGTHS.name),
  email: z.string().email().max(MAX_LENGTHS.email).toLowerCase(),
  company: z.string().trim().max(MAX_LENGTHS.company),
  type: z.string().max(MAX_LENGTHS.type),
  message: z.string().trim().min(1).max(MAX_LENGTHS.message),
  website: z.string().max(MAX_LENGTHS.website).optional(), // honeypot
})

// ============================================================================
// 메일 발송 - Microsoft Graph
// ============================================================================

/**
 * 2026-09-22. 발송 경로를 Resend 에서 Microsoft Graph 로 옮겼다.
 *
 * 바꿘 이유. 종전 코드는 `RESEND_API_KEY` 가 없으면 모듈 최상단에서 throw 했는데,
 * 'use server' 모듈이라 그 예외는 빌드가 아니라 방문자가 보내기를 누르는 순간에 터졌다.
 * 그리고 Vercel 프로젝트에는 환경변수가 하나도 없었다. Resend 계정 자체가 없었으므로
 * 사이트가 살아 있는 동안 문의는 전부 여기서 사라졌다고 봐야 한다.
 *
 * 회사는 이미 Microsoft 365 를 쓴다(MX 가 outlook, SPF 가 `-all`). 외부 발송 서비스를
 * 붙이려면 DKIM 레코드를 따로 심고 SPF 를 손대야 하지만, Graph 로 보내면 메일이
 * 테넌트 안에서 나가므로 DNS 를 건드릴 이유가 없다. 보낸 편지함에도 그대로 남는다.
 *
 * 인증은 Entra 앱 `rudacure-web-contact-mailer` 의 client credentials 방식이고,
 * Graph 권한은 Mail.Send 하나다.
 */
const MS_TENANT_ID = process.env.MS_TENANT_ID
const MS_CLIENT_ID = process.env.MS_CLIENT_ID
const MS_CLIENT_SECRET = process.env.MS_CLIENT_SECRET
const CONTACT_FROM_ADDRESS =
  process.env.CONTACT_FROM_ADDRESS || 'sh.kim@rudacure.com'

const mailerConfigured = Boolean(
  MS_TENANT_ID && MS_CLIENT_ID && MS_CLIENT_SECRET,
)

/** 토큰은 한 시간짜리라 매번 받지 않고 만료 60초 전까지 재사용한다. */
let cachedToken: { value: string; expiresAt: number } | null = null

const getGraphToken = async (): Promise<string | null> => {
  const now = Date.now()
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.value
  }

  const response = await fetch(
    `https://login.microsoftonline.com/${MS_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: MS_CLIENT_ID as string,
        client_secret: MS_CLIENT_SECRET as string,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    },
  )

  if (!response.ok) {
    // 본문에 secret 이 들어갈 수 있으므로 상태코드만 남긴다.
    console.error('Graph token request failed', { status: response.status })
    return null
  }

  const token = (await response.json()) as {
    access_token?: string
    expires_in?: number
  }
  if (!token.access_token) return null

  cachedToken = {
    value: token.access_token,
    expiresAt: now + (token.expires_in ?? 3600) * 1000,
  }
  return cachedToken.value
}

interface SendOutcome {
  ok: boolean
  status?: number
}

const sendViaGraph = async (args: {
  to: string
  replyTo: string
  subject: string
  html: string
}): Promise<SendOutcome> => {
  const token = await getGraphToken()
  if (!token) return { ok: false }

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(CONTACT_FROM_ADDRESS)}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          subject: args.subject,
          body: { contentType: 'HTML', content: args.html },
          toRecipients: [{ emailAddress: { address: args.to } }],
          replyTo: [{ emailAddress: { address: args.replyTo } }],
        },
        saveToSentItems: true,
      }),
    },
  )

  return { ok: response.status === 202, status: response.status }
}

// ============================================================================
// Rate Limiting
// ============================================================================
// 2026-11-04 보안 점검 F-04 반영. 방어는 네 겹이다.
//  1. Vercel Firewall 규칙 `contact-form-rate-limit` : 문의 페이지 POST 를 IP 당 10분 5회로
//     엣지에서 제한한다. 인스턴스가 여러 개여도 공유되는 유일한 카운터다(대시보드 설정).
//  2. BotID : 브라우저에서 실행된 요청인지 서버에서 확인한다(instrumentation-client.ts).
//  3. 아래 메모리 카운터 : IP 당 시간 3회, 같은 회신 주소 시간 3회, 인스턴스 전체 시간 30회.
//     서버리스 인스턴스마다 따로 세므로 보조 수단이다.
//  4. honeypot 과 링크 개수 검사.

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()
const RATE_LIMIT_WINDOW = 3600000 // 1 hour in ms
const RATE_LIMIT_MAX = 3 // 3 submissions per hour per IP

const GLOBAL_KEY = '__all__'
const GLOBAL_MAX = 30 // 인스턴스 한 개가 한 시간에 보내는 상한

const checkRateLimit = (ip: string, max: number = RATE_LIMIT_MAX): boolean => {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || now > entry.resetTime) {
    // New or expired entry
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (entry.count < max) {
    entry.count++
    return true
  }

  return false
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * 사이트는 Cloudflare 없이 Vercel 에 바로 붙어 있다(2026-11-04 DNS·응답 헤더 확인).
 * Vercel 이 직접 채우는 x-vercel-forwarded-for, x-real-ip 를 먼저 읽는다.
 * cf-connecting-ip 는 Cloudflare 를 거치지 않는 구성에서는 방문자가 마음대로 넣을 수
 * 있는 값이라 읽지 않는다.
 */
const getClientIp = async (): Promise<string> => {
  const headersList = await headers()
  return (
    headersList.get('x-vercel-forwarded-for')?.split(',')[0].trim() ||
    headersList.get('x-real-ip')?.trim() ||
    headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown'
  )
}

/** 본문 링크가 이보다 많으면 스팸으로 보고 조용히 버린다. */
const MAX_LINKS = 5
const countLinks = (text: string): number =>
  (text.match(/(https?:\/\/|www\.)/gi) || []).length

const sanitizeHeaderValue = (value: string): string => {
  // Remove newlines, tabs, and other header injection characters
  return value.replace(/[\r\n\t]/g, ' ').trim().slice(0, 200)
}

const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

// ============================================================================
// Email Generation & Sending
// ============================================================================

interface ContactFormData {
  name: string
  email: string
  company: string
  type: string
  message: string
  website?: string
}

const generateEmailHtml = (data: ContactFormData): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
          .header { background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #0d9488; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { margin-top: 5px; color: #555; }
          .message-box { background: #f3f4f6; padding: 15px; border-left: 4px solid #0d9488; margin: 20px 0; white-space: pre-wrap; word-break: break-word; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>

            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
            </div>

            <div class="field">
              <div class="label">Company</div>
              <div class="value">${escapeHtml(data.company)}</div>
            </div>

            <div class="field">
              <div class="label">Inquiry Type</div>
              <div class="value">${escapeHtml(data.type)}</div>
            </div>

            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${escapeHtml(data.message)}</div>
            </div>

            <div class="footer">
              <p>This message was sent through the RudaCure Contact Form.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

// ============================================================================
// Main Submit Handler
// ============================================================================

export async function submitContactForm(formData: unknown): Promise<SubmitResult> {
  try {
    // ========== SECURITY: Bot check (Vercel BotID) ==========
    const verification = await checkBotId()
    if (verification.isBot) {
      console.warn('Contact form blocked by BotID')
      return {
        success: false,
        message: 'Your request could not be verified. Please email us directly.',
      }
    }

    // ========== SECURITY: Rate Limiting ==========
    const ip = await getClientIp()
    if (!checkRateLimit(GLOBAL_KEY, GLOBAL_MAX) || !checkRateLimit(ip)) {
      return {
        success: false,
        message: 'Too many submissions. Please try again in 1 hour.',
      }
    }

    // ========== SECURITY: Honeypot ==========
    // If honeypot field is filled, silently succeed (don't reveal bot detection)
    if (formData && typeof formData === 'object' && 'website' in formData && formData.website) {
      return {
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.',
      }
    }

    // ========== SECURITY: Zod Validation ==========
    const parseResult = contactFormSchema.safeParse(formData)
    if (!parseResult.success) {
      // Return generic message to not expose schema details
      return {
        success: false,
        message: 'Invalid form data. Please check all fields and try again.',
      }
    }

    const data = parseResult.data

    // ========== SECURITY: Per-sender limit and link spam ==========
    if (!checkRateLimit(`email:${data.email}`)) {
      return {
        success: false,
        message: 'Too many submissions. Please try again in 1 hour.',
      }
    }
    if (countLinks(data.message) > MAX_LINKS) {
      // 봇에게 판정 결과를 알려 주지 않는다.
      console.warn('Contact form dropped: too many links')
      return {
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.',
      }
    }

    // ========== SECURITY: Type Validation ==========
    if (!VALID_TYPES.has(data.type)) {
      // Log unexpected type for monitoring
      console.warn('Unexpected inquiry type received', {
        type: data.type,
        ip,
      })
      // Silently use default type
      data.type = 'General Inquiry'
    }

    // ========== EMAIL ROUTING ==========
    const recipientEmail =
      TYPE_RECIPIENT_MAP[data.type] || TYPE_RECIPIENT_MAP['Partnership / Licensing']

    // ========== SECURITY: Header Injection Prevention ==========
    const safeType = sanitizeHeaderValue(data.type)
    const safeName = sanitizeHeaderValue(data.name)
    const subject = `New Inquiry - ${safeType} from ${safeName}`

    // ========== 발송 설정 확인 ==========
    if (!mailerConfigured) {
      console.error('Graph mailer env missing - contact form cannot send', { ip })
      return {
        success: false,
        message:
          'Mail delivery is temporarily unavailable. Please email us directly at ' +
          recipientEmail +
          '.',
      }
    }

    // ========== SEND EMAIL ==========
    const outcome = await sendViaGraph({
      to: recipientEmail,
      replyTo: data.email,
      subject,
      html: generateEmailHtml(data),
    })

    if (!outcome.ok) {
      // ========== SECURITY: Controlled Error Logging ==========
      console.error('Email send error', {
        status: outcome.status,
        // 응답 본문과 예외 객체는 남기지 않는다.
        ip,
      })

      return {
        success: false,
        message: 'Failed to send email. Please try again later.',
      }
    }

    return {
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
    }
  } catch (error) {
    // ========== SECURITY: Generic Error Response ==========
    console.error('Contact form error', {
      type: error instanceof Error ? error.name : typeof error,
      // Do NOT log: error.message, stack trace
    })

    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    }
  }
}
