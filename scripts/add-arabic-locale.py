"""정적 페이지의 로케일 Record 에 아랍어(ar) 항목을 추가한다.

배경
    각 페이지는 `Record<XLocale, T>` 형태로 ko/en/zh/ja/es/fr 여섯 벌을 들고 있고
    아랍어만 빠져 있었다. 그래서 /ar/ir, /ar/pipeline 같은 URL 이 영어 본문을 그대로
    렌더링했고, Search Console 이 이를 /en/* 의 중복으로 잡았다.

동작 방식
    `en:` 항목의 블록을 통째로 복제해 그 안의 문자열 리터럴만 아랍어로 바꾼 뒤
    `ar:` 로 삽입한다. 구조(중괄호·대괄호·키 이름·필드 순서)는 손대지 않으므로
    번역이 TypeScript 구문을 깨뜨릴 수 없다. 문자열 개수가 원본과 다르면 그 블록은
    건너뛰고 경고를 낸다 - 조용히 어긋난 파일을 내놓는 것보다 낫다.

    영어를 원본으로 삼는 이유는 이 파일들이 한국어와 영어를 모두 1급 원문으로 갖고
    있고, en 블록이 다른 다섯 언어의 기준이 되어 왔기 때문이다.

사용법
    python3 scripts/add-arabic-locale.py --plan            # 무엇을 바꿀지만 출력
    python3 scripts/add-arabic-locale.py --run             # 번역 후 파일 수정
    python3 scripts/add-arabic-locale.py --run --only ir
"""

import argparse
import json
import os
import re
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "src" / "app" / "[locale]"
CKPT = ROOT / "src" / "data" / ".arabic-ui-cache.json"

OLLAMA = os.environ.get("RC_OLLAMA", "http://192.168.0.206:11434/api/chat")
MODEL = os.environ.get("RC_MODEL", "qwen3.8:27b")

TARGETS = {
    "ir": APP / "ir" / "page.tsx",
    "pipeline": APP / "pipeline" / "page.tsx",
    "publications": APP / "publications" / "page.tsx",
    "sab": APP / "sab" / "page.tsx",
    "science": APP / "science" / "page.tsx",
    "about": APP / "about" / "page.tsx",
    "contact": APP / "contact" / "page.tsx",
    "cro": APP / "cro" / "page.tsx",
}

SYSTEM = (
    "You translate user-interface strings for a pharmaceutical company website into "
    "Modern Standard Arabic (فصحى). "
    "You receive a JSON array of English strings and must return a JSON array of the same "
    "length, same order, translated. Return ONLY the JSON array. "
    "Rules: (1) keep drug codes (RCI001, RCI001AH, RCI002, RCI003, RC0125), gene and protein "
    "names (TRPV1, GDF11, GPCR), company names, trial phase labels (Phase 1/2/3), patent and "
    "trial numbers, currency figures ($94B) and percentages in Latin script exactly as given; "
    "(2) never change a number; (3) if a string is only a code, a number or a proper noun, "
    "return it unchanged; (4) keep it short - these are headings, labels and captions, not prose; "
    "(5) no explanations, no transliteration of ordinary words."
)

STRING_RE = re.compile(r'"((?:[^"\\]|\\.)*)"')
KEY_BEFORE = re.compile(r'(\w+)\s*:\s*$')

# 값이 표시 문구가 아니라 코드·식별자·서식 토큰인 키. 번역하면 화면이 깨지거나
# 사실이 바뀐다. status 를 번역했다가 `status === "active"` 분기가 죽는 것을 보고
# 만든 목록이다.
DENY_KEYS = {
    # 렌더링 분기와 Tailwind 클래스
    "status", "color", "icon", "pipelineColor", "border", "bg", "card",
    # 식별자·번호·날짜
    "id", "slug", "category", "date", "quarter", "number", "filed", "registered",
    "identifier", "propertyID", "doi", "pct", "countryEn", "type", "operatingSystem",
    # 경로와 링크
    "href", "src", "url", "pdf", "image", "logo",
    # 고유명사
    "name", "givenName", "familyName", "proprietaryName", "author", "brand",
    # 지표 배지 - "$94B", "Phase 2", "70%" 처럼 숫자와 단위가 본체다
    "value",
}
# 번역할 필요가 없는 값: 알파벳 3자 이상 단어가 하나도 없는 문자열
WORD_RE = re.compile(r"[A-Za-z]{3,}")


def translatable(block, match):
    """문자열 앞의 키를 보고 번역 대상인지 판단한다."""
    km = KEY_BEFORE.search(block[: match.start()].rstrip()[-40:])
    if km and km.group(1) in DENY_KEYS:
        return False
    return bool(WORD_RE.search(match.group(1)))


def call_model(items, timeout=420):
    payload = {
        "model": MODEL,
        "think": False,
        "stream": False,
        "options": {"temperature": 0.2, "num_ctx": 8192},
        "messages": [
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": json.dumps(items, ensure_ascii=False)},
        ],
    }
    req = urllib.request.Request(
        OLLAMA,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        out = json.loads(r.read().decode("utf-8"))
    t = (out.get("message") or {}).get("content", "")
    t = re.sub(r"<think>[\s\S]*?</think>", "", t).strip()
    t = re.sub(r"^```[a-zA-Z]*\n|\n```$", "", t).strip()
    m = re.search(r"\[[\s\S]*\]", t)
    if not m:
        raise ValueError("no JSON array in reply")
    return json.loads(m.group(0))


def translate_all(strings, cache):
    todo = [s for s in strings if s not in cache and WORD_RE.search(s)]
    todo = list(dict.fromkeys(todo))
    for i in range(0, len(todo), 15):
        batch = todo[i : i + 15]
        for attempt in (1, 2, 3):
            try:
                got = call_model(batch)
                if len(got) != len(batch):
                    raise ValueError(f"length {len(got)} != {len(batch)}")
                for src, dst in zip(batch, got):
                    cache[src] = dst if isinstance(dst, str) and dst.strip() else src
                break
            except Exception as e:  # noqa: BLE001
                print(f"    ! batch {i//15}: attempt {attempt}: {e}", flush=True)
                time.sleep(3 * attempt)
        else:
            for s in batch:
                cache[s] = s
        CKPT.write_text(json.dumps(cache, ensure_ascii=False, indent=0), encoding="utf-8")
        print(f"    batch {i//15 + 1}: {min(i+15, len(todo))}/{len(todo)}", flush=True)
    return cache


def match_block(text, start):
    """start 는 여는 괄호 위치. 대응하는 닫는 괄호 다음 인덱스를 돌려준다."""
    opener = text[start]
    closer = {"[": "]", "{": "}"}[opener]
    depth, i, in_str = 1, start + 1, False
    while i < len(text) and depth:
        c = text[i]
        if in_str:
            if c == "\\":
                i += 2
                continue
            if c == '"':
                in_str = False
        elif c == '"':
            in_str = True
        elif c == opener:
            depth += 1
        elif c == closer:
            depth -= 1
        i += 1
    return i


def find_en_entries(text):
    """(키위치, 값시작, 값끝, 들여쓰기) 목록. fr 항목이 뒤따르는 en 항목만 고른다."""
    out = []
    for m in re.finditer(r"\n(\s*)en:\s*", text):
        indent = m.group(1)
        vstart = m.end()
        if text[vstart] in "[{":
            vend = match_block(text, vstart)
        elif text[vstart] == '"':
            sm = STRING_RE.match(text, vstart)
            if not sm:
                continue
            vend = sm.end()
        else:
            continue
        # 같은 들여쓰기의 fr: 를 Record 안에서 찾는다. ko/en/zh/ja/es/fr 순서라
        # en 다음에 zh·ja·es 블록이 통째로 끼어들어, 길이 제한을 두면 큰 Record 를
        # 통째로 놓친다. 들여쓰기 일치가 「같은 Record 의 형제 키」를 뜻한다.
        # 타입 선언 안의 en 은 데이터가 아니다. `type PatentFamily = { en: { title: string } }`
        # 같은 블록을 복제했다가 `ar: { title: string },;` 를 만들어 빌드가 깨졌다.
        # 데이터 블록에는 반드시 문자열 리터럴이 있고 타입 블록에는 없다.
        if not STRING_RE.search(text[vstart:vend]):
            continue
        rec_end = enclosing_end(text, m.start() + 1)
        scope = text[vend:rec_end]
        if not re.search(r"\n%sfr:\s*" % re.escape(indent), scope):
            continue
        # 이미 ar 이 있으면 건너뛴다. 이 검사를 「en 다음 첫 형제」로만 했다가
        # 키 순서가 ko·en·zh·ja·es·fr·ar 라 항상 fr 이 먼저 잡혔고, 재실행 시
        # ar 블록이 한 번 더 삽입돼 중복 키로 빌드가 깨졌다. Record 전체를 본다.
        if re.search(r"\n%sar:\s*" % re.escape(indent), scope):
            continue
        out.append((m.start(), vstart, vend, indent))
    return out


def enclosing_end(text, pos):
    """pos 를 감싸는 가장 가까운 여는 중괄호의 대응 닫는 위치."""
    depth, i, in_str = 0, pos, False
    while i > 0:
        c = text[i]
        if c == '"' and text[i - 1] != "\\":
            in_str = not in_str
        elif not in_str:
            if c == "}":
                depth += 1
            elif c == "{":
                if depth == 0:
                    return match_block(text, i)
                depth -= 1
        i -= 1
    return len(text)


def fr_entry_end(text, en_end, indent=""):
    pattern = r"\n(%s)fr:\s*" % re.escape(indent) if indent else r"\n(\s*)fr:\s*"
    m = re.compile(pattern).search(text, en_end)
    if not m:
        return None
    vstart = m.end()
    if text[vstart] in "[{":
        vend = match_block(text, vstart)
    elif text[vstart] == '"':
        sm = STRING_RE.match(text, vstart)
        vend = sm.end() if sm else None
    else:
        return None
    if vend is None:
        return None
    while vend < len(text) and text[vend] in " ,":
        vend += 1
    return vend, m.group(1)


def process(name, path, cache, apply_changes):
    text = path.read_text(encoding="utf-8")
    entries = find_en_entries(text)
    if not entries:
        print(f"  {name}: 대상 없음 (이미 ar 존재하거나 구조 불일치)")
        return text, 0

    strings = []
    for _, vs, ve, _ in entries:
        block = text[vs:ve]
        for m in STRING_RE.finditer(block):
            if translatable(block, m):
                strings.append(m.group(1))
    print(f"  {name}: en 블록 {len(entries)}개, 문자열 {len(strings)}개")
    if not apply_changes:
        return text, 0

    translate_all(strings, cache)

    added = 0
    for kstart, vs, ve, indent in sorted(entries, key=lambda e: -e[0]):
        block = text[vs:ve]
        pieces, last = [], 0
        for m in STRING_RE.finditer(block):
            src = m.group(1)
            dst = cache.get(src, src) if translatable(block, m) else src
            pieces.append(block[last : m.start()])
            pieces.append('"' + dst.replace("\\", "\\\\").replace('"', '\\"') + '"')
            last = m.end()
        pieces.append(block[last:])
        ar_block = "".join(pieces)

        pos = fr_entry_end(text, ve, indent)
        if pos is None:
            continue
        insert_at, fr_indent = pos
        text = text[:insert_at] + f"\n{fr_indent}ar: {ar_block}," + text[insert_at:]
        added += 1

    return text, added


def widen_type_members(text):
    """`type X = { ... fr: T; }` 형태의 로케일 멤버에 ar 를 추가한다.

    데이터 블록에 ar 를 넣으면 타입이 막는다(TS2353). 타입 선언은 복제 대상에서
    제외했으므로 여기서 fr 멤버 줄을 그대로 본떠 한 줄 더 넣는다. 값이 아니라
    타입이므로 번역할 것이 없다.
    """
    out, changed = text, False
    pattern = re.compile(r"\n(\s*)fr:\s*([^\n;,]+)([;,])")
    pos = 0
    while True:
        m = pattern.search(out, pos)
        if not m:
            break
        indent, tname, term = m.group(1), m.group(2).strip(), m.group(3)
        tail = out[m.end() : m.end() + 400]
        # 뒤에 같은 들여쓰기의 ar 이 이미 있으면 건너뛴다.
        if re.match(r"\s*\n%sar:" % re.escape(indent), tail):
            pos = m.end()
            continue
        # 값 블록이 아니라 타입 멤버일 때만 - 값이면 문자열이나 괄호로 시작한다.
        if tname.startswith(('"', "[", "{")) and not tname.endswith("}"):
            pos = m.end()
            continue
        if '"' in tname:
            pos = m.end()
            continue
        insert = f"\n{indent}ar: {tname}{term}"
        out = out[: m.end()] + insert + out[m.end() :]
        changed = True
        pos = m.end() + len(insert)
    return out, changed


def widen_types(text):
    """타입 유니언과 지원 로케일 집합에 ar 를 넣는다."""
    before = text
    text = re.sub(
        r'("ko"\s*\|\s*"en"\s*\|\s*"zh"\s*\|\s*"ja"\s*\|\s*"es"\s*\|\s*"fr")(?!\s*\|\s*"ar")',
        r'\1 | "ar"',
        text,
    )
    text = re.sub(
        r'(\[\s*"ko",\s*"en",\s*"zh",\s*"ja",\s*"es",\s*"fr")(\s*,?\s*\])',
        r'\1, "ar"\2',
        text,
    )
    text = re.sub(
        r'(\[\s*\n(\s*)"ko",\n\s*"en",\n\s*"zh",\n\s*"ja",\n\s*"es",\n\s*"fr",?\n)(\s*\])',
        lambda m: m.group(1) + f'{m.group(2)}"ar",\n' + m.group(3),
        text,
    )
    return text, text != before


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--plan", action="store_true")
    ap.add_argument("--run", action="store_true")
    ap.add_argument("--only")
    a = ap.parse_args()
    if not (a.plan or a.run):
        ap.print_help()
        sys.exit(1)

    cache = json.loads(CKPT.read_text(encoding="utf-8")) if CKPT.exists() else {}
    for name, path in TARGETS.items():
        if a.only and a.only != name:
            continue
        if not path.exists():
            print(f"  {name}: 파일 없음")
            continue
        text, added = process(name, path, cache, a.run)
        if not a.run:
            continue
        text, widened = widen_types(text)
        text, widened_members = widen_type_members(text)
        widened = widened or widened_members
        path.write_text(text, encoding="utf-8")
        print(f"  {name}: ar 블록 {added}개 삽입, 타입 확장 {'예' if widened else '아니오'}")


if __name__ == "__main__":
    main()
