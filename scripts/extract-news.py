"""Extract news articles from HTML files to JSON for Next.js.

Reads all view_*.html files from the existing rudacure-homepage/news/
directory and produces a single news.json file for the Next.js site.
"""

import json
import os
import re
from html.parser import HTMLParser
from pathlib import Path

SOURCE_DIR = Path("/Users/seunghoonkim/Projects/rudacure-homepage/news")
OUTPUT_FILE = Path("/Users/seunghoonkim/Projects/rudacure-web/src/data/news.json")


class NewsExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.date = ""
        self.content = ""
        self._in_h1 = False
        self._in_date = False
        self._in_content = False
        self._depth = 0

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "h1":
            self._in_h1 = True
        elif tag == "div" and attrs_dict.get("class") == "date":
            self._in_date = True
        elif tag == "div" and attrs_dict.get("class") == "content":
            self._in_content = True
            self._depth = 0
        if self._in_content:
            self._depth += 1
            # Preserve some HTML tags in content
            if tag in ("p", "h3", "h4", "strong", "em", "br", "ul", "ol", "li", "a", "figure", "img"):
                attr_str = ""
                if tag == "a" and "href" in attrs_dict:
                    attr_str = f' href="{attrs_dict["href"]}"'
                elif tag == "img" and "src" in attrs_dict:
                    attr_str = f' src="{attrs_dict["src"]}"'
                self.content += f"<{tag}{attr_str}>"

    def handle_endtag(self, tag):
        if tag == "h1":
            self._in_h1 = False
        elif tag == "div" and self._in_date:
            self._in_date = False
        elif tag == "div" and self._in_content:
            self._depth -= 1
            if self._depth <= 0:
                self._in_content = False
        if self._in_content and tag in ("p", "h3", "h4", "strong", "em", "ul", "ol", "li", "a", "figure"):
            self.content += f"</{tag}>"

    def handle_data(self, data):
        if self._in_h1:
            self.title += data.strip()
        elif self._in_date:
            self.date += data.strip()
        elif self._in_content:
            self.content += data


def extract_article(filepath: Path) -> dict | None:
    try:
        html = filepath.read_text(encoding="utf-8")
    except Exception:
        return None

    parser = NewsExtractor()
    parser.feed(html)

    if not parser.title:
        return None

    # Extract date
    date_match = re.search(r"(\d{4}-\d{2}-\d{2})", parser.date)
    date_str = date_match.group(1) if date_match else ""

    # Extract ID from filename
    id_match = re.search(r"view_(\d+)\.html", filepath.name)
    article_id = int(id_match.group(1)) if id_match else 0

    # Clean content
    content = parser.content.strip()
    # Remove empty paragraphs
    content = re.sub(r"<p>\s*</p>", "", content)

    # Auto-categorize
    title = parser.title
    category = "Company"
    if any(k in title for k in ["FDA", "임상", "Phase", "IND", "NCT"]):
        category = "Clinical"
    elif any(k in title for k in ["특허", "patent"]):
        category = "Patent"
    elif any(k in title for k in ["MOU", "협력", "계약", "라이선싱", "Hanlim", "한림"]):
        category = "Partnership"
    elif any(k in title for k in ["학회", "SfN", "ACR", "발표", "논문"]):
        category = "Science"
    elif any(k in title for k in ["선정", "인증", "수상", "우수"]):
        category = "Award"
    elif any(k in title for k in ["투자", "IPO", "주관사", "IR", "Series"]):
        category = "IR"
    elif any(k in title for k in ["기부", "봉사", "CSR", "사회공헌"]):
        category = "CSR"

    return {
        "id": article_id,
        "title": title,
        "date": date_str,
        "category": category,
        "content": content,
    }


def main():
    articles = []
    html_files = sorted(SOURCE_DIR.glob("view_*.html"), key=lambda f: int(re.search(r"\d+", f.stem).group()))

    for filepath in html_files:
        article = extract_article(filepath)
        if article:
            articles.append(article)

    # Sort by date descending (newest first)
    articles.sort(key=lambda a: a["date"], reverse=True)

    # Ensure output dir exists
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(articles, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Extracted {len(articles)} articles to {OUTPUT_FILE}")
    # Show category distribution
    cats = {}
    for a in articles:
        cats[a["category"]] = cats.get(a["category"], 0) + 1
    for cat, count in sorted(cats.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")


if __name__ == "__main__":
    main()
