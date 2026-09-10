"""Re-translate News Center article bodies from the Korean source with an LLM.

Replaces the previous dictionary word-substitution approach
(scripts/translate-news-titles.py), which produced mixed-language text such as
"The 保健福利部 and the 中小企业部 announced ..." because it swapped individual
words inside an English base string instead of translating the sentence.

Source of truth is src/data/news.json (Korean). Output is written incrementally
to a checkpoint file so the run is resumable, then merged into the locale files
by --merge.

Usage:
    python3 scripts/translate-news.py --run          # translate into checkpoint
    python3 scripts/translate-news.py --merge        # apply checkpoint to news_*.json
    python3 scripts/translate-news.py --status       # progress
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
CKPT = DATA / ".news-translation-cache.json"

OLLAMA = os.environ.get("RC_OLLAMA", "http://192.168.0.206:11434/api/chat")
MODEL = os.environ.get("RC_MODEL", "qwen3.8:27b")

LANGS = {
    "zh": ("Simplified Chinese", DATA / "news_zh.json"),
    "ja": ("Japanese", DATA / "news_ja.json"),
    "es": ("Spanish", DATA / "news_es.json"),
    "fr": ("French", DATA / "news_fr.json"),
}

# An English-heavy body in a non-English locale means the dictionary substitution
# left the English base in place.
EN_STOPWORDS = (
    r"\b(the|and|with|for|from|will|have|has|was|were|been|that|this|which|their"
    r"|about|through|during|after|before|while|both|also|company|companies|meeting"
    r"|research|development|treatment|clinical|held|attended|conducted|announced"
    r"|reported|said|according|between|including)\b"
)

SYSTEM = (
    "You are a professional corporate translator for a pharmaceutical / biotech company. "
    "Translate the Korean source text into {lang}. "
    "Output ONLY the translation - no preamble, no notes, no explanation, no romanisation. "
    "Rules: (1) preserve every HTML tag, attribute and URL exactly as given, including <p> and "
    "<img> tags and their order; (2) keep drug codes (RCI001, RCI001AH, RCI002, RCI003, RC0125), "
    "company names, trial phases and regulatory terms accurate; (3) do not add, remove or soften "
    "any fact; (4) use the register of a corporate newsroom announcement."
)


def needs_translation(item, ko_item):
    body = (item.get("content") or "").strip()
    if not body:
        return False
    if not (ko_item.get("content") or "").strip():
        return False
    plain = re.sub(r"<[^>]+>", " ", body)
    return len(re.findall(EN_STOPWORDS, plain, re.I)) >= 3


def call_model(lang_name, text, timeout=300):
    payload = {
        "model": MODEL,
        "think": False,
        "stream": False,
        "options": {"temperature": 0.2, "num_ctx": 8192},
        "messages": [
            {"role": "system", "content": SYSTEM.format(lang=lang_name)},
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
    text_out = (out.get("message") or {}).get("content", "")
    text_out = re.sub(r"<think>[\s\S]*?</think>", "", text_out).strip()
    # strip a stray code fence if the model adds one
    text_out = re.sub(r"^```[a-zA-Z]*\n|\n```$", "", text_out).strip()
    return text_out


def load_ckpt():
    if CKPT.exists():
        return json.loads(CKPT.read_text(encoding="utf-8"))
    return {}


def save_ckpt(c):
    CKPT.write_text(json.dumps(c, ensure_ascii=False, indent=0), encoding="utf-8")


def build_queue():
    ko = {i["id"]: i for i in json.loads((DATA / "news.json").read_text(encoding="utf-8"))}
    queue = []
    for code, (lang_name, path) in LANGS.items():
        items = json.loads(path.read_text(encoding="utf-8"))
        for it in items:
            k = ko.get(it["id"])
            if k and needs_translation(it, k):
                queue.append((code, lang_name, it["id"], k["content"]))
    return queue


def cmd_run():
    queue = build_queue()
    ckpt = load_ckpt()
    todo = [q for q in queue if f"{q[0]}:{q[2]}" not in ckpt]
    print(f"queue={len(queue)} done={len(ckpt)} todo={len(todo)}", flush=True)
    t0 = time.time()
    for n, (code, lang_name, nid, src) in enumerate(todo, 1):
        key = f"{code}:{nid}"
        for attempt in (1, 2, 3):
            try:
                out = call_model(lang_name, src)
                if out and len(out) > 20:
                    ckpt[key] = out
                    break
                raise ValueError(f"short output ({len(out)} chars)")
            except Exception as e:  # noqa: BLE001
                print(f"  ! {key} attempt {attempt}: {e}", flush=True)
                time.sleep(3 * attempt)
        if n % 5 == 0 or n == len(todo):
            save_ckpt(ckpt)
            el = time.time() - t0
            rate = el / n
            print(
                f"[{n}/{len(todo)}] {key} | {el/60:.1f}min elapsed | "
                f"{rate:.1f}s/item | eta {(len(todo)-n)*rate/60:.0f}min",
                flush=True,
            )
    save_ckpt(ckpt)
    print("RUN COMPLETE", flush=True)


def cmd_merge():
    ckpt = load_ckpt()
    total = 0
    for code, (_lang, path) in LANGS.items():
        items = json.loads(path.read_text(encoding="utf-8"))
        n = 0
        for it in items:
            key = f"{code}:{it['id']}"
            if key in ckpt:
                it["content"] = ckpt[key]
                n += 1
        path.write_text(
            json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        print(f"{path.name}: {n} bodies replaced")
        total += n
    print("merged", total)


def cmd_status():
    queue = build_queue()
    ckpt = load_ckpt()
    done = sum(1 for q in queue if f"{q[0]}:{q[2]}" in ckpt)
    print(f"{done}/{len(queue)} translated ({100*done/max(len(queue),1):.1f}%)")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--run", action="store_true")
    ap.add_argument("--merge", action="store_true")
    ap.add_argument("--status", action="store_true")
    a = ap.parse_args()
    if a.run:
        cmd_run()
    elif a.merge:
        cmd_merge()
    elif a.status:
        cmd_status()
    else:
        ap.print_help()
        sys.exit(1)
