import { type Locale, toDataLocale } from "@/lib/i18n";
import ContactForm from "./contact-form-v2";

const C = {
  ko: {
    tag: "문의하기", title1: "Contact", title2: "Us",
    description: "파트너십, 라이선싱, 투자, CRO 서비스에 관한 문의를 환영합니다.",
    hq: "본사", seoul: "서울사무소", phone: "전화 / 팩스",
    hqAddr: "인천광역시 연수구 송도미래로 9, 1동 302호",
    seoulAddr: "서울시 금천구 가산디지털1로 145, 1001호",
    inquiries: "문의처", business: "사업 제휴", ir: "투자 / IR", cro: "CRO 서비스",
    formTitle: "메시지 보내기",
    name: "이름", email: "이메일", company: "회사", type: "문의 유형", message: "메시지", submit: "보내기",
    typeOptions: ["선택하세요", "파트너십 / 라이선싱", "투자 / IR", "CRO 서비스", "기타"],
  },
  en: {
    tag: "Get in Touch", title1: "Contact", title2: "Us",
    description: "We welcome inquiries regarding partnerships, licensing, investment, and CRO services.",
    hq: "Headquarters", seoul: "Seoul Office", phone: "Phone & Fax",
    hqAddr: "9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Bldg 1, #302, Republic of Korea",
    seoulAddr: "145 Gasan Digital 1-ro, Geumcheon-gu, Seoul, #1001, Republic of Korea",
    inquiries: "Inquiries", business: "Business", ir: "IR / Investment", cro: "CRO Services",
    formTitle: "Send a Message",
    name: "Name", email: "Email", company: "Company", type: "Inquiry Type", message: "Message", submit: "Send Message",
    typeOptions: ["Select...", "Partnership / Licensing", "Investment / IR", "CRO Services", "Other"],
  },
  zh: {
    tag: "联系我们", title1: "Contact", title2: "Us",
    description: "欢迎咨询合作、许可、投资和CRO服务相关事宜。",
    hq: "总部", seoul: "首尔办公室", phone: "电话 / 传真",
    hqAddr: "9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Bldg 1, #302, Republic of Korea",
    seoulAddr: "145 Gasan Digital 1-ro, Geumcheon-gu, Seoul, #1001, Republic of Korea",
    inquiries: "联系方式", business: "商务合作", ir: "投资 / IR", cro: "CRO 服务",
    formTitle: "发送消息",
    name: "姓名", email: "邮箱", company: "公司", type: "咨询类型", message: "留言", submit: "发送",
    typeOptions: ["请选择…", "合作 / 许可", "投资 / IR", "CRO 服务", "其他"],
  },
  ja: {
    tag: "お問い合わせ", title1: "Contact", title2: "Us",
    description: "パートナーシップ、ライセンシング、投資、CROサービスに関するお問い合わせを歓迎いたします。",
    hq: "本社", seoul: "ソウルオフィス", phone: "電話 / FAX",
    hqAddr: "9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Bldg 1, #302, Republic of Korea",
    seoulAddr: "145 Gasan Digital 1-ro, Geumcheon-gu, Seoul, #1001, Republic of Korea",
    inquiries: "お問い合わせ先", business: "事業提携", ir: "投資 / IR", cro: "CROサービス",
    formTitle: "メッセージを送る",
    name: "お名前", email: "メールアドレス", company: "会社名", type: "お問い合わせ種別", message: "メッセージ", submit: "送信",
    typeOptions: ["選択してください…", "パートナーシップ / ライセンシング", "投資 / IR", "CROサービス", "その他"],
  },
  es: {
    tag: "Contáctenos", title1: "Contact", title2: "Us",
    description: "Damos la bienvenida a consultas sobre alianzas, licencias, inversión y servicios CRO.",
    hq: "Sede Central", seoul: "Oficina de Seúl", phone: "Teléfono / Fax",
    hqAddr: "9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Bldg 1, #302, Republic of Korea",
    seoulAddr: "145 Gasan Digital 1-ro, Geumcheon-gu, Seoul, #1001, Republic of Korea",
    inquiries: "Consultas", business: "Negocios", ir: "Inversión / IR", cro: "Servicios CRO",
    formTitle: "Enviar un mensaje",
    name: "Nombre", email: "Correo electrónico", company: "Empresa", type: "Tipo de consulta", message: "Mensaje", submit: "Enviar",
    typeOptions: ["Seleccionar…", "Alianza / Licencia", "Inversión / IR", "Servicios CRO", "Otro"],
  },
  fr: {
    tag: "Nous contacter", title1: "Contact", title2: "Us",
    description: "Nous accueillons les demandes concernant les partenariats, les licences, l'investissement et les services CRO.",
    hq: "Siège social", seoul: "Bureau de Séoul", phone: "Téléphone / Fax",
    hqAddr: "9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Bldg 1, #302, Republic of Korea",
    seoulAddr: "145 Gasan Digital 1-ro, Geumcheon-gu, Seoul, #1001, Republic of Korea",
    inquiries: "Contacts", business: "Partenariats", ir: "Investissement / IR", cro: "Services CRO",
    formTitle: "Envoyer un message",
    name: "Nom", email: "E-mail", company: "Entreprise", type: "Type de demande", message: "Message", submit: "Envoyer",
    typeOptions: ["Sélectionner…", "Partenariat / Licence", "Investissement / IR", "Services CRO", "Autre"],
  },
};

const META_TITLE: Record<string, string> = {
  ko: "문의하기 | RudaCure",
  en: "Contact | RudaCure",
  zh: "联系我们 | RudaCure",
  ja: "お問い合わせ | RudaCure",
  es: "Contacto | RudaCure",
  fr: "Contact | RudaCure",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: META_TITLE[locale] ?? META_TITLE.en };
}

// 2026 Trending: Elevated Neutrals + Blue-Green accents
const inputCls = "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 dark:focus:ring-cyan-400/30 focus:outline-none transition-all duration-200";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = toDataLocale(loc as Locale);
  const c = C[locale];

  return (
    <div className="pt-24">
      {/* 2026 Trend: Elevated Neutral Background */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* 2026 Blue-Green trend */}
          <p className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{c.tag}</p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900 dark:text-slate-100">
            <em className="font-playfair italic font-semibold">{c.title1}</em> {c.title2}
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-16">{c.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* 2026 Trend: Liquid Glass + Dark Mode */}
              <div className="liquid-glass p-6 dark:bg-slate-900/40 dark:backdrop-blur-lg dark:border dark:border-slate-700/50">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">{c.hq}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{c.hqAddr}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">Tel: 032-724-9070 | Fax: 032-724-9071</p>
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
              {/* 2026 Trend: Liquid Glass + Dark Mode */}
              <div className="liquid-glass p-6 dark:bg-slate-900/40 dark:backdrop-blur-lg dark:border dark:border-slate-700/50">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">{c.seoul}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{c.seoulAddr}</p>
                <p className="text-gray-600 text-sm mt-2">Tel: 02-2138-2115 | Fax: 02-2138-2551</p>
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
              {/* 2026 Trend: Liquid Glass + Dark Mode */}
              <div className="liquid-glass p-6 dark:bg-slate-900/40 dark:backdrop-blur-lg dark:border dark:border-slate-700/50">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">{c.inquiries}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3"><span className="text-gray-600 w-24">{c.business}</span><span className="text-teal-600 font-medium">sh.kim@rudacure.com</span></div>
                  <div className="flex items-center gap-3"><span className="text-gray-600 w-24">{c.ir}</span><span className="text-teal-600 font-medium">js.shin@rudacure.com</span></div>
                  <div className="flex items-center gap-3"><span className="text-gray-600 w-24">{c.cro}</span><span className="text-teal-600 font-medium">jyshin@rudacure.com</span></div>
                </div>
              </div>
            </div>

            <div className="liquid-glass p-6">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">{c.formTitle}</h3>
              <ContactForm c={c} inputCls={inputCls} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
