#!/usr/bin/env python3
"""
Workflow 08 Verification Script: Pure HVAC Realism
Checks for zero plumbing/flood occurrences and verifies pure HVAC scenarios and build.
"""

import os
import subprocess
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FILES_TO_CHECK = [
    "src/app/page.tsx",
    "src/components/RetroTerminal.tsx",
    "src/components/RoiDashboard.tsx",
    "project_specs.md",
]

FORBIDDEN_WORDS = ["plumbing", "pipe burst", "flood", "water extraction", "sewer"]

REQUIRED_HVAC_WORDS = [
    "Emergency AC repair",
    "Low Air Flow",
    "HVAC system leaking fluid",
]

def check_forbidden_terms():
    print("[*] Verifying zero forbidden non-HVAC terms in codebase...")
    for fpath in FILES_TO_CHECK:
        full = os.path.join(BASE_DIR, fpath)
        with open(full, "r", encoding="utf-8") as f:
            content = f.read().lower()
        for forbidden in FORBIDDEN_WORDS:
            assert forbidden not in content, f"Forbidden term '{forbidden}' found in {fpath}"
        print(f"  [✓] Verified clean: {fpath}")

def check_required_hvac_terms():
    print("[*] Verifying required pure HVAC scenarios in page.tsx...")
    page_file = os.path.join(BASE_DIR, "src/app/page.tsx")
    with open(page_file, "r", encoding="utf-8") as f:
        content = f.read()
    for req in REQUIRED_HVAC_WORDS:
        assert req in content, f"Required HVAC scenario missing: '{req}'"
        print(f"  [✓] HVAC scenario confirmed: {req}")

def check_build():
    print("[*] Running Next.js build compilation check...")
    res = subprocess.run(["npm", "run", "build"], cwd=BASE_DIR, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[!] Next.js build failed:\n{res.stderr}\n{res.stdout}", file=sys.stderr)
        sys.exit(res.returncode)
    print("  [✓] Build compilation PASSED cleanly!")

def main():
    print("=== Workflow 08: Pure HVAC Domain Realism Verification ===")
    check_forbidden_terms()
    check_required_hvac_terms()
    check_build()
    print("=== Workflow 08 SUCCESS ===")

if __name__ == "__main__":
    main()
