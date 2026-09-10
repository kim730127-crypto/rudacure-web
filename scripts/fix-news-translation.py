"""Second pass over the news translation cache.

Two defects appear in a small minority of the LLM outputs:
  1. the model answers in English (or leaves the Korean source) instead of the
     requested target language;
  2. it appends the Korean original in parentheses, e.g. 株式会社（루다큐어 주식회사）,
     which does not belong on a non-Korean page.

This re-runs (1) with an explicit language assertion and strips (2) everywhere.
"""

import json
import re
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from importlib import import_module

tn = import_module("translate-news".replace("-", "_")) if False else None

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
CKPT = DATA / ".news-translation-cache.json"

import urllib.request

OLLAMA = "http://192.168.0.206:11434/api/chat"
MODEL = "qwen3.8:27b"
LANG_NAME = {"zh": "Simplified Chinese", "ja": "Japanese", "es": "Spanish", "fr": "French"}
SCRIPT_RANGE = {
    "zh": r"[\u4e00-\u9fff]",
    "ja": r"[\u3040-\u30ff\u4e00-\u9fff]",
    "es": r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]",
    "fr": r"[A-Za-zÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸàâäçéèêëîïôöùûüÿ]",
}

STRICT = (
    "You are a professional corporate translator for a pharmaceutical company. "
    "Translate the Korean source into {lang}. "
    "CRITICAL: the ENTIRE output must be written in {lang}. Do not answer in English. "
    "Do not leave any Korean. Do not append the Korean original in parentheses. "
    "Output ONLY the translation - no preamble, no notes. "
    "Preserve every HTML tag, attribute and URL exactly. Keep drug codes (RCI001, "
    "RCI001AH, RCI002, RCI003), company names and clinical terms accurate. "
    "Do not add or remove facts."
)


def call(lang, text, timeout=300):
    payload = {
        "model": MODEL, "think": False, "stream": False,
        "options": {"temperature": 0.15, "num_ctx": 8192},
        "messages": [
            {"role": "system", "content": STRICT.format(lang=lang)},
            {"role": "user", "content": text},
        ],
    }
    req = urllib.request.Request(
        OLLAMA, data=json.dumps(payload).encode(), headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        out = json.loads(r.read().decode())
    t = (out.get("message") or {}).get("content", "")
    t = re.sub(r"<think>[\s\S]*?</think>", "", t).strip()
    return re.sub(r"^```[a-zA-Z]*\n|\n```$", "", t).strip()


def strip_korean_parentheticals(text):
    """Remove （한글）/(한글) glosses appended next to a translated term."""
    text = re.sub(r"\s*[（(]\s*[가-힣][가-힣\s·,.\-0-9A-Za-z]*\s*[）)]", "", text)
    return text


def is_wrong_language(code, body):
    plain = re.sub(r"<[^>]+>", " ", body)
    plain = re.sub(r"https?://\S+", " ", plain)
    if code in ("zh", "ja"):
        target = len(re.findall(SCRIPT_RANGE[code], plain))
        hangul = len(re.findall(r"[가-힣]", plain))
        latin_words = len(re.findall(r"\b[A-Za-z]{3,}\b", plain))
        if hangul > 15:
            return True
        return target < max(20, latin_words)
    # es / fr : the failure mode is an English answer
    en = len(re.findall(
        r"\b(the|and|with|from|will|have|has|was|were|been|that|which|their|about|"
        r"through|during|announced|according|including|company|research)\b", plain, re.I))
    native = len(re.findall(
        r"\b(el|la|los|las|de|del|que|para|con|una|por|se|le|les|des|dans|pour|avec|"
        r"est|sont|sur|au|aux|une|du)\b", plain, re.I))
    return en >= 4 and native < en


def main():
    ck = json.loads(CKPT.read_text(encoding="utf-8"))
    ko = {i["id"]: i for i in json.loads((DATA / "news.json").read_text(encoding="utf-8"))}

    # pass 2a - strip Korean glosses everywhere
    stripped = 0
    for k, v in list(ck.items()):
        if k.startswith("ko:"):
            continue
        nv = strip_korean_parentheticals(v)
        if nv != v:
            ck[k] = nv
            stripped += 1
    print(f"stripped Korean glosses in {stripped} entries", flush=True)

    # pass 2b - re-run wrong-language outputs
    bad = [k for k, v in ck.items() if is_wrong_language(k.split(":")[0], v)]
    print(f"re-translating {len(bad)} wrong-language entries: {bad}", flush=True)
    for n, k in enumerate(bad, 1):
        code, nid = k.split(":")
        src = ko[int(nid)]["content"]
        for attempt in (1, 2, 3):
            try:
                out = call(LANG_NAME[code], src)
                out = strip_korean_parentheticals(out)
                if out and len(out) > 20 and not is_wrong_language(code, out):
                    ck[k] = out
                    print(f"  [{n}/{len(bad)}] {k} fixed", flush=True)
                    break
                raise ValueError("still wrong language")
            except Exception as e:  # noqa: BLE001
                print(f"  ! {k} attempt {attempt}: {e}", flush=True)
                time.sleep(2 * attempt)
        CKPT.write_text(json.dumps(ck, ensure_ascii=False, indent=0), encoding="utf-8")
    CKPT.write_text(json.dumps(ck, ensure_ascii=False, indent=0), encoding="utf-8")
    print("FIX PASS COMPLETE", flush=True)


if __name__ == "__main__":
    main()
