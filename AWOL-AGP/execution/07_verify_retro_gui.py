#!/usr/bin/env python3
"""
Workflow 07 Verification Script: Retro Computer / Neo-Brutalist GUI Check
Tests component integrity, Next.js build compilation, and rendered tokens.
"""

import os
import subprocess
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def verify_codebase():
    print("[*] Running Next.js build verification on redesigned GUI...")
    res = subprocess.run(["npm", "run", "build"], cwd=BASE_DIR, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[!] Next.js build failed:\n{res.stderr}\n{res.stdout}", file=sys.stderr)
        sys.exit(res.returncode)
    print("  [✓] Next.js build compilation PASSED cleanly!")

def verify_design_tokens():
    print("[*] Verifying visual tokens in source code...")
    page_file = os.path.join(BASE_DIR, "src/app/page.tsx")
    with open(page_file, "r", encoding="utf-8") as f:
        content = f.read()

    tokens = [
        "RAPID DISPATCH TELEPHONY: 24/7 RAPID EMERGENCY DISPATCH",
        "STOP MISSED CALLS",
        "HVAC, AC",
        "Call Voice Line (Live 4-Digit Proof)",
        "TERMINAL CHAT",
        "VOICE AVATAR",
    ]

    for tok in tokens:
        assert tok in content, f"Missing required design token: {tok}"
        print(f"  [✓] Verified token: {tok}")

def main():
    print("=== Workflow 07: Retro Computer GUI Verification ===")
    verify_design_tokens()
    verify_codebase()
    print("=== Workflow 07 SUCCESS ===")

if __name__ == "__main__":
    main()
