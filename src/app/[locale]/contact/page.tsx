import { type Locale } from "@/lib/i18n";

const C = {
  ko: {
    tag: "문의하기", title1: "Contact", title2: "Us",
    description: "파트너십, 라이선싱, 투자, CRO 서비스에 관한 문의를 환영합니다.",
    hq: "본사", seoul: "서울사무소", phone: "전화 / 팩스",
    inquiries: "문의처", business: "사업 제휴", ir: "투자 / IR", cro: "CRO 서비스",
    formTitle: "메시지 보내기",
    name: "이름", email: "이메일", company: "회사", type: "문의 유형", message: "메시지", submit: "보내기",
    typeOptions: ["선택하세요", "파트너십 / 라이선싱", "투자 / IR", "CRO 서비스", "기타"],
  },
  en: {
    tag: "Get in Touch", title1: "Contact", title2: "Us",
    description: "We welcome inquiries regarding partnerships, licensing, investment, and CRO services.",
    hq: "Headquarters", seoul: "Seoul Office", phone: "Phone & Fax",
    inquiries: "Inquiries", business: "Business", ir: "IR / Investment", cro: "CRO Services",
    formTitle: "Send a Message",
    name: "Name", email: "Email", company: "Company", type: "Inquiry Type", message: "Message", submit: "Send Message",
    typeOptions: ["Select...", "Partnership / Licensing", "Investment / IR", "CRO Services", "Other"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Contact | RudaCure" : "문의하기 | RudaCure" };
}

const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 focus:outline-none transition-colors";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = (loc === "en" ? "en" : "ko") as Locale;
  const c = C[locale];

  return (
    <div className="pt-24">
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">{c.tag}</p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
            <em className="font-['Playfair_Display'] italic font-semibold">{c.title1}</em> {c.title2}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-16">{c.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{c.hq}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">인천광역시 연수구 미래로 9, 1동 302호</p>
                <p className="text-gray-500 text-sm mt-2">Tel: 032-724-9070 | Fax: 032-724-9071</p>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{c.seoul}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">서울시 금천구 가산디지털1로 145, 1001호</p>
                <p className="text-gray-500 text-sm mt-2">Tel: 02-2138-2115 | Fax: 02-2138-2551</p>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{c.inquiries}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3"><span className="text-gray-400 w-24">{c.business}</span><span className="text-teal-600 font-medium">sh.kim@rudacure.com</span></div>
                  <div className="flex items-center gap-3"><span className="text-gray-400 w-24">{c.ir}</span><span className="text-teal-600 font-medium">js.shin@rudacure.com</span></div>
                  <div className="flex items-center gap-3"><span className="text-gray-400 w-24">{c.cro}</span><span className="text-teal-600 font-medium">jyshin@rudacure.com</span></div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">{c.formTitle}</h3>
              <form className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">{c.name}</label>
                  <input type="text" className={inputCls} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">{c.email}</label>
                  <input type="email" className={inputCls} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">{c.company}</label>
                  <input type="text" className={inputCls} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">{c.type}</label>
                  <select className={inputCls}>
                    {c.typeOptions.map((opt, i) => <option key={i} value={i === 0 ? "" : opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">{c.message}</label>
                  <textarea rows={4} className={`${inputCls} resize-none`} />
                </div>
                <button type="submit" className="btn-primary w-full py-3 rounded-lg font-semibold text-sm">{c.submit}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
