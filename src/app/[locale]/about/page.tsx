import { type Locale, toDataLocale } from "@/lib/i18n";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
  events?: { month: string; text: string }[];
};

const TIMELINE: Record<string, TimelineItem[]> = {
  ko: [
    {
      year: "2026",
      title: "임상 2상 & 글로벌 확장",
      highlight: true,
      description:
        "RCI001 FDA Phase 2 중간 결과. RuCIA 플랫폼 희귀 감각질환 확장. 일본/유럽 라이선싱.",
      events: [
        { month: "Q1", text: "Bio China 글로벌 파트너링" },
        { month: "Q2", text: "IFRS 전환 및 내부통제 구축" },
      ],
    },
    {
      year: "2025",
      title: "임상 & IPO 마일스톤",
      description:
        "RCI001 FDA Phase 2 승인. IPO 주관사 선정. 인천 우수기업·하이서울기업 인증.",
      events: [
        { month: "01월", text: "2025 시무식 및 우수사원·모범사원 시상" },
        { month: "02월", text: "포스텍 권도훈 교수 TRPV1 구조분석 세미나" },
        {
          month: "03월",
          text: "RCI001 임상 2상 자문회의 (안과 전문의 13인). Bio-Europe Spring 참석 및 프랑스 동물의약품 회사 미팅",
        },
        { month: "04월", text: "ESG 경영 실천 — 안양천 플로깅 & 헌혈 캠페인" },
        {
          month: "05월",
          text: "농식품벤처육성사업 선정 (동물용 유전자 진통제). Bio-Korea 부스 운영. 신테카바이오 산학연 R&D 선정",
        },
        {
          month: "06월",
          text: "BIO-USA 글로벌 파트너링 (Santen·Thea). 유럽건성안학회 RCI001 발표",
        },
        {
          month: "07월",
          text: "7주년 창립기념식 및 5년 장기근속자 포상. 상반기 업무평가 워크샵",
        },
        {
          month: "08월",
          text: "RCI001 FDA Phase 2 IND 승인 획득. DT&CRO 연구협력 MOU. 일본 원천 특허 등록 완료",
        },
        {
          month: "10월",
          text: "하이서울기업 인증. Pain Therapeutics Summit 참석",
        },
        {
          month: "11월",
          text: "인천시 우수기업 선정. SfN 학회 차세대 진통제 연구 발표",
        },
        {
          month: "12월",
          text: "IPO 주관사 선정 PT. 유기묘 보호시설 사료 1톤 기부 (CSR)",
        },
      ],
    },
    {
      year: "2024",
      title: "임상 검증 & 유니콘 선정",
      description:
        "RCI001 국내 임상 1상 돌입. 아기유니콘 선정. 스케일업 TIPS 12억원.",
      events: [
        { month: "01월", text: "2024 시무식 개최" },
        {
          month: "03월",
          text: "RCI001 국내 임상 1상 승인. 프랑스 동물의약품 회사 방문 (동물용 RCI001AH 공동연구)",
        },
        { month: "04월", text: "IBK창공 유럽 액셀러레이팅 프로그램 선정" },
        {
          month: "05월",
          text: "ESG 경영 본격 실천. Bio-Korea 바이오헬스 특별관 참가",
        },
        {
          month: "06월",
          text: "중소벤처기업부 '아기유니콘' 선정. BIO-USA 2024 참석",
        },
        {
          month: "10월",
          text: "스케일업 TIPS 선정 (3년간 12억원). 쇼그렌 증후군 모델 RCI001 효능 입증",
        },
        {
          month: "12월",
          text: "코어 이노베이션 코리아 2024 최우수상. 신테카바이오 항암제 물질 발굴 계약",
        },
      ],
    },
    {
      year: "2023",
      title: "전략적 파트너십 & 글로벌 진출",
      description:
        "한림제약 기술이전 2건. 동물의약품 사업 착수. ACR 학회 발표.",
      events: [
        {
          month: "01월",
          text: "한림제약 각막손상 치료제 RCI001U 기술이전 계약. 한림제약 Rac1 저해제 70억 L/O",
        },
        { month: "02월", text: "통증 신규 펩타이드 특허 출원" },
        {
          month: "03월",
          text: "동물의약품 개발사 온힐·온힐펫과 협력. Bio-EU 파트너링",
        },
        {
          month: "04월",
          text: "고용노동부 강소기업 선정. 창업도약패키지 선정",
        },
        { month: "05월", text: "다래전략사업화센터 기술특례 컨설팅 계약" },
        { month: "06월", text: "ASCO 미국 임상종양학회 사절단 참석" },
        { month: "09월", text: "점안제 특허 출원 완료" },
        {
          month: "10월",
          text: "서울형 기술사업화 지원사업 선정. 안암병원 김동현 교수 RCI001 장기 안전성 입증. 싱가포르 Global Innovation Roadshow",
        },
        {
          month: "11월",
          text: "ACR 학회 TRPV1 골관절염 치료제 발표. KICDC/Defy Pitch 수상. 바이오유럽 2023 참석",
        },
        {
          month: "12월",
          text: "한림대춘천성심병원-이온셀 CAR-T/ADC 공동연구 MOU",
        },
      ],
    },
    {
      year: "2022",
      title: "투자유치 & 글로벌 인지도",
      description: "시리즈A 60억원 투자유치. RESI 3위 입상. 미국 임상 준비.",
      events: [
        {
          month: "02월",
          text: "JPM 미팅 성황. KIC 워싱턴 바이오 스타트업 챌린지",
        },
        {
          month: "04월",
          text: "신한 스퀘어브릿지 인천 선정. INNOBIZ 인증. KIC 워싱턴 협력 미팅",
        },
        { month: "05월", text: "시리즈A 60억원 투자유치. ARVO 학회 참석" },
        {
          month: "06월",
          text: "BIO-USA 한국관 참가. RCI001 안구건조증 혁신 신약 주목",
        },
        {
          month: "08월",
          text: "UKC 2022 IR Competition SBA상 수상. 서울 가산 사무소 이전. 가천대 공동연구 국가신약과제 선정",
        },
        { month: "09월", text: "RESI Innovator's Pitch Challenge 3위 입상" },
        { month: "10월", text: "TRPV1 특허 일본/중국 출원" },
        { month: "11월", text: "인재육성형 중소기업 선정" },
        { month: "12월", text: "가족친화인증 및 청년친화 강소기업 선정" },
      ],
    },
    {
      year: "2021",
      title: "기술이전 & 미국 법인 설립",
      description:
        "한림제약 150억원 규모 기술이전. RudaCure U.S.A. 설립. 다수 정부과제 선정.",
      events: [
        {
          month: "01월",
          text: "선바이오 비임상 CRO 연간계약. TRPV1 특허 미국 출원",
        },
        {
          month: "03월",
          text: "미국 임상 CRO(Ora) 업무계약. 인천스타트업파크 이주",
        },
        {
          month: "04월",
          text: "한림제약 150억원 규모 RCI001 기술이전 계약. 김동현 교수 Nature 자매지 논문 발표. 바이오의료기술개발사업 선정",
        },
        {
          month: "05월",
          text: "Big3 사업화 과제 선정. 의사창업 공동연구 기반구축",
        },
        {
          month: "06월",
          text: "김동현 전무 TOFS 위원회 멤버 선정. BioKorea 참석",
        },
        {
          month: "08월",
          text: "RudaCure U.S.A. Inc 설립. 과기부 감염병 대응 플랫폼 과제 선정. 바이오아이코어사업 선정",
        },
        {
          month: "12월",
          text: "국내 TRPV1 특허 확보. 김동현 교수 외안부학회 학술상·태준안과논문상 최우수상",
        },
      ],
    },
    {
      year: "2020",
      title: "파이프라인 구축",
      description:
        "RCI001 임상시험 기반 마련. BIG3 혁신성장 선정. 인천스타트업파크 입주.",
      events: [
        { month: "02월", text: "통증·안질환 신약연구 본격화" },
        {
          month: "06월",
          text: "R&D 재발견 프로젝트 선정. BIG3 혁신분야 창업패키지 선정",
        },
        {
          month: "07월",
          text: "RCI001 임상시험 기반 마련. 인천스타트업파크 입주 (Boost Startup Journey)",
        },
        { month: "08월", text: "글로벌 IP 지원 프로그램 선정" },
        {
          month: "12월",
          text: "선바이오 MucoPEG 미국임상 수탁 계약. 인천시 R&D 컨설팅 지원사업 선정",
        },
      ],
    },
    {
      year: "2019",
      title: "초기 연구 & 기술이전",
      description: "길병원 안질환 특허 기술이전. 아시아 통증 심포지엄 개최.",
      events: [
        {
          month: "12월",
          text: "길병원 노인성 안질환 특허 기술이전 계약. 아시아 통증 심포지엄 인천 송도 개최. 분당차병원 척추질환 재생치료제 공동개발",
        },
      ],
    },
    {
      year: "2018",
      title: "창립",
      description:
        "김용호 대표(가천대학교) 설립. 이온채널 표적 통증/감각질환 치료제 연구 시작.",
    },
  ],
  en: [
    {
      year: "2026",
      title: "Phase 2 Clinical & Global Expansion",
      highlight: true,
      description:
        "RCI001 FDA Phase 2 interim results. RuCIA platform expansion into rare sensory diseases. Japan/Europe licensing deals.",
      events: [
        { month: "Q1", text: "BioChina global partnership" },
        {
          month: "Q2",
          text: "IFRS conversion & internal control infrastructure",
        },
      ],
    },
    {
      year: "2025",
      title: "Clinical & IPO Milestones",
      description:
        "RCI001 FDA Phase 2 IND approval. IPO underwriter selection. Incheon Outstanding Company & Hi-Seoul certification.",
      events: [
        {
          month: "Jan",
          text: "2025 New Year ceremony & Outstanding/Model Employee awards",
        },
        {
          month: "Feb",
          text: "POSTECH Prof. Kwon TRPV1 structural analysis seminar",
        },
        {
          month: "Mar",
          text: "RCI001 Phase 2 advisory meeting (13 ophthalmologists). Bio-Europe Spring & French Veterinary Pharma meeting",
        },
        {
          month: "Apr",
          text: "ESG activities — Anyang Stream plogging & blood donation campaign",
        },
        {
          month: "May",
          text: "Agri-Food Venture Program selected (veterinary gene therapy). Bio-Korea booth. Syntekabio Collabo R&D",
        },
        {
          month: "Jun",
          text: "BIO-USA global partnering (Santen, Thea). European Dry Eye Society — RCI001 presentation",
        },
        {
          month: "Jul",
          text: "7th anniversary celebration & 5-year service awards. H1 performance review workshop",
        },
        {
          month: "Aug",
          text: "RCI001 FDA Phase 2 IND approval. DT&CRO research MOU signed. Japan patent registered",
        },
        {
          month: "Oct",
          text: "Hi-Seoul Enterprise certification. Pain Therapeutics Summit attendance",
        },
        {
          month: "Nov",
          text: "Incheon Outstanding Company award. SfN next-gen pain therapeutics presentation",
        },
        {
          month: "Dec",
          text: "IPO underwriter selection. 1-ton cat food donation to stray cat shelter (CSR)",
        },
      ],
    },
    {
      year: "2024",
      title: "Clinical Validation & Unicorn Selection",
      description:
        "RCI001 domestic Phase 1 clinical trial. Baby Unicorn designation. Scale-up TIPS KRW 1.2B.",
      events: [
        { month: "Jan", text: "2024 New Year ceremony" },
        {
          month: "Mar",
          text: "RCI001 domestic Phase 1 clinical trial approval. Visit to French Veterinary Pharma (RCI001AH co-development)",
        },
        { month: "Apr", text: "IBK Innovation Hub Europe accelerator program" },
        {
          month: "May",
          text: "ESG management initiatives launched. Bio-Korea BioHealth pavilion",
        },
        {
          month: "Jun",
          text: "Selected as 'Baby Unicorn' by Ministry of SMEs. BIO-USA 2024 attendance",
        },
        {
          month: "Oct",
          text: "Scale-up TIPS selected (KRW 1.2B over 3 years). RCI001 efficacy in Sjögren's syndrome model",
        },
        {
          month: "Dec",
          text: "Core Innovation Korea 2024 Grand Prize. Syntekabio anticancer drug discovery contract",
        },
      ],
    },
    {
      year: "2023",
      title: "Strategic Partnerships & Global Reach",
      description:
        "Two Hanlim Pharma tech transfers. Veterinary pharma initiative. ACR conference presentation.",
      events: [
        {
          month: "Jan",
          text: "Hanlim Pharma corneal treatment RCI001U tech transfer. Rac1 inhibitor KRW 7B L/O deal",
        },
        { month: "Feb", text: "Novel pain peptide patent filed" },
        {
          month: "Mar",
          text: "Veterinary pharma partnership with Onheal/OnhealPet. Bio-EU partnering",
        },
        {
          month: "Apr",
          text: "Ministry of Employment Strong SME designation. Startup Leap Package selection",
        },
        {
          month: "May",
          text: "Darae Strategic Center tech consulting agreement",
        },
        { month: "Jun", text: "ASCO clinical oncology delegation" },
        { month: "Sep", text: "Eye drop formulation patent filed" },
        {
          month: "Oct",
          text: "Seoul tech commercialization program. Prof. Kim RCI001 long-term safety study. Singapore Global Innovation Roadshow",
        },
        {
          month: "Nov",
          text: "ACR — TRPV1 osteoarthritis therapeutic presentation. KICDC/Defy Pitch Prize. Bio-Europe 2023",
        },
        {
          month: "Dec",
          text: "Hallym Univ. Hospital-IonCell CAR-T/ADC co-research MOU",
        },
      ],
    },
    {
      year: "2022",
      title: "Investment & Global Recognition",
      description:
        "Series A KRW 6B raised. RESI 3rd place. US clinical preparations.",
      events: [
        {
          month: "Feb",
          text: "JPM conference meetings. KIC Washington bio startup challenge",
        },
        {
          month: "Apr",
          text: "Shinhan Square Bridge Incheon. INNOBIZ certification. KIC Washington partnership",
        },
        {
          month: "May",
          text: "Series A KRW 6B investment raised. ARVO conference",
        },
        {
          month: "Jun",
          text: "BIO-USA Korean pavilion. RCI001 dry eye innovation drug spotlight",
        },
        {
          month: "Aug",
          text: "UKC 2022 IR Competition SBA Award. Seoul Gasan office relocation. Gachon Univ. national drug project",
        },
        { month: "Sep", text: "RESI Innovator's Pitch Challenge — 3rd place" },
        { month: "Oct", text: "TRPV1 patent filed in Japan/China" },
        { month: "Nov", text: "Talent-Nurturing SME designation" },
        {
          month: "Dec",
          text: "Family-Friendly certification & Youth-Friendly Strong SME",
        },
      ],
    },
    {
      year: "2021",
      title: "Tech Transfer & US Subsidiary",
      description:
        "Hanlim Pharma KRW 15B tech transfer. RudaCure U.S.A. established. Multiple government grants.",
      events: [
        {
          month: "Jan",
          text: "SunBio preclinical CRO annual contract. TRPV1 US patent filed",
        },
        {
          month: "Mar",
          text: "US clinical CRO (Ora) contract. Relocated to Incheon Startup Park",
        },
        {
          month: "Apr",
          text: "Hanlim Pharma KRW 15B RCI001 tech transfer. Prof. Kim Nature sister journal paper. Bio-Medical Tech Development project",
        },
        {
          month: "May",
          text: "BIG3 commercialization project. Doctor-startup co-research program",
        },
        {
          month: "Jun",
          text: "EVP Kim selected as TOFS committee member. BioKorea 2021",
        },
        {
          month: "Aug",
          text: "RudaCure U.S.A. Inc. established. MSIT infectious disease platform project. Bio-iCore program",
        },
        {
          month: "Dec",
          text: "Domestic TRPV1 patent secured. Prof. Kim — KOES Academic Award & Taejun Best Paper Award",
        },
      ],
    },
    {
      year: "2020",
      title: "Pipeline Foundation",
      description:
        "RCI001 clinical trial groundwork. BIG3 Innovation Growth selection. Incheon Startup Park.",
      events: [
        {
          month: "Feb",
          text: "Pain & ophthalmic drug research fully launched",
        },
        {
          month: "Jun",
          text: "R&D Rediscovery Project selected. BIG3 Innovation Startup Package",
        },
        {
          month: "Jul",
          text: "RCI001 clinical trial foundation established. Incheon Startup Park entry (Boost Startup Journey)",
        },
        { month: "Aug", text: "Global IP Support Program selected" },
        {
          month: "Dec",
          text: "SunBio MucoPEG US clinical contract. Incheon R&D consulting program",
        },
      ],
    },
    {
      year: "2019",
      title: "Early Research & Tech Transfer",
      description:
        "Gil Hospital ophthalmic patent transfer. Asia Pain Symposium hosted.",
      events: [
        {
          month: "Dec",
          text: "Gil Hospital geriatric eye disease patent transfer. Asia Pain Symposium in Songdo. Bundang CHA Hospital spine regeneration co-development",
        },
      ],
    },
    {
      year: "2018",
      title: "Foundation",
      description:
        "Founded by Dr. Yong-ho Kim (Gachon University). Ion channel-targeted therapeutics for pain and sensory diseases.",
    },
  ],
  zh: [
    {
      year: "2026",
      title: "二期临床与全球扩张",
      highlight: true,
      description:
        "RCI001 FDA Phase 2中期结果。RuCIA平台拓展至罕见感觉疾病。日本/欧洲授权合作。",
      events: [
        { month: "Q1", text: "Bio China全球合作" },
        { month: "Q2", text: "IFRS转换及内部控制构建" },
      ],
    },
    {
      year: "2025",
      title: "临床与IPO里程碑",
      description:
        "RCI001 FDA Phase 2 IND获批。IPO主承销商选定。仁川优秀企业及Hi-Seoul企业认证。",
      events: [
        { month: "1月", text: "2025年开年典礼及优秀员工表彰" },
        { month: "2月", text: "POSTECH权道勋教授TRPV1结构分析研讨会" },
        {
          month: "3月",
          text: "RCI001临床2期咨询会议（13位眼科专家）。Bio-Europe Spring及法国兽药公司会议",
        },
        { month: "4月", text: "ESG活动——安养川拾荒慢跑及献血活动" },
        {
          month: "5月",
          text: "农食品创投培育项目入选（兽用基因治疗）。Bio-Korea展位。Syntekabio产学研R&D入选",
        },
        {
          month: "6月",
          text: "BIO-USA全球合作洽谈（Santen、Thea）。欧洲干眼学会RCI001发表",
        },
        {
          month: "7月",
          text: "7周年庆典及5年长期服务奖。上半年业务评审研讨会",
        },
        {
          month: "8月",
          text: "RCI001 FDA Phase 2 IND获批。DT&CRO研究合作MOU签署。日本专利注册完成",
        },
        {
          month: "10月",
          text: "Hi-Seoul企业认证。Pain Therapeutics Summit参会",
        },
        { month: "11月", text: "仁川优秀企业奖。SfN下一代镇痛药研究发表" },
        {
          month: "12月",
          text: "IPO主承销商选定。向流浪猫庇护所捐赠1吨猫粮（CSR）",
        },
      ],
    },
    {
      year: "2024",
      title: "临床验证与独角兽入选",
      description:
        "RCI001国内临床1期启动。入选'小独角兽'。Scale-up TIPS 12亿韩元。",
      events: [
        { month: "1月", text: "2024年开年典礼" },
        {
          month: "3月",
          text: "RCI001国内临床1期获批。访问法国兽药公司（RCI001AH联合开发）",
        },
        { month: "4月", text: "IBK创新中心欧洲加速器项目入选" },
        {
          month: "5月",
          text: "ESG经营举措正式启动。Bio-Korea生物健康特别馆参展",
        },
        {
          month: "6月",
          text: "中小风险企业部'小独角兽'入选。BIO-USA 2024参会",
        },
        {
          month: "10月",
          text: "Scale-up TIPS入选（3年12亿韩元）。干燥综合征模型RCI001疗效验证",
        },
        {
          month: "12月",
          text: "Core Innovation Korea 2024最优秀奖。Syntekabio抗癌药物发现合同",
        },
      ],
    },
    {
      year: "2023",
      title: "战略合作与全球拓展",
      description: "韩林制药2项技术转让。兽药事业启动。ACR学会发表。",
      events: [
        {
          month: "1月",
          text: "韩林制药角膜治疗剂RCI001U技术转让合同。Rac1抑制剂70亿韩元L/O",
        },
        { month: "2月", text: "疼痛新型肽专利申请" },
        {
          month: "3月",
          text: "兽药开发合作伙伴Onheal/OnhealPet。Bio-EU合作洽谈",
        },
        { month: "4月", text: "雇佣劳动部优秀中小企业认定。创业飞跃计划入选" },
        { month: "5月", text: "多来战略事业化中心技术特例咨询合同" },
        { month: "6月", text: "ASCO美国临床肿瘤学会代表团参会" },
        { month: "9月", text: "滴眼液专利申请完成" },
        {
          month: "10月",
          text: "首尔技术商业化支持项目入选。金东贤教授RCI001长期安全性验证。新加坡Global Innovation Roadshow",
        },
        {
          month: "11月",
          text: "ACR学会TRPV1骨关节炎治疗剂发表。KICDC/Defy Pitch获奖。Bio-Europe 2023",
        },
        {
          month: "12月",
          text: "翰林大学春川圣心医院-IonCell CAR-T/ADC联合研究MOU",
        },
      ],
    },
    {
      year: "2022",
      title: "融资与全球知名度",
      description: "A轮60亿韩元融资。RESI第3名。美国临床准备。",
      events: [
        { month: "2月", text: "JPM会议盛况。KIC华盛顿生物创业挑战" },
        {
          month: "4月",
          text: "新韩Square Bridge仁川入选。INNOBIZ认证。KIC华盛顿合作会议",
        },
        { month: "5月", text: "A轮60亿韩元融资完成。ARVO学会参会" },
        { month: "6月", text: "BIO-USA韩国馆参展。RCI001干眼症创新药备受关注" },
        {
          month: "8月",
          text: "UKC 2022 IR Competition SBA奖。首尔加山办公室搬迁。加泉大学国家新药项目联合研究入选",
        },
        { month: "9月", text: "RESI Innovator's Pitch Challenge第3名" },
        { month: "10月", text: "TRPV1专利日本/中国申请" },
        { month: "11月", text: "人才培育型中小企业认定" },
        { month: "12月", text: "家庭友好认证及青年友好优秀中小企业" },
      ],
    },
    {
      year: "2021",
      title: "技术转让与美国子公司设立",
      description:
        "韩林制药150亿韩元规模技术转让。RudaCure U.S.A.设立。多项政府课题入选。",
      events: [
        { month: "1月", text: "SunBio非临床CRO年度合同。TRPV1美国专利申请" },
        { month: "3月", text: "美国临床CRO（Ora）业务合同。迁入仁川创业园" },
        {
          month: "4月",
          text: "韩林制药150亿韩元RCI001技术转让合同。金东贤教授Nature子刊论文发表。生物医疗技术开发项目入选",
        },
        { month: "5月", text: "BIG3商业化课题入选。医生创业联合研究基础构建" },
        { month: "6月", text: "金东贤常务入选TOFS委员会成员。BioKorea 2021" },
        {
          month: "8月",
          text: "RudaCure U.S.A. Inc.设立。科技部传染病应对平台课题入选。Bio-iCore项目入选",
        },
        {
          month: "12月",
          text: "国内TRPV1专利获取。金东贤教授——KOES学术奖及太俊最优秀论文奖",
        },
      ],
    },
    {
      year: "2020",
      title: "管线构建",
      description: "RCI001临床试验基础奠定。BIG3创新成长入选。仁川创业园入驻。",
      events: [
        { month: "2月", text: "疼痛及眼科新药研究全面启动" },
        { month: "6月", text: "R&D再发现项目入选。BIG3创新创业计划入选" },
        {
          month: "7月",
          text: "RCI001临床试验基础奠定。仁川创业园入驻（Boost Startup Journey）",
        },
        { month: "8月", text: "全球IP支持项目入选" },
        {
          month: "12月",
          text: "SunBio MucoPEG美国临床委托合同。仁川市R&D咨询支持项目入选",
        },
      ],
    },
    {
      year: "2019",
      title: "早期研究与技术转让",
      description: "吉尔医院眼科专利技术转让。亚洲疼痛研讨会举办。",
      events: [
        {
          month: "12月",
          text: "吉尔医院老年性眼疾专利技术转让合同。亚洲疼痛研讨会在仁川松岛举办。盆唐CHA医院脊柱再生治疗剂联合开发",
        },
      ],
    },
    {
      year: "2018",
      title: "创立",
      description:
        "金容浩代表（加泉大学）创立。开始离子通道靶向疼痛/感觉疾病治疗剂研究。",
    },
  ],
  ja: [
    {
      year: "2026",
      title: "臨床第2相＆グローバル展開",
      highlight: true,
      description:
        "RCI001 FDA Phase 2中間結果。RuCIAプラットフォームの希少感覚疾患への拡張。日本/欧州ライセンシング。",
      events: [
        { month: "Q1", text: "Bio China グローバルパートナーシップ" },
        { month: "Q2", text: "IFRS移行および内部統制構築" },
      ],
    },
    {
      year: "2025",
      title: "臨床＆IPOマイルストーン",
      description:
        "RCI001 FDA Phase 2 IND承認。IPO主幹事選定。仁川優秀企業・Hi-Seoul企業認証。",
      events: [
        { month: "1月", text: "2025年年頭式典および優秀社員表彰" },
        { month: "2月", text: "POSTECH権道勲教授TRPV1構造解析セミナー" },
        {
          month: "3月",
          text: "RCI001臨床2相諮問会議（眼科専門医13名）。Bio-Europe Springおよびフランス動物医薬品企業ミーティング",
        },
        { month: "4月", text: "ESG活動——安養川プロギング＆献血キャンペーン" },
        {
          month: "5月",
          text: "農食品ベンチャー育成事業選定（動物用遺伝子治療）。Bio-Koreaブース。Syntekabio産学研R&D選定",
        },
        {
          month: "6月",
          text: "BIO-USAグローバルパートナリング（Santen、Thea）。欧州ドライアイ学会RCI001発表",
        },
        {
          month: "7月",
          text: "7周年記念式典および5年勤続者表彰。上半期業務評価ワークショップ",
        },
        {
          month: "8月",
          text: "RCI001 FDA Phase 2 IND承認取得。DT&CRO研究協力MOU締結。日本特許登録完了",
        },
        {
          month: "10月",
          text: "Hi-Seoul企業認証。Pain Therapeutics Summit参加",
        },
        { month: "11月", text: "仁川市優秀企業選定。SfN次世代鎮痛薬研究発表" },
        {
          month: "12月",
          text: "IPO主幹事選定。野良猫保護施設へキャットフード1トン寄付（CSR）",
        },
      ],
    },
    {
      year: "2024",
      title: "臨床検証＆ユニコーン選定",
      description:
        "RCI001国内臨床1相開始。ベビーユニコーン選定。スケールアップTIPS 12億ウォン。",
      events: [
        { month: "1月", text: "2024年年頭式典" },
        {
          month: "3月",
          text: "RCI001国内臨床1相承認。フランス動物医薬品企業訪問（RCI001AH共同開発）",
        },
        {
          month: "4月",
          text: "IBKイノベーションハブ欧州アクセラレータープログラム選定",
        },
        {
          month: "5月",
          text: "ESG経営本格始動。Bio-Koreaバイオヘルス特別館出展",
        },
        {
          month: "6月",
          text: "中小ベンチャー企業部'ベビーユニコーン'選定。BIO-USA 2024参加",
        },
        {
          month: "10月",
          text: "スケールアップTIPS選定（3年間12億ウォン）。シェーグレン症候群モデルRCI001有効性実証",
        },
        {
          month: "12月",
          text: "Core Innovation Korea 2024最優秀賞。Syntekabio抗がん剤物質発掘契約",
        },
      ],
    },
    {
      year: "2023",
      title: "戦略的パートナーシップ＆グローバル展開",
      description: "韓林製薬2件の技術移転。動物医薬品事業着手。ACR学会発表。",
      events: [
        {
          month: "1月",
          text: "韓林製薬角膜治療剤RCI001U技術移転契約。Rac1阻害剤70億ウォンL/O",
        },
        { month: "2月", text: "疼痛新規ペプチド特許出願" },
        {
          month: "3月",
          text: "動物医薬品パートナーOnheal/OnhealPetとの協力。Bio-EUパートナリング",
        },
        {
          month: "4月",
          text: "雇用労働部優良中小企業選定。創業飛躍パッケージ選定",
        },
        {
          month: "5月",
          text: "ダレ戦略事業化センター技術特例コンサルティング契約",
        },
        { month: "6月", text: "ASCO米国臨床腫瘍学会使節団参加" },
        { month: "9月", text: "点眼剤特許出願完了" },
        {
          month: "10月",
          text: "ソウル型技術事業化支援事業選定。金東賢教授RCI001長期安全性実証。シンガポールGlobal Innovation Roadshow",
        },
        {
          month: "11月",
          text: "ACR学会TRPV1変形性関節症治療薬発表。KICDC/Defy Pitch受賞。Bio-Europe 2023",
        },
        {
          month: "12月",
          text: "翰林大学春川聖心病院-IonCell CAR-T/ADC共同研究MOU",
        },
      ],
    },
    {
      year: "2022",
      title: "投資誘致＆グローバル認知度",
      description: "シリーズA 60億ウォン調達。RESI 3位入賞。米国臨床準備。",
      events: [
        {
          month: "2月",
          text: "JPMカンファレンスミーティング盛況。KICワシントンバイオスタートアップチャレンジ",
        },
        {
          month: "4月",
          text: "新韓スクエアブリッジ仁川選定。INNOBIZ認証。KICワシントンパートナーシップ",
        },
        { month: "5月", text: "シリーズA 60億ウォン投資誘致。ARVO学会" },
        {
          month: "6月",
          text: "BIO-USA韓国館出展。RCI001ドライアイ革新新薬として注目",
        },
        {
          month: "8月",
          text: "UKC 2022 IR Competition SBA賞。ソウル加山オフィス移転。加泉大学国家新薬プロジェクト共同研究選定",
        },
        { month: "9月", text: "RESI Innovator's Pitch Challenge 3位入賞" },
        { month: "10月", text: "TRPV1特許日本/中国出願" },
        { month: "11月", text: "人材育成型中小企業選定" },
        { month: "12月", text: "家族親和認証および青年親和優良中小企業選定" },
      ],
    },
    {
      year: "2021",
      title: "技術移転＆米国法人設立",
      description:
        "韓林製薬150億ウォン規模技術移転。RudaCure U.S.A.設立。複数の政府課題選定。",
      events: [
        { month: "1月", text: "SunBio非臨床CRO年間契約。TRPV1米国特許出願" },
        {
          month: "3月",
          text: "米国臨床CRO（Ora）業務契約。仁川スタートアップパークへ移転",
        },
        {
          month: "4月",
          text: "韓林製薬150億ウォンRCI001技術移転契約。金東賢教授Nature姉妹誌論文発表。バイオ医療技術開発事業選定",
        },
        { month: "5月", text: "BIG3事業化課題選定。医師起業共同研究基盤構築" },
        {
          month: "6月",
          text: "金東賢常務TOFS委員会メンバー選定。BioKorea 2021",
        },
        {
          month: "8月",
          text: "RudaCure U.S.A. Inc.設立。科技部感染症対応プラットフォーム課題選定。Bio-iCoreプログラム選定",
        },
        {
          month: "12月",
          text: "国内TRPV1特許取得。金東賢教授——KOES学術賞＆太俊最優秀論文賞",
        },
      ],
    },
    {
      year: "2020",
      title: "パイプライン構築",
      description:
        "RCI001臨床試験基盤整備。BIG3イノベーション成長選定。仁川スタートアップパーク入居。",
      events: [
        { month: "2月", text: "疼痛・眼科新薬研究の本格化" },
        {
          month: "6月",
          text: "R&D再発見プロジェクト選定。BIG3イノベーションスタートアップパッケージ",
        },
        {
          month: "7月",
          text: "RCI001臨床試験基盤確立。仁川スタートアップパーク入居（Boost Startup Journey）",
        },
        { month: "8月", text: "グローバルIP支援プログラム選定" },
        {
          month: "12月",
          text: "SunBio MucoPEG米国臨床受託契約。仁川市R&Dコンサルティング支援事業選定",
        },
      ],
    },
    {
      year: "2019",
      title: "初期研究＆技術移転",
      description: "ギル病院眼科特許技術移転。アジア疼痛シンポジウム開催。",
      events: [
        {
          month: "12月",
          text: "ギル病院老年性眼疾患特許技術移転契約。アジア疼痛シンポジウム仁川松島開催。盆唐CHAメディカルセンター脊椎再生治療剤共同開発",
        },
      ],
    },
    {
      year: "2018",
      title: "創立",
      description:
        "金容浩代表（加泉大学）により設立。イオンチャネル標的の疼痛/感覚疾患治療薬研究を開始。",
    },
  ],
  es: [
    {
      year: "2026",
      title: "Fase 2 Clínica y Expansión Global",
      highlight: true,
      description:
        "Resultados intermedios de RCI001 FDA Phase 2. Expansión de la plataforma RuCIA a enfermedades sensoriales raras. Acuerdos de licencia en Japón/Europa.",
      events: [
        { month: "Q1", text: "BioChina asociación global" },
        {
          month: "Q2",
          text: "Conversión de IFRS y construcción de controles internos",
        },
      ],
    },
    {
      year: "2025",
      title: "Hitos Clínicos e IPO",
      description:
        "Aprobación de RCI001 FDA Phase 2 IND. Selección de banco de inversión para IPO. Certificación de empresa destacada de Incheon y Hi-Seoul.",
      events: [
        {
          month: "Ene",
          text: "Ceremonia de año nuevo 2025 y premios a empleados destacados",
        },
        {
          month: "Feb",
          text: "Seminario de análisis estructural TRPV1 del Prof. Kwon de POSTECH",
        },
        {
          month: "Mar",
          text: "Reunión consultiva de RCI001 Phase 2 (13 oftalmólogos). Bio-Europe Spring y reunión con farmacéutica veterinaria francesa",
        },
        {
          month: "Abr",
          text: "Actividades ESG — plogging en arroyo Anyang y campaña de donación de sangre",
        },
        {
          month: "May",
          text: "Selección en Programa de Ventures Agroalimentarios (terapia génica veterinaria). Stand en Bio-Korea. Syntekabio Collabo R&D",
        },
        {
          month: "Jun",
          text: "BIO-USA colaboraciones globales (Santen, Thea). Presentación de RCI001 en la Sociedad Europea de Ojo Seco",
        },
        {
          month: "Jul",
          text: "Celebración del 7.º aniversario y premios por 5 años de servicio. Taller de evaluación del primer semestre",
        },
        {
          month: "Ago",
          text: "Aprobación de RCI001 FDA Phase 2 IND. MOU de investigación con DT&CRO. Patente registrada en Japón",
        },
        {
          month: "Oct",
          text: "Certificación Hi-Seoul Enterprise. Asistencia al Pain Therapeutics Summit",
        },
        {
          month: "Nov",
          text: "Premio de empresa destacada de Incheon. Presentación de analgésicos de nueva generación en SfN",
        },
        {
          month: "Dic",
          text: "Selección de banco de inversión para IPO. Donación de 1 tonelada de alimento para gatos a refugio (RSE)",
        },
      ],
    },
    {
      year: "2024",
      title: "Validación Clínica y Selección Unicornio",
      description:
        "Ensayo clínico nacional Phase 1 de RCI001. Designación como Baby Unicorn. Scale-up TIPS 1.200 millones KRW.",
      events: [
        { month: "Ene", text: "Ceremonia de año nuevo 2024" },
        {
          month: "Mar",
          text: "Aprobación de ensayo clínico nacional Phase 1 de RCI001. Visita a farmacéutica veterinaria francesa (co-desarrollo de RCI001AH)",
        },
        {
          month: "Abr",
          text: "Programa acelerador europeo de IBK Innovation Hub",
        },
        {
          month: "May",
          text: "Lanzamiento de iniciativas de gestión ESG. Pabellón BioHealth en Bio-Korea",
        },
        {
          month: "Jun",
          text: "Seleccionado como 'Baby Unicorn' por el Ministerio de PYMEs. Asistencia a BIO-USA 2024",
        },
        {
          month: "Oct",
          text: "Selección Scale-up TIPS (1.200M KRW en 3 años). Eficacia de RCI001 en modelo de síndrome de Sjögren",
        },
        {
          month: "Dic",
          text: "Gran Premio Core Innovation Korea 2024. Contrato de descubrimiento de fármacos anticancerígenos con Syntekabio",
        },
      ],
    },
    {
      year: "2023",
      title: "Alianzas Estratégicas y Alcance Global",
      description:
        "Dos transferencias tecnológicas a Hanlim Pharma. Iniciativa farmacéutica veterinaria. Presentación en congreso ACR.",
      events: [
        {
          month: "Ene",
          text: "Transferencia tecnológica de tratamiento corneal RCI001U a Hanlim Pharma. Acuerdo L/O de inhibidor Rac1 por 7.000M KRW",
        },
        {
          month: "Feb",
          text: "Patente de nuevo péptido analgésico presentada",
        },
        {
          month: "Mar",
          text: "Alianza con Onheal/OnhealPet para farmacéutica veterinaria. Partnering en Bio-EU",
        },
        {
          month: "Abr",
          text: "Designación como PYME destacada por el Ministerio de Trabajo. Selección en Startup Leap Package",
        },
        {
          month: "May",
          text: "Acuerdo de consultoría tecnológica con Centro Estratégico Darae",
        },
        { month: "Jun", text: "Delegación en ASCO de oncología clínica" },
        { month: "Sep", text: "Patente de formulación de colirio presentada" },
        {
          month: "Oct",
          text: "Programa de comercialización tecnológica de Seúl. Estudio de seguridad a largo plazo de RCI001 del Prof. Kim. Singapore Global Innovation Roadshow",
        },
        {
          month: "Nov",
          text: "Presentación en ACR — terapéutico TRPV1 para osteoartritis. Premio KICDC/Defy Pitch. Bio-Europe 2023",
        },
        {
          month: "Dic",
          text: "MOU de co-investigación CAR-T/ADC con Hospital Hallym Univ.-IonCell",
        },
      ],
    },
    {
      year: "2022",
      title: "Inversión y Reconocimiento Global",
      description:
        "Serie A de 6.000M KRW recaudados. 3.er lugar en RESI. Preparativos clínicos en EE.UU.",
      events: [
        {
          month: "Feb",
          text: "Reuniones en conferencia JPM. Reto KIC Washington bio startup",
        },
        {
          month: "Abr",
          text: "Shinhan Square Bridge Incheon. Certificación INNOBIZ. Alianza KIC Washington",
        },
        {
          month: "May",
          text: "Inversión Serie A de 6.000M KRW. Congreso ARVO",
        },
        {
          month: "Jun",
          text: "Pabellón coreano en BIO-USA. RCI001 fármaco innovador para ojo seco destacado",
        },
        {
          month: "Ago",
          text: "Premio SBA en UKC 2022 IR Competition. Traslado a oficina de Gasan, Seúl. Proyecto nacional de fármacos con Gachon Univ.",
        },
        {
          month: "Sep",
          text: "3.er lugar en RESI Innovator's Pitch Challenge",
        },
        { month: "Oct", text: "Patente TRPV1 presentada en Japón/China" },
        { month: "Nov", text: "Designación como PYME formadora de talento" },
        {
          month: "Dic",
          text: "Certificación Family-Friendly y PYME amigable con la juventud",
        },
      ],
    },
    {
      year: "2021",
      title: "Transferencia Tecnológica y Filial en EE.UU.",
      description:
        "Transferencia tecnológica de 15.000M KRW a Hanlim Pharma. Establecimiento de RudaCure U.S.A. Múltiples subvenciones gubernamentales.",
      events: [
        {
          month: "Ene",
          text: "Contrato anual de CRO preclínico con SunBio. Patente TRPV1 presentada en EE.UU.",
        },
        {
          month: "Mar",
          text: "Contrato con CRO clínico de EE.UU. (Ora). Traslado a Incheon Startup Park",
        },
        {
          month: "Abr",
          text: "Transferencia tecnológica de RCI001 por 15.000M KRW a Hanlim Pharma. Paper del Prof. Kim en revista hermana de Nature. Proyecto de desarrollo tecnológico biomédico",
        },
        {
          month: "May",
          text: "Proyecto de comercialización BIG3. Programa de co-investigación médico-startup",
        },
        {
          month: "Jun",
          text: "VP Kim seleccionado como miembro del comité TOFS. BioKorea 2021",
        },
        {
          month: "Ago",
          text: "Establecimiento de RudaCure U.S.A. Inc. Proyecto de plataforma de enfermedades infecciosas MSIT. Programa Bio-iCore",
        },
        {
          month: "Dic",
          text: "Patente nacional TRPV1 asegurada. Prof. Kim — Premio Académico KOES y Premio al Mejor Paper Taejun",
        },
      ],
    },
    {
      year: "2020",
      title: "Fundación del Pipeline",
      description:
        "Base para ensayo clínico de RCI001. Selección BIG3 Crecimiento Innovador. Incheon Startup Park.",
      events: [
        {
          month: "Feb",
          text: "Investigación de fármacos para dolor y oftalmología completamente lanzada",
        },
        {
          month: "Jun",
          text: "Selección en Proyecto de Redescubrimiento de I+D. Paquete de startup innovador BIG3",
        },
        {
          month: "Jul",
          text: "Base de ensayo clínico de RCI001 establecida. Entrada en Incheon Startup Park (Boost Startup Journey)",
        },
        { month: "Ago", text: "Selección en Programa Global de Soporte IP" },
        {
          month: "Dic",
          text: "Contrato clínico de SunBio MucoPEG en EE.UU. Programa de consultoría I+D de Incheon",
        },
      ],
    },
    {
      year: "2019",
      title: "Investigación Temprana y Transferencia Tecnológica",
      description:
        "Transferencia de patente oftálmica de Gil Hospital. Simposio Asiático del Dolor organizado.",
      events: [
        {
          month: "Dic",
          text: "Transferencia de patente de enfermedad ocular geriátrica de Gil Hospital. Simposio Asiático del Dolor en Songdo. Co-desarrollo de terapia regenerativa espinal con Bundang CHA Hospital",
        },
      ],
    },
    {
      year: "2018",
      title: "Fundación",
      description:
        "Fundada por el Dr. Yong-ho Kim (Universidad Gachon). Terapéuticos dirigidos a canales iónicos para dolor y enfermedades sensoriales.",
    },
  ],
  fr: [
    {
      year: "2026",
      title: "Phase 2 Clinique et Expansion Mondiale",
      highlight: true,
      description:
        "Résultats intermédiaires de RCI001 FDA Phase 2. Extension de la plateforme RuCIA aux maladies sensorielles rares. Accords de licence au Japon/Europe.",
      events: [
        { month: "Q1", text: "Partenariat mondial BioChina" },
        {
          month: "Q2",
          text: "Conversion IFRS et mise en place des contrôles internes",
        },
      ],
    },
    {
      year: "2025",
      title: "Jalons Cliniques et IPO",
      description:
        "Approbation de RCI001 FDA Phase 2 IND. Sélection du chef de file pour l'IPO. Certification entreprise d'excellence d'Incheon et Hi-Seoul.",
      events: [
        {
          month: "Jan",
          text: "Cérémonie du Nouvel An 2025 et prix aux employés méritants",
        },
        {
          month: "Fév",
          text: "Séminaire d'analyse structurale TRPV1 du Prof. Kwon de POSTECH",
        },
        {
          month: "Mar",
          text: "Réunion consultative RCI001 Phase 2 (13 ophtalmologistes). Bio-Europe Spring et réunion avec laboratoire vétérinaire français",
        },
        {
          month: "Avr",
          text: "Activités ESG — plogging le long du ruisseau Anyang et campagne de don du sang",
        },
        {
          month: "Mai",
          text: "Sélection Programme Ventures Agroalimentaires (thérapie génique vétérinaire). Stand Bio-Korea. Syntekabio Collabo R&D",
        },
        {
          month: "Jun",
          text: "BIO-USA partenariats mondiaux (Santen, Thea). Présentation de RCI001 à la Société Européenne de l'Œil Sec",
        },
        {
          month: "Jul",
          text: "Célébration du 7e anniversaire et prix de fidélité 5 ans. Atelier d'évaluation du premier semestre",
        },
        {
          month: "Aoû",
          text: "Approbation de RCI001 FDA Phase 2 IND. MOU de recherche avec DT&CRO. Brevet enregistré au Japon",
        },
        {
          month: "Oct",
          text: "Certification Hi-Seoul Enterprise. Participation au Pain Therapeutics Summit",
        },
        {
          month: "Nov",
          text: "Prix entreprise d'excellence d'Incheon. Présentation de la recherche sur les analgésiques de nouvelle génération au SfN",
        },
        {
          month: "Déc",
          text: "Sélection du chef de file pour l'IPO. Don d'1 tonne de nourriture pour chats à un refuge (RSE)",
        },
      ],
    },
    {
      year: "2024",
      title: "Validation Clinique et Sélection Licorne",
      description:
        "Essai clinique national Phase 1 de RCI001. Désignation Baby Unicorn. Scale-up TIPS 1,2 milliard KRW.",
      events: [
        { month: "Jan", text: "Cérémonie du Nouvel An 2024" },
        {
          month: "Mar",
          text: "Approbation de l'essai clinique national Phase 1 de RCI001. Visite au laboratoire vétérinaire français (co-développement RCI001AH)",
        },
        {
          month: "Avr",
          text: "Programme accélérateur européen IBK Innovation Hub",
        },
        {
          month: "Mai",
          text: "Lancement des initiatives ESG. Pavillon BioHealth au Bio-Korea",
        },
        {
          month: "Jun",
          text: "Sélectionné comme 'Baby Unicorn' par le Ministère des PME. Participation à BIO-USA 2024",
        },
        {
          month: "Oct",
          text: "Sélection Scale-up TIPS (1,2 Md KRW sur 3 ans). Efficacité de RCI001 dans le modèle du syndrome de Sjögren",
        },
        {
          month: "Déc",
          text: "Grand Prix Core Innovation Korea 2024. Contrat de découverte de médicaments anticancéreux avec Syntekabio",
        },
      ],
    },
    {
      year: "2023",
      title: "Partenariats Stratégiques et Portée Mondiale",
      description:
        "Deux transferts technologiques à Hanlim Pharma. Initiative pharmaceutique vétérinaire. Présentation au congrès ACR.",
      events: [
        {
          month: "Jan",
          text: "Transfert technologique du traitement cornéen RCI001U à Hanlim Pharma. Accord L/O d'inhibiteur Rac1 pour 7 Md KRW",
        },
        { month: "Fév", text: "Brevet de nouveau peptide analgésique déposé" },
        {
          month: "Mar",
          text: "Partenariat avec Onheal/OnhealPet en pharmaceutique vétérinaire. Partnering Bio-EU",
        },
        {
          month: "Avr",
          text: "Désignation PME d'excellence par le Ministère du Travail. Sélection Startup Leap Package",
        },
        {
          month: "Mai",
          text: "Accord de conseil technologique avec le Centre Stratégique Darae",
        },
        { month: "Jun", text: "Délégation ASCO d'oncologie clinique" },
        { month: "Sep", text: "Brevet de formulation de collyre déposé" },
        {
          month: "Oct",
          text: "Programme de commercialisation technologique de Séoul. Étude de sécurité à long terme de RCI001 du Prof. Kim. Singapore Global Innovation Roadshow",
        },
        {
          month: "Nov",
          text: "Présentation ACR — thérapeutique TRPV1 pour l'arthrose. Prix KICDC/Defy Pitch. Bio-Europe 2023",
        },
        {
          month: "Déc",
          text: "MOU de co-recherche CAR-T/ADC avec Hôpital Hallym Univ.-IonCell",
        },
      ],
    },
    {
      year: "2022",
      title: "Investissement et Reconnaissance Mondiale",
      description:
        "Série A de 6 Md KRW levés. 3e place au RESI. Préparatifs cliniques aux États-Unis.",
      events: [
        {
          month: "Fév",
          text: "Réunions au congrès JPM. Défi KIC Washington bio startup",
        },
        {
          month: "Avr",
          text: "Shinhan Square Bridge Incheon. Certification INNOBIZ. Partenariat KIC Washington",
        },
        {
          month: "Mai",
          text: "Investissement Série A de 6 Md KRW. Congrès ARVO",
        },
        {
          month: "Jun",
          text: "Pavillon coréen au BIO-USA. RCI001 médicament innovant pour l'œil sec mis en avant",
        },
        {
          month: "Aoû",
          text: "Prix SBA au UKC 2022 IR Competition. Déménagement au bureau de Gasan, Séoul. Projet national de médicaments avec Gachon Univ.",
        },
        { month: "Sep", text: "3e place au RESI Innovator's Pitch Challenge" },
        { month: "Oct", text: "Brevet TRPV1 déposé au Japon/Chine" },
        { month: "Nov", text: "Désignation PME formatrice de talents" },
        {
          month: "Déc",
          text: "Certification Famille-Friendly et PME accueillante pour les jeunes",
        },
      ],
    },
    {
      year: "2021",
      title: "Transfert Technologique et Filiale Américaine",
      description:
        "Transfert technologique de 15 Md KRW à Hanlim Pharma. Création de RudaCure U.S.A. Multiples subventions gouvernementales.",
      events: [
        {
          month: "Jan",
          text: "Contrat annuel CRO préclinique avec SunBio. Brevet TRPV1 déposé aux États-Unis",
        },
        {
          month: "Mar",
          text: "Contrat CRO clinique américain (Ora). Déménagement à Incheon Startup Park",
        },
        {
          month: "Avr",
          text: "Transfert technologique de RCI001 pour 15 Md KRW à Hanlim Pharma. Article du Prof. Kim dans une revue sœur de Nature. Projet de développement technologique biomédical",
        },
        {
          month: "Mai",
          text: "Projet de commercialisation BIG3. Programme de co-recherche médecin-startup",
        },
        {
          month: "Jun",
          text: "VP Kim sélectionné comme membre du comité TOFS. BioKorea 2021",
        },
        {
          month: "Aoû",
          text: "Création de RudaCure U.S.A. Inc. Projet de plateforme maladies infectieuses MSIT. Programme Bio-iCore",
        },
        {
          month: "Déc",
          text: "Brevet national TRPV1 obtenu. Prof. Kim — Prix Académique KOES et Meilleur Article Taejun",
        },
      ],
    },
    {
      year: "2020",
      title: "Construction du Pipeline",
      description:
        "Fondation des essais cliniques de RCI001. Sélection BIG3 Croissance Innovante. Incheon Startup Park.",
      events: [
        {
          month: "Fév",
          text: "Recherche de médicaments pour la douleur et l'ophtalmologie pleinement lancée",
        },
        {
          month: "Jun",
          text: "Sélection Projet de Redécouverte R&D. Package startup innovant BIG3",
        },
        {
          month: "Jul",
          text: "Fondation des essais cliniques de RCI001 établie. Entrée à Incheon Startup Park (Boost Startup Journey)",
        },
        { month: "Aoû", text: "Sélection Programme Global de Support IP" },
        {
          month: "Déc",
          text: "Contrat clinique américain SunBio MucoPEG. Programme de conseil R&D d'Incheon",
        },
      ],
    },
    {
      year: "2019",
      title: "Recherche Initiale et Transfert Technologique",
      description:
        "Transfert de brevet ophtalmique de Gil Hospital. Symposium Asiatique de la Douleur organisé.",
      events: [
        {
          month: "Déc",
          text: "Transfert de brevet de maladie oculaire gériatrique de Gil Hospital. Symposium Asiatique de la Douleur à Songdo. Co-développement de thérapie régénérative spinale avec Bundang CHA Hospital",
        },
      ],
    },
    {
      year: "2018",
      title: "Fondation",
      description:
        "Fondée par le Dr Yong-ho Kim (Université Gachon). Thérapeutiques ciblant les canaux ioniques pour la douleur et les maladies sensorielles.",
    },
  ],
};

const LEADERSHIP = {
  ko: [
    {
      name: "김용호 박사",
      role: "대표이사 / CEO",
      description: "가천대학교 교수. 이온채널 약리학 및 통증 연구 전문.",
    },
    {
      name: "김승훈",
      role: "부사장 / VP",
      description: "CMC 운영, AI 플랫폼 개발, 기업 전략 총괄.",
    },
  ],
  en: [
    {
      name: "Dr. Yong-ho Kim",
      role: "Founder & CEO",
      description:
        "Gachon University professor specializing in ion channel pharmacology and pain research.",
    },
    {
      name: "Seung-hoon Kim",
      role: "Vice President",
      description:
        "CMC operations, AI platform development, and corporate strategy.",
    },
  ],
  zh: [
    {
      name: "金容浩 博士",
      role: "创始人兼CEO",
      description: "加泉大学教授，专注离子通道药理学及疼痛研究。",
    },
    {
      name: "金承勋",
      role: "副总裁",
      description: "CMC运营、AI平台开发及企业战略。",
    },
  ],
  ja: [
    {
      name: "金容浩 博士",
      role: "創業者兼CEO",
      description:
        "加泉大学教授。イオンチャネル薬理学および疼痛研究を専門とする。",
    },
    {
      name: "金承勲",
      role: "副社長",
      description: "CMC運営、AIプラットフォーム開発、企業戦略を統括。",
    },
  ],
  es: [
    {
      name: "Dr. Yong-ho Kim",
      role: "Fundador y CEO",
      description:
        "Profesor de la Universidad Gachon especializado en farmacología de canales iónicos e investigación del dolor.",
    },
    {
      name: "Seung-hoon Kim",
      role: "Vicepresidente",
      description:
        "Operaciones de CMC, desarrollo de plataforma de IA y estrategia corporativa.",
    },
  ],
  fr: [
    {
      name: "Dr Yong-ho Kim",
      role: "Fondateur et PDG",
      description:
        "Professeur à l'Université Gachon, spécialisé en pharmacologie des canaux ioniques et recherche sur la douleur.",
    },
    {
      name: "Seung-hoon Kim",
      role: "Vice-Président",
      description:
        "Opérations CMC, développement de plateforme IA et stratégie d'entreprise.",
    },
  ],
};

const CONTENT = {
  ko: {
    tag: "회사 소개",
    title1: "Our",
    title2: "Journey",
    description:
      "2018년 이온채널 전문 연구실에서 출발하여, 2026년 글로벌 바이오텍으로 성장하고 있는 루다큐어의 여정입니다.",
    leaderTag: "경영진",
    leaderTitle: "Team",
  },
  en: {
    tag: "Company",
    title1: "Our",
    title2: "Journey",
    description:
      "From a specialized ion channel laboratory in 2018 to a global biotech company in 2026 — the RudaCure story.",
    leaderTag: "Leadership",
    leaderTitle: "Team",
  },
  zh: {
    tag: "公司介绍",
    title1: "Our",
    title2: "Journey",
    description:
      "从2018年的离子通道专业实验室出发，到2026年成长为全球生物科技公司——RudaCure的历程。",
    leaderTag: "管理层",
    leaderTitle: "Team",
  },
  ja: {
    tag: "会社概要",
    title1: "Our",
    title2: "Journey",
    description:
      "2018年のイオンチャネル専門研究室から、2026年にグローバルバイオテック企業へ成長するRudaCureの歩み。",
    leaderTag: "経営陣",
    leaderTitle: "Team",
  },
  es: {
    tag: "Empresa",
    title1: "Our",
    title2: "Journey",
    description:
      "De un laboratorio especializado en canales iónicos en 2018 a una empresa biotecnológica global en 2026 — la historia de RudaCure.",
    leaderTag: "Liderazgo",
    leaderTitle: "Team",
  },
  fr: {
    tag: "Entreprise",
    title1: "Our",
    title2: "Journey",
    description:
      "D'un laboratoire spécialisé en canaux ioniques en 2018 à une entreprise biotech mondiale en 2026 — l'histoire de RudaCure.",
    leaderTag: "Direction",
    leaderTitle: "Team",
  },
};

const META_TITLES: Record<string, string> = {
  ko: "회사 소개 | RudaCure",
  en: "About | RudaCure",
  zh: "公司介绍 | RudaCure",
  ja: "会社概要 | RudaCure",
  es: "Nosotros | RudaCure",
  fr: "À propos | RudaCure",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const key = (locale in CONTENT ? locale : "en") as keyof typeof CONTENT;
  return {
    title: META_TITLES[locale] ?? META_TITLES.en,
    description: CONTENT[key].description,
  };
}

const SITE_URL = "https://www.rudacure.com";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = toDataLocale(loc as Locale);
  const c = CONTENT[locale];
  const timeline = TIMELINE[locale];
  const leaders = LEADERSHIP[locale];

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/${loc}/about`,
    name: META_TITLES[loc] ?? META_TITLES.en,
    description: CONTENT[locale].description,
    inLanguage: loc,
    url: `${SITE_URL}/${loc}/about`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "RudaCure Co., Ltd.",
      foundingDate: "2018",
      employee: [
        {
          "@type": "Person",
          name: "Yong-ho Kim",
          givenName: "Yong-ho",
          familyName: "Kim",
          jobTitle: "CEO & Founder",
          affiliation: {
            "@type": "CollegeOrUniversity",
            name: "Gachon University College of Medicine",
          },
          knowsAbout: [
            "Ion channel pharmacology",
            "TRPV1",
            "Pain research",
            "Non-opioid analgesics",
            "Drug discovery",
          ],
          worksFor: { "@id": `${SITE_URL}/#organization` },
        },
        {
          "@type": "Person",
          name: "Seung-hoon Kim",
          givenName: "Seung-hoon",
          familyName: "Kim",
          jobTitle: "Vice President",
          worksFor: { "@id": `${SITE_URL}/#organization` },
        },
      ],
    },
  };

  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.tag}
          </p>
          <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 text-gray-900">
            {c.title1} <em className="italic font-semibold">{c.title2}</em>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            {c.description}
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-10">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-10">
                  <div
                    className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${item.highlight ? "border-teal-500 bg-teal-50" : "border-gray-200 bg-white"}`}
                  />
                  <div className="liquid-glass p-6">
                    <span
                      className={`text-sm font-medium ${item.highlight ? "text-teal-600" : "text-gray-600"}`}
                    >
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold mt-1 mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                    {item.events && item.events.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {item.events.map((event, idx) => (
                          <div key={idx} className="flex gap-3 text-sm">
                            <span className="text-teal-600 font-medium w-10 shrink-0">
                              {event.month}
                            </span>
                            <span className="text-gray-600">{event.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-600 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {c.leaderTag}
          </p>
          <h2 className="text-3xl font-light mb-10 text-gray-900">
            Our <em className="italic font-semibold">{c.leaderTitle}</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leaders.map((person) => (
              <div key={person.name} className="liquid-glass p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {person.name}
                </h3>
                <p className="text-teal-600 text-sm mb-3">{person.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {person.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
