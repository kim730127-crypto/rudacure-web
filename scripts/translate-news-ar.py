"""News Center 기사를 한국어 원문에서 아랍어로 번역한다.

왜 별도 스크립트인가
    translate-news.py 는 이미 존재하는 로케일 파일의 content 만 교체한다. 아랍어는
    news_ar.json 자체가 없었고 제목도 번역된 적이 없어, 파일을 만드는 단계와 제목을
    번역하는 단계가 더 필요하다. 나머지 - 온프렘 Ollama 호출, 체크포인트 기반 재개,
    HTML 태그 보존 규칙 - 는 같은 방식을 따른다.

    번역 원본은 항상 src/data/news.json(한국어)이다. 영어본을 거치면 두 번 번역한
    문장이 되어 사실이 흐려진다.

사용법
    python3 scripts/translate-news-ar.py --run      # 체크포인트에 번역 축적 (재개 가능)
    python3 scripts/translate-news-ar.py --status   # 진행률
    python3 scripts/translate-news-ar.py --merge    # news_ar.json 생성/갱신
    python3 scripts/translate-news-ar.py --verify   # 태그 수·잔여 한글 검사

주의
    --merge 는 체크포인트에 있는 항목만 반영한다. 번역이 안 끝난 기사는 한국어 원문이
    그대로 남으므로, --verify 가 0 을 낼 때까지 배포하지 않는다.
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
DATA = ROOT / "src" / "data"
SRC = DATA / "news.json"
OUT = DATA / "news_ar.json"
CKPT = DATA / ".news-ar-cache.json"

OLLAMA = os.environ.get("RC_OLLAMA", "http://192.168.0.206:11434/api/chat")
MODEL = os.environ.get("RC_MODEL", "qwen3.8:27b")

SYSTEM_BODY = (
    "You are a professional corporate translator for a pharmaceutical / biotech company. "
    "Translate the Korean source text into Modern Standard Arabic (فصحى). "
    "Output ONLY the translation - no preamble, no notes, no explanation, no transliteration "
    "of the whole text. "
    "Rules: (1) preserve every HTML tag, attribute and URL exactly as given, including <p>, "
    "<img>, <h3>, <table> and <a> tags and their order and count; (2) keep drug codes "
    "(RCI001, RCI001AH, RCI002, RCI003, RC0125, RC0165), patent numbers, trial identifiers, "
    "company names in Latin script and phase designations accurate - do not transliterate them "
    "into Arabic letters; (3) do not add, remove or soften any fact, number, date or figure; "
    "(4) use the register of a corporate newsroom announcement; (5) Arabic text reads "
    "right-to-left but the HTML structure must stay in the original order."
)

SYSTEM_TITLE = (
    "You are a professional corporate translator for a pharmaceutical / biotech company. "
    "Translate the Korean news headline into Modern Standard Arabic (فصحى). "
    "Output ONLY the headline - one line, no quotation marks, no preamble, no notes. "
    "Keep drug codes, patent numbers and company names in Latin script. "
    "Do not add or remove any fact."
)

# 긴 시스템 프롬프트에서 모델이 빈 응답(done_reason=stop, eval_count 낮음)을 내는
# 경우가 있다. 2026-09-17 기준 t:110 이 재현 가능했고, 같은 입력을 짧은 지시문으로
# 보내면 정상 번역이 나왔다. 규칙을 줄인 폴백 프롬프트를 2차 시도에 쓴다.
FALLBACK_BODY = (
    "Translate the Korean text into Modern Standard Arabic. "
    "Preserve every HTML tag and URL exactly. Keep drug codes and company names in Latin script. "
    "Output only the translation."
)
FALLBACK_TITLE = (
    "Translate the Korean news headline into Modern Standard Arabic. "
    "Output only the headline, one line."
)

HANGUL = re.compile(r"[\uac00-\ud7a3]")
TAG = re.compile(r"<[a-zA-Z/][^>]*>")


def call_model(system, text, timeout=420):
    payload = {
        "model": MODEL,
        "think": False,
        "stream": False,
        "options": {"temperature": 0.2, "num_ctx": 8192},
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": text},
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
    return t


def load_ckpt():
    return json.loads(CKPT.read_text(encoding="utf-8")) if CKPT.exists() else {}


def save_ckpt(c):
    CKPT.write_text(json.dumps(c, ensure_ascii=False, indent=0), encoding="utf-8")


def source_items():
    return json.loads(SRC.read_text(encoding="utf-8"))


def cmd_run():
    items = source_items()
    ckpt = load_ckpt()
    jobs = []
    for it in items:
        if it.get("title") and f"t:{it['id']}" not in ckpt:
            jobs.append(("t", it["id"], it["title"], SYSTEM_TITLE))
        if (it.get("content") or "").strip() and f"c:{it['id']}" not in ckpt:
            jobs.append(("c", it["id"], it["content"], SYSTEM_BODY))

    print(f"articles={len(items)} done={len(ckpt)} todo={len(jobs)}", flush=True)
    t0 = time.time()
    for n, (kind, nid, src, system) in enumerate(jobs, 1):
        key = f"{kind}:{nid}"
        fallback = FALLBACK_TITLE if kind == "t" else FALLBACK_BODY
        for attempt in (1, 2, 3, 4):
            try:
                # 1차는 규칙이 촘촘한 프롬프트, 2차부터는 짧은 폴백을 쓴다.
                out = call_model(system if attempt == 1 else fallback, src)
                floor = 4 if kind == "t" else 20
                if not out or len(out) < floor:
                    raise ValueError(f"short output ({len(out)} chars)")
                # 태그가 사라졌다면 번역이 아니라 요약이 돌아온 것이다.
                if kind == "c":
                    want, got = len(TAG.findall(src)), len(TAG.findall(out))
                    # 0.8 배까지 허용했더니 태그를 2-4개 흘린 기사가 4건 통과했다.
                    # 태그 하나가 사라지면 문단이나 이미지가 하나 사라진다는 뜻이라
                    # 정확히 일치할 때만 받는다.
                    if want != got:
                        raise ValueError(f"tag count {got} != {want}")
                ckpt[key] = out
                break
            except Exception as e:  # noqa: BLE001
                print(f"  ! {key} attempt {attempt}: {e}", flush=True)
                time.sleep(3 * attempt)
        if n % 5 == 0 or n == len(jobs):
            save_ckpt(ckpt)
            el = time.time() - t0
            rate = el / n
            print(
                f"[{n}/{len(jobs)}] {key} | {el/60:.1f}min | {rate:.1f}s/item | "
                f"eta {(len(jobs)-n)*rate/60:.0f}min",
                flush=True,
            )
    save_ckpt(ckpt)
    print("RUN COMPLETE", flush=True)


def cmd_merge():
    items = source_items()
    ckpt = load_ckpt()
    out, t_n, c_n = [], 0, 0
    for it in items:
        rec = dict(it)
        tk, ck = f"t:{it['id']}", f"c:{it['id']}"
        if tk in ckpt:
            rec["title"] = ckpt[tk]
            t_n += 1
        if ck in ckpt:
            rec["content"] = ckpt[ck]
            c_n += 1
        out.append(rec)
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{OUT.name}: {len(out)} articles, titles {t_n}, bodies {c_n}")


def cmd_repair():
    """검수에 걸린 항목을 체크포인트에서 지워 다음 --run 이 다시 번역하게 한다.

    대상은 두 가지다. 한글이 남아 있는 기사(번역이 아예 안 됐거나 원문이 그대로
    복사된 경우)와, HTML 태그 수가 원문과 다른 기사(문단이나 이미지가 사라진 경우).
    """
    if not OUT.exists():
        print("news_ar.json 없음 - --merge 를 먼저 실행한다.")
        sys.exit(1)
    ckpt = load_ckpt()
    ko = {i["id"]: i for i in source_items()}
    ar = json.loads(OUT.read_text(encoding="utf-8"))
    dropped = []
    for it in ar:
        k = ko.get(it["id"])
        if not k:
            continue
        if HANGUL.search(it.get("title", "")):
            dropped.append(f"t:{it['id']}")
        if HANGUL.search(it.get("content", "")):
            dropped.append(f"c:{it['id']}")
        elif len(TAG.findall(k.get("content", ""))) != len(TAG.findall(it.get("content", ""))):
            dropped.append(f"c:{it['id']}")
    removed = [d for d in dict.fromkeys(dropped) if ckpt.pop(d, None) is not None]
    save_ckpt(ckpt)
    print(f"체크포인트에서 {len(removed)}건 제거: {removed[:20]}")
    print("이제 --run 을 실행하면 해당 항목만 다시 번역한다.")


def cmd_status():
    items = source_items()
    ckpt = load_ckpt()
    need = sum(1 for i in items if i.get("title")) + sum(
        1 for i in items if (i.get("content") or "").strip()
    )
    done = sum(1 for i in items if f"t:{i['id']}" in ckpt) + sum(
        1 for i in items if f"c:{i['id']}" in ckpt
    )
    print(f"{done}/{need} ({100*done/max(need,1):.1f}%)")


def cmd_verify():
    if not OUT.exists():
        print("news_ar.json 없음 - --merge 를 먼저 실행한다.")
        sys.exit(1)
    ar = json.loads(OUT.read_text(encoding="utf-8"))
    ko = {i["id"]: i for i in source_items()}
    bad_hangul, bad_tags, missing = [], [], []
    for it in ar:
        k = ko.get(it["id"])
        if not k:
            continue
        if HANGUL.search(it.get("title", "")) or HANGUL.search(it.get("content", "")):
            bad_hangul.append(it["id"])
        want, got = len(TAG.findall(k.get("content", ""))), len(TAG.findall(it.get("content", "")))
        if want != got:
            bad_tags.append((it["id"], want, got))
        if not it.get("title"):
            missing.append(it["id"])
    print(f"기사 {len(ar)}건")
    print(f"  한글 잔존       {len(bad_hangul)}건 {bad_hangul[:12]}")
    print(f"  태그 수 불일치  {len(bad_tags)}건 {bad_tags[:8]}")
    print(f"  제목 없음       {len(missing)}건")
    if bad_hangul or missing:
        sys.exit(1)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--run", action="store_true")
    ap.add_argument("--merge", action="store_true")
    ap.add_argument("--status", action="store_true")
    ap.add_argument("--verify", action="store_true")
    ap.add_argument("--repair", action="store_true")
    a = ap.parse_args()
    if a.run:
        cmd_run()
    elif a.merge:
        cmd_merge()
    elif a.status:
        cmd_status()
    elif a.verify:
        cmd_verify()
    elif a.repair:
        cmd_repair()
    else:
        ap.print_help()
        sys.exit(1)
