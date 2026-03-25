"""Translate Korean news titles to English using simple rule-based + keyword mapping.

Produces news_en.json with English titles for the EN locale news listing.
Full article content remains Korean (with a notice).
"""

import json
import re
from pathlib import Path

INPUT = Path("/Users/seunghoonkim/Projects/rudacure-web/src/data/news.json")
OUTPUT = Path("/Users/seunghoonkim/Projects/rudacure-web/src/data/news_en.json")

# Keyword-based translation map for common terms
TERM_MAP = {
    "루다큐어": "RudaCure",
    "㈜": " Inc.",
    "신약": "new drug",
    "안구건조증": "dry eye disease",
    "치료": "treatment",
    "임상": "clinical trial",
    "승인": "approval",
    "획득": "obtained",
    "선정": "selected",
    "체결": "signed",
    "발표": "presentation",
    "인증": "certification",
    "특허": "patent",
    "등록": "registration",
    "기부": "donation",
    "사료": "feed",
    "회식": "company dinner",
    "업무성과": "performance review",
    "하반기": "second half",
    "상반기": "first half",
    "주관사": "underwriter",
    "우수기업": "outstanding company",
    "혁신": "innovation",
    "연구": "research",
    "개발": "development",
    "통증": "pain",
    "차세대": "next-generation",
    "통증치료제": "pain therapeutics",
    "연구성과": "research results",
    "미국신경과학회": "Society for Neuroscience (SfN)",
    "하이서울기업": "Hi-Seoul Enterprise",
    "협력": "collaboration",
    "전략적": "strategic",
    "경쟁사": "competitor",
    "감시": "monitoring",
    "인천시": "Incheon City",
    "인천": "Incheon",
    "바이오": "bio",
    "제약": "pharmaceutical",
    "정부": "government",
    "지원사업": "support program",
    "창업": "startup",
    "패키지": "package",
    "스케일업": "scale-up",
    "액셀러레이터": "accelerator",
    "프로그램": "program",
    "파이프라인": "pipeline",
    "도약": "leap forward",
    "향한": "toward",
    "위한": "for",
    "실시": "conducted",
    "연말": "year-end",
    "유기묘": "stray cats",
    "보호시설": "shelter",
    "겨울": "winter",
    "톤": "ton",
}

# Well-known translations for major articles
KNOWN_TRANSLATIONS = {
    "루다큐어㈜, 유기묘 보호시설에 겨울 사료 1톤 기부": "RudaCure donates 1 ton of winter feed to stray cat shelter",
    "2025년 하반기 업무성과 발표회 실시 및 연말 회식": "2025 H2 performance review and year-end company dinner",
    "IPO를 위한 주관사 선정 PT": "IPO underwriter selection presentation",
    "루다큐어, 인천시 우수기업 선정, 혁신 신약개발로 IPO 향한 도약": "RudaCure selected as Incheon outstanding company, leaping toward IPO with innovative drug development",
    "루다큐어, 미국신경과학회서 '차세대 통증치료제' 연구성과 발표": "RudaCure presents next-gen pain therapeutics research at Society for Neuroscience",
    "루다큐어, 2025년 하이서울기업 인증 획득": "RudaCure obtains 2025 Hi-Seoul Enterprise certification",
    "루다큐어, DT&CRO와 전략적 연구 협력 MOU 체결": "RudaCure signs strategic research collaboration MOU with DT&CRO",
    "루다큐어, 안구건조증 치료 신약 'RCI001' FDA 임상2상 승인 획득": "RudaCure obtains FDA Phase 2 approval for dry eye disease drug RCI001",
    "일본 특허청, TRPV1 활성 질환 치료용 조성물 특허 등록": "Japan Patent Office registers patent for TRPV1 active disease treatment composition",
    "루다큐어, IBK Innovation Hub Europe 액셀러레이터 프로그램 선정": "RudaCure selected for IBK Innovation Hub Europe accelerator program",
    "루다큐어, 한림제약과 RCI001 국내 라이선싱 계약 체결": "RudaCure signs domestic licensing agreement with Hanlim Pharmaceuticals for RCI001",
    "ACR BCRC 세션 발표 — RCI002 비마약성 진통 메커니즘": "ACR BCRC session presentation — RCI002 non-opioid pain mechanism",
}


def translate_title(title: str) -> str:
    """Translate a Korean news title to English."""
    if title in KNOWN_TRANSLATIONS:
        return KNOWN_TRANSLATIONS[title]

    # Simple term replacement for remaining titles
    result = title
    for ko, en in TERM_MAP.items():
        result = result.replace(ko, en)

    return result


def main():
    articles = json.loads(INPUT.read_text(encoding="utf-8"))

    en_articles = []
    for a in articles:
        en_article = {
            "id": a["id"],
            "title": translate_title(a["title"]),
            "title_ko": a["title"],
            "date": a["date"],
            "category": a["category"],
            "content": a["content"],  # Keep Korean content
        }
        en_articles.append(en_article)

    OUTPUT.write_text(json.dumps(en_articles, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Translated {len(en_articles)} article titles")

    # Show some samples
    for a in en_articles[:5]:
        print(f"  [{a['date']}] {a['title']}")


if __name__ == "__main__":
    main()
