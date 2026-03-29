import { type Locale, toDataLocale } from "@/lib/i18n";
import ContactForm from "./contact-form-v2";
import DynamicTitle from "./dynamic-title";

const C = {
  ko: {
    tag: "문의하기", title1: "함께", title2: "꿈꾸기",
    description: "인간의 기본 존엄성인 통증 없는 삶을 지키기 위해, 첨단 이온채널 기술로 인류의 미래를 만드는 회사입니다. 이 철학과 비전을 함께할 파트너, 투자사, CRO 협력기관을 찾고 있습니다.",
    titleByType: {
      default: ["함께", "꿈꾸기"],
      "파트너십 / 라이선싱": ["함께", "만드는 혁신"],
      "투자 / IR": ["투자로", "구하는 미래"],
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
  },
  en: {
    tag: "Get in Touch", title1: "Shape", title2: "Tomorrow",
    description: "Grounded in the philosophy that freedom from pain is fundamental to human dignity, we harness cutting-edge ion channel technology to restore the quality of life and shape the future of humanity. We seek partners who share this vision.",
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
  },
  zh: {
    tag: "联系我们", title1: "塑造", title2: "未来",
    description: "基于无痛是人类基本尊严的哲学，我们运用尖端离子通道技术来恢复生活质量，塑造人类的未来。我们寻找志同道合的合作伙伴、投资者和CRO机构。",
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
  },
  ja: {
    tag: "お問い合わせ", title1: "未来を", title2: "つくる",
    description: "痛みのない生活は人間の基本的な尊厳である、という哲学に基づき、先端的なイオンチャネル技術で生活の質を取り戻し、人類の未来を創造します。このビジョンを共有するパートナーを募集しています。",
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
  },
  es: {
    tag: "Contáctenos", title1: "Moldear", title2: "el Futuro",
    description: "Basados en la filosofía de que una vida libre del dolor es fundamental para la dignidad humana, utilizamos tecnología de canales iónicos de vanguardia para restaurar la calidad de vida y moldear el futuro de la humanidad. Buscamos socios que compartan esta visión.",
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
  },
  fr: {
    tag: "Nous contacter", title1: "Façonner", title2: "l'Avenir",
    description: "Fondés sur la philosophie que la vie sans douleur est fondamentale à la dignité humaine, nous exploitons la technologie des canaux ioniques de pointe pour restaurer la qualité de vie et façonner l'avenir de l'humanité. Nous recherchons des partenaires qui partagent cette vision.",
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
          <DynamicTitle
            title1={c.title1 as string}
            title2={c.title2 as string}
            titleByType={c.titleByType as Record<string, [string, string]>}
          />
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
