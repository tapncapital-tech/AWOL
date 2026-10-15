#!/usr/bin/env python3
"""
Workflow 05 Verification Script: Local Server Preview & E2E Validation
Spawns Next.js on port 3000, performs HTTP verification, and shuts down cleanly.
"""

import os
import subprocess
import sys
import time
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 3000
URL = f"http://localhost:{PORT}"

def test_server():
    print(f"[*] Starting Next.js production server on port {PORT}...")
    proc = subprocess.Popen(
        ["npm", "run", "start", "--", "-p", str(PORT)],
        cwd=BASE_DIR,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    started = False
    html_content = ""

    try:
        # Poll server until ready
        for attempt in range(1, 20):
            time.sleep(1)
            try:
                with urllib.request.urlopen(URL, timeout=2) as response:
                    if response.status == 200:
                        html_content = response.read().decode("utf-8")
                        started = True
                        print(f"  [✓] Server reached successfully on attempt {attempt} (HTTP 200)")
                        break
            except Exception:
                continue

        assert started, f"Server failed to respond on {URL} after 20 seconds."

        # Verify critical elements in rendered output
        assertions = [
            ("AgentWorkforce.online", "Platform title"),
            ("Sylvester Moore El", "Default assigned representative"),
            ("RUN AUTOBOT.EXE", "Retro terminal dispatch prompt"),
            ("Missed Call Recovery", "Contractor ROI metrics"),
            ("HVAC Agent", "Active demonstration badge"),
        ]

        print("[*] Validating rendered HTML response tokens...")
        for text, desc in assertions:
            assert text in html_content, f"Assertion failed: Missing '{text}' ({desc})"
            print(f"  [✓] Verified rendered token: {desc} ('{text}')")

    finally:
        print("[*] Gracefully shutting down local preview server...")
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
        print("  [✓] Server process exited cleanly.")

def main():
    print("=== Workflow 05: Local Preview & Server E2E Verification ===")
    test_server()
    print("=== Workflow 05 SUCCESS ===")

if __name__ == "__main__":
    main()
