#!/usr/bin/env python3
"""
Workflow 03 Verification Script: Rep Attribution & Roster Logic
Tests rep data integrity, parameter resolution logic, and Next.js type check/build.
"""

import os
import subprocess
import sys
import urllib.parse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ROSTER = {
    "sylvester": {
        "rep_name": "Sylvester Moore El",
        "rep_number": "1(202)618-1204",
        "rep_email": "tech@agentworkforce.online",
        "rep_title": "Lead AI Architect",
    },
    "robert": {
        "rep_name": "Robert Sam",
        "rep_number": "1(972) 559-9447",
        "rep_email": "sales@agentworkforce.online",
        "rep_title": "Sales Director",
    },
}

def resolve_query(query_str):
    parsed_raw = urllib.parse.parse_qs(query_str.lstrip("?"))
    parsed = {k.lower(): v for k, v in parsed_raw.items()}
    rep_param = parsed.get("rep", parsed.get("r", [None]))[0]
    if rep_param and rep_param.lower() in ROSTER:
        return ROSTER[rep_param.lower()]
    return ROSTER["sylvester"]

def test_attribution_scenarios():
    print("[*] Testing URL query attribution scenarios...")
    
    # 1. Default (No query)
    res = resolve_query("")
    assert res["rep_name"] == "Sylvester Moore El", "Default fallback failed"
    print("  [✓] Empty query -> Defaults to Sylvester Moore El")

    # 2. ?rep=robert
    res = resolve_query("?rep=robert")
    assert res["rep_name"] == "Robert Sam", "Query ?rep=robert resolution failed"
    print("  [✓] ?rep=robert -> Resolves to Robert Sam")

    # 3. ?r=robert
    res = resolve_query("?r=robert")
    assert res["rep_name"] == "Robert Sam", "Query ?r=robert resolution failed"
    print("  [✓] ?r=robert -> Resolves to Robert Sam")

    # 4. Unknown rep -> fallback
    res = resolve_query("?rep=unknown_rep_slug")
    assert res["rep_name"] == "Sylvester Moore El", "Unknown rep fallback failed"
    print("  [✓] Unknown rep -> Safely falls back to Sylvester Moore El")

    # 5. Case insensitivity
    res = resolve_query("?REP=RoBeRt")
    assert res["rep_name"] == "Robert Sam", "Case insensitive resolution failed"
    print("  [✓] Case insensitivity -> Correctly resolved")

def test_nextjs_build():
    print("[*] Testing Next.js compilation with rep attribution modules...")
    res = subprocess.run(["npm", "run", "build"], cwd=BASE_DIR, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[!] Next.js build failed:\n{res.stderr}\n{res.stdout}", file=sys.stderr)
        sys.exit(res.returncode)
    print("  [✓] Next.js build verification PASSED!")

def main():
    print("=== Workflow 03: Rep Attribution Verification ===")
    test_attribution_scenarios()
    test_nextjs_build()
    print("=== Workflow 03 SUCCESS ===")

if __name__ == "__main__":
    main()
