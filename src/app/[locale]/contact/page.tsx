import { type Locale } from "@/lib/i18n";
import { localizedAlternates, TRANSLATED_LOCALES } from "@/lib/seo";
import ContactForm from "./contact-form-v2";
import DynamicTitle from "./dynamic-title";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import type { ContactFormText } from "./contact-form-v2";

interface ContactContent {
  tag: string;
  title1: string;
  title2: string;
  description: string;
  titleByType: Record<string, [string, string]>;
  hq: string;
  seoul: string;
  phone: string;
  hqAddr: string;
  seoulAddr: string;
  inquiries: string;
  business: string;
  ir: string;
  cro: string;
  formTitle: string;
  name: string;
  email: string;
  company: string;
  type: string;
  message: string;
  submit: string;
  typeOptions: string[];
  form: ContactFormText;
  [key: string]: unknown;
}

type ContentMap = Record<string, ContactContent>;

const C: ContentMap = {
  ko: {
    tag: "문의하기", title1: "함께", title2: "꿈꾸기",
    description: "인간의 기본 존엄성인 통증 없는 삶을 지키기 위해, 첨단 막단백질 기술로 인류의 미래를 만드는 회사입니다. 이 철학과 비전을 함께할 파트너, 투자사, CRO 협력기관을 찾고 있습니다.",
    titleByType: {
      default: ["함께", "꿈꾸기"],
      "파트너십 / 라이선싱": ["함께", "만드는 혁신"],
      "투자 / IR": ["투자로", "여는 미래"],
      "CRO 서비스": ["치료로", "구하는 생명"],
      "기타": ["함께", "꿈꾸기"],
    },
    hq: "본사", seoul: "서울사무소", phone: "전화 / 팩스",
    hqAddr: "인천광역시 연수구 송도미래로 9, 1동 302호",
    seoulAddr: "서울시 금천구 가산디지털1로 145, 1001호",
    inquiries: "문의처", business: "사업 제휴", ir: "투자 / IR", cro: "CRO 서비스",
    formTitle: "메시지 보내기",
    name: "이름", email: "이메일", company: "회사", type: "문의 유형", message: "메시지", submit: "보내기",
    typeOptions: ["선택하세요", "파트너십 / 라이선싱", "투자 / IR", "CRO 서비스", "기타"],
    form: { stepOf: "3단계 중 {n}단계", contactTitle: "연락처", messageTitle: "문의 내용", next: "다음", back: "이전", sending: "전송 중", placeholder: "문의하실 내용을 적어 주세요.", trust: "안전하게 전송됩니다 · 영업일 기준 2일 안에 답변드립니다", success: "메시지를 보냈습니다. 곧 연락드리겠습니다.", errType: "문의 유형을 선택해 주세요.", errName: "이름을 2자 이상 입력해 주세요.", errEmail: "이메일 주소를 확인해 주세요.", errMessage: "메시지를 10자 이상 입력해 주세요.", errGeneric: "전송하지 못했습니다. 잠시 후 다시 시도해 주세요." },
  },
  en: {
    tag: "Get in Touch", title1: "Shape", title2: "Tomorrow",
    description: "Grounded in the philosophy that freedom from pain is fundamental to human dignity, we harness cutting-edge membrane protein technology to restore the quality of life and shape the future of humanity. We seek partners who share this vision.",
    titleByType: {
      default: ["Shape", "Tomorrow"],
      "Partnership / Licensing": ["Build", "Together"],
      "Investment / IR": ["Invest", "in Hope"],
      "CRO Services": ["Heal", "Lives"],
      "Other": ["Shape", "Tomorrow"],
    },
    hq: "Headquarters", seoul: "Seoul Office", phone: "Phone & Fax",
    hqAddr: "9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Bldg 1, #302, Republic of Korea",
    seoulAddr: "145 Gasan Digital 1-ro, Geumcheon-gu, Seoul, #1001, Republic of Korea",
    inquiries: "Inquiries", business: "Business", ir: "IR / Investment", cro: "CRO Services",
    formTitle: "Send a Message",
    name: "Name", email: "Email", company: "Company", type: "Inquiry Type", message: "Message", submit: "Send Message",
    typeOptions: ["Select...", "Partnership / Licensing", "Investment / IR", "CRO Services", "Other"],
    form: { stepOf: "Step {n} of 3", contactTitle: "Contact Information", messageTitle: "Your Message", next: "Next", back: "Back", sending: "Sending", placeholder: "Tell us more about your inquiry.", trust: "Secure submission · Reply within 2 business days", success: "Message sent. We will get back to you soon.", errType: "Please select an inquiry type.", errName: "Name must be at least 2 characters.", errEmail: "Please enter a valid email address.", errMessage: "Message must be at least 10 characters.", errGeneric: "Your message could not be sent. Please try again later." },
  },
  zh: {
    tag: "联系我们", title1: "塑造", title2: "未来",
    description: "基于无痛是人类基本尊严的哲学，我们运用尖端膜蛋白技术来恢复生活质量，塑造人类的未来。我们寻找志同道合的合作伙伴、投资者和CRO机构。",
    titleByType: {
      default: ["塑造", "未来"],
      "合作 / 许可": ["携手", "创新"],
      "投资 / IR": ["投资", "希望"],
      "CRO 服务": ["治愈", "生命"],
      "其他": ["塑造", "未来"],
    },
    hq: "总部", seoul: "首尔办公室", phone: "电话 / 传真",
    hqAddr: "9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Bldg 1, #302, Republic of Korea",
    seoulAddr: "145 Gasan Digital 1-ro, Geumcheon-gu, Seoul, #1001, Republic of Korea",
    inquiries: "联系方式", business: "商务合作", ir: "投资 / IR", cro: "CRO 服务",
    formTitle: "发送消息",
    name: "姓名", email: "邮箱", company: "公司", type: "咨询类型", message: "留言", submit: "发送",
    typeOptions: ["请选择…", "合作 / 许可", "投资 / IR", "CRO 服务", "其他"],
    form: { stepOf: "第 {n} 步，共 3 步", contactTitle: "联系信息", messageTitle: "留言内容", next: "下一步", back: "上一步", sending: "发送中", placeholder: "请告诉我们您的咨询内容。", trust: "安全提交 · 2 个工作日内回复", success: "消息已发送，我们会尽快与您联系。", errType: "请选择咨询类型。", errName: "姓名至少需要 2 个字符。", errEmail: "请输入有效的邮箱地址。", errMessage: "留言至少需要 10 个字符。", errGeneric: "发送失败，请稍后重试。" },
  },
  ja: {
    tag: "お問い合わせ", title1: "未来を", title2: "つくる",
    description: "痛みのない生活は人間の基本的な尊厳である、という哲学に基づき、先端的な膜タンパク質技術で生活の質を取り戻し、人類の未来を創造します。このビジョンを共有するパートナーを募集しています。",
    titleByType: {
      default: ["未来を", "つくる"],
      "パートナーシップ / ライセンシング": ["一緒に", "創造する"],
      "投資 / IR": ["投資で", "希望を"],
      "CROサービス": ["治療で", "命を"],
      "その他": ["未来を", "つくる"],
    },
    hq: "本社", seoul: "ソウルオフィス", phone: "電話 / FAX",
    hqAddr: "9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Bldg 1, #302, Republic of Korea",
    seoulAddr: "145 Gasan Digital 1-ro, Geumcheon-gu, Seoul, #1001, Republic of Korea",
    inquiries: "お問い合わせ先", business: "事業提携", ir: "投資 / IR", cro: "CROサービス",
    formTitle: "メッセージを送る",
    name: "お名前", email: "メールアドレス", company: "会社名", type: "お問い合わせ種別", message: "メッセージ", submit: "送信",
    typeOptions: ["選択してください…", "パートナーシップ / ライセンシング", "投資 / IR", "CROサービス", "その他"],
    form: { stepOf: "ステップ {n} / 3", contactTitle: "連絡先", messageTitle: "お問い合わせ内容", next: "次へ", back: "戻る", sending: "送信中", placeholder: "お問い合わせ内容をご記入ください。", trust: "安全に送信されます · 2営業日以内にご返信します", success: "メッセージを送信しました。担当者よりご連絡いたします。", errType: "お問い合わせ種別を選択してください。", errName: "お名前は2文字以上で入力してください。", errEmail: "有効なメールアドレスを入力してください。", errMessage: "メッセージは10文字以上で入力してください。", errGeneric: "送信できませんでした。しばらくしてから再度お試しください。" },
  },
  es: {
    tag: "Contáctenos", title1: "Moldear", title2: "el Futuro",
    description: "Basados en la filosofía de que una vida libre del dolor es fundamental para la dignidad humana, utilizamos tecnología de proteínas de membrana de vanguardia para restaurar la calidad de vida y moldear el futuro de la humanidad. Buscamos socios que compartan esta visión.",
    titleByType: {
      default: ["Moldear", "el Futuro"],
      "Alianza / Licencia": ["Construir", "Juntos"],
      "Inversión / IR": ["Invertir", "en Esperanza"],
      "Servicios CRO": ["Sanar", "Vidas"],
      "Otro": ["Moldear", "el Futuro"],
    },
    hq: "Sede Central", seoul: "Oficina de Seúl", phone: "Teléfono / Fax",
    hqAddr: "9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Bldg 1, #302, Republic of Korea",
    seoulAddr: "145 Gasan Digital 1-ro, Geumcheon-gu, Seoul, #1001, Republic of Korea",
    inquiries: "Consultas", business: "Negocios", ir: "Inversión / IR", cro: "Servicios CRO",
    formTitle: "Enviar un mensaje",
    name: "Nombre", email: "Correo electrónico", company: "Empresa", type: "Tipo de consulta", message: "Mensaje", submit: "Enviar",
    typeOptions: ["Seleccionar…", "Alianza / Licencia", "Inversión / IR", "Servicios CRO", "Otro"],
    form: { stepOf: "Paso {n} de 3", contactTitle: "Datos de contacto", messageTitle: "Su mensaje", next: "Siguiente", back: "Atrás", sending: "Enviando", placeholder: "Cuéntenos más sobre su consulta.", trust: "Envío seguro · Respuesta en 2 días hábiles", success: "Mensaje enviado. Nos pondremos en contacto pronto.", errType: "Seleccione un tipo de consulta.", errName: "El nombre debe tener al menos 2 caracteres.", errEmail: "Introduzca un correo electrónico válido.", errMessage: "El mensaje debe tener al menos 10 caracteres.", errGeneric: "No se pudo enviar el mensaje. Inténtelo de nuevo más tarde." },
  },
  fr: {
    tag: "Nous contacter", title1: "Façonner", title2: "l'Avenir",
    description: "Fondés sur la philosophie que la vie sans douleur est fondamentale à la dignité humaine, nous exploitons la technologie des protéines membranaires de pointe pour restaurer la qualité de vie et façonner l'avenir de l'humanité. Nous recherchons des partenaires qui partagent cette vision.",
    titleByType: {
      default: ["Façonner", "l'Avenir"],
      "Partenariat / Licence": ["Construire", "Ensemble"],
      "Investissement / IR": ["Investir", "dans l'Espoir"],
      "Services CRO": ["Guérir", "des Vies"],
      "Autre": ["Façonner", "l'Avenir"],
    },
    hq: "Siège social", seoul: "Bureau de Séoul", phone: "Téléphone / Fax",
    hqAddr: "9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Bldg 1, #302, Republic of Korea",
    seoulAddr: "145 Gasan Digital 1-ro, Geumcheon-gu, Seoul, #1001, Republic of Korea",
    inquiries: "Contacts", business: "Partenariats", ir: "Investissement / IR", cro: "Services CRO",
    formTitle: "Envoyer un message",
    name: "Nom", email: "E-mail", company: "Entreprise", type: "Type de demande", message: "Message", submit: "Envoyer",
    typeOptions: ["Sélectionner…", "Partenariat / Licence", "Investissement / IR", "Services CRO", "Autre"],
    form: { stepOf: "Étape {n} sur 3", contactTitle: "Coordonnées", messageTitle: "Votre message", next: "Suivant", back: "Retour", sending: "Envoi en cours", placeholder: "Décrivez votre demande.", trust: "Envoi sécurisé · Réponse sous 2 jours ouvrés", success: "Message envoyé. Nous vous répondrons rapidement.", errType: "Veuillez sélectionner un type de demande.", errName: "Le nom doit comporter au moins 2 caractères.", errEmail: "Veuillez saisir une adresse e-mail valide.", errMessage: "Le message doit comporter au moins 10 caractères.", errGeneric: "Le message n'a pas pu être envoyé. Veuillez réessayer plus tard." },
  },
  ar: {
    tag: "تواصل معنا", title1: "صُنع", title2: "المستقبل",
    description: "منطلقون من فلسفة أن التحرر من الألم أساس الكرامة الإنسانية، نستثمر في تقنية بروتينات الغشاء المتقدمة لاستعادة جودة الحياة وصياغة مستقبل البشرية. نبحث عن شركاء يتشاركون هذه الرؤية.",
    titleByType: {
      default: ["صُنع", "المستقبل"],
      "الشراكة / الترخيص": ["بناء", "معًا"],
      "الاستثمار / علاقات المستثمرين": ["استثمر", "في الأمل"],
      "خدمات CRO": ["عالج", "حياة"],
      "أخرى": ["صُنع", "المستقبل"],
    },
    hq: "المقر الرئيسي", seoul: "مكتب سيول", phone: "الهاتف والفاكس",
    hqAddr: "9 سونغدو ميري-رو، يونسو-غو، إنشون، مبنى 1، #302، جمهورية كوريا",
    seoulAddr: "145 غاسان ديجيتال 1-رو، غومشيون-غو، سيول، #1001، جمهورية كوريا",
    inquiries: "الاستفسارات", business: "الأعمال", ir: "العلاقات مع المستثمرين / الاستثمار", cro: "خدمات CRO",
    formTitle: "إرسال رسالة",
    name: "الاسم", email: "البريد الإلكتروني", company: "الشركة", type: "نوع الاستفسار", message: "الرسالة", submit: "إرسال الرسالة",
    typeOptions: ["اختر...", "الشراكة / الترخيص", "الاستثمار / علاقات المستثمرين", "خدمات CRO", "أخرى"],
    form: { stepOf: "الخطوة {n} من 3", contactTitle: "معلومات الاتصال", messageTitle: "رسالتك", next: "التالي", back: "رجوع", sending: "جارٍ الإرسال", placeholder: "أخبرنا المزيد عن استفسارك.", trust: "إرسال آمن · نرد خلال يومي عمل", success: "تم إرسال رسالتك. سنتواصل معك قريبًا.", errType: "يرجى اختيار نوع الاستفسار.", errName: "يجب أن يتكون الاسم من حرفين على الأقل.", errEmail: "يرجى إدخال بريد إلكتروني صالح.", errMessage: "يجب أن تتكون الرسالة من 10 أحرف على الأقل.", errGeneric: "تعذر إرسال الرسالة. يرجى المحاولة لاحقًا." },
  },
};

const META_TITLE: Record<string, string> = {
  ko: "문의하기 | RudaCure",
  en: "Contact | RudaCure",
  zh: "联系我们 | RudaCure",
  ja: "お問い合わせ | RudaCure",
  es: "Contacto | RudaCure",
  fr: "Contact | RudaCure",
  ar: "اتصل بنا | روداكير",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: META_TITLE[locale] ?? META_TITLE.en,
    alternates: localizedAlternates(locale, "/contact", TRANSLATED_LOCALES),
  };
}

// DESIGN.md > Components > Input Field. Border colour is supplied by the form
// (hairline at rest, danger on error) so the two never compete in one string.
const inputCls = "w-full bg-surface-sunken border rounded-lg px-4 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-[border-color,box-shadow] duration-200 disabled:opacity-60";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  // All seven locales have a content block here. The previous
  // toDataLocale() call collapsed zh/ja/es/fr/ar to English, so those pages
  // rendered the en block and read as duplicates of /en/contact.
  const c = C[loc as Locale] ?? C.en;

  return (
    <div className="pt-24">
      <BreadcrumbJsonLd locale={loc} navKey="nav.contact" path="/contact" />
      <section className="py-20 px-6 bg-surface-sunken">
        <div className="max-w-4xl mx-auto">
          <p className="section-label mb-4">{c.tag}</p>
          <DynamicTitle
            title1={c.title1}
            title2={c.title2}
            titleByType={c.titleByType}
          />
          <p className="text-lg text-ink-600 max-w-2xl leading-relaxed mb-16">{c.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="section-label section-label--muted mb-3">{c.hq}</h3>
                <p className="text-ink-600 text-sm leading-relaxed">{c.hqAddr}</p>
                <p className="text-ink-600 text-sm mt-2 num">Tel: 032-724-9070 | Fax: 032-724-9071</p>
                <div className="mt-4 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.5!2d126.656!3d37.381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7d5c5e5c5c5d%3A0x0!2z7J247LKc6rSR7Jet7IucIOyXsOyImOq1rCDrr7jrnpjroZwgOQ!5e0!3m2!1sko!2skr!4v1"
                    width="100%"
                    height="180"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="card p-6">
                <h3 className="section-label section-label--muted mb-3">{c.seoul}</h3>
                <p className="text-ink-600 text-sm leading-relaxed">{c.seoulAddr}</p>
                <p className="text-ink-600 text-sm mt-2 num">Tel: 02-2138-2115 | Fax: 02-2138-2551</p>
                <div className="mt-4 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5!2d126.882!3d37.478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3e5e5e5e5e5%3A0x0!2z7ISc7Jq47IucIOq4iOyynOq1rCDqsIDsgrDrlJTsp4Dthrgx66GcIDE0NQ!5e0!3m2!1sko!2skr!4v1"
                    width="100%"
                    height="180"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="card p-6">
                <h3 className="section-label section-label--muted mb-3">{c.inquiries}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3"><span className="text-ink-600 w-24 shrink-0">{c.business}</span><a href="mailto:sh.kim@rudacure.com" className="text-accent-deep font-medium hover:underline underline-offset-4" dir="ltr">sh.kim@rudacure.com</a></div>
                  <div className="flex items-center gap-3"><span className="text-ink-600 w-24 shrink-0">{c.ir}</span><a href="mailto:js.shin@rudacure.com" className="text-accent-deep font-medium hover:underline underline-offset-4" dir="ltr">js.shin@rudacure.com</a></div>
                  <div className="flex items-center gap-3"><span className="text-ink-600 w-24 shrink-0">{c.cro}</span><a href="mailto:jyshin@rudacure.com" className="text-accent-deep font-medium hover:underline underline-offset-4" dir="ltr">jyshin@rudacure.com</a></div>
                </div>
              </div>
            </div>

            <div className="card p-6 self-start">
              <h3 className="text-lg font-semibold mb-6 text-ink-900">{c.formTitle}</h3>
              <ContactForm c={c} inputCls={inputCls} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
