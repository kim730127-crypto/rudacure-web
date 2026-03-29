'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { headers } from 'next/headers'

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
// Initialize Resend
// ============================================================================

const RESEND_API_KEY = process.env.RESEND_API_KEY
if (!RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required for email service')
}
const resend = new Resend(RESEND_API_KEY)

// ============================================================================
// Rate Limiting (Simple In-Memory)
// ============================================================================
// For production with high volume, use Upstash Rate Limit:
// import { Ratelimit } from '@upstash/ratelimit'
// const ratelimit = new Ratelimit({...})

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()
const RATE_LIMIT_WINDOW = 3600000 // 1 hour in ms
const RATE_LIMIT_MAX = 3 // 3 submissions per hour per IP

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || now > entry.resetTime) {
    // New or expired entry
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (entry.count < RATE_LIMIT_MAX) {
    entry.count++
    return true
  }

  return false
}

// ============================================================================
// Helper Functions
// ============================================================================

const getClientIp = async (): Promise<string> => {
  const headersList = await headers()
  return (
    headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
    headersList.get('x-real-ip') ||
    headersList.get('cf-connecting-ip') ||
    'unknown'
  )
}

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
    // ========== SECURITY: Rate Limiting ==========
    const ip = await getClientIp()
    if (!checkRateLimit(ip)) {
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

    // ========== SEND EMAIL ==========
    const response = await resend.emails.send({
      from: 'contact@rudacure.com',
      to: recipientEmail,
      replyTo: data.email,
      subject,
      html: generateEmailHtml(data),
    })

    if (response.error) {
      // ========== SECURITY: Controlled Error Logging ==========
      console.error('Email send error', {
        code: response.error.name,
        // Do NOT log: message, full error object (may contain API key)
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
