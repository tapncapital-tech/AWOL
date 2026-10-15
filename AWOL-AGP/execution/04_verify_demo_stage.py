#!/usr/bin/env python3
"""
Workflow 04 Verification Script: Demonstration Switcher & Terminal Stage
Tests component files, scenario pills, ephemeral PIN format, and Next.js compilation.
"""

import os
import subprocess
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

REQUIRED_COMPONENTS = [
    "src/components/RepBusinessCard.tsx",
    "src/components/DemoSelector.tsx",
    "src/components/RetroTerminal.tsx",
    "src/components/TelephonyModal.tsx",
    "src/components/VoiceVisualizer.tsx",
    "src/components/SyncGMPreview.tsx",
    "src/components/FieldOpsPreview.tsx",
    "src/components/RoiDashboard.tsx",
    "src/app/page.tsx",
]

EXPECTED_SCENARIO_PILLS = [
    "Commercial AC Breakdown",
    "Emergency Pipe Burst & Flood",
    "Midnight No-Heat HVAC Outage",
    "Main Sewer Line Backup",
    "Emergency Water Extraction",
]

def verify_component_files():
    print("[*] Verifying component files exist...")
    for comp in REQUIRED_COMPONENTS:
        full_path = os.path.join(BASE_DIR, comp)
        assert os.path.exists(full_path), f"Missing component: {comp}"
        print(f"  [✓] Verified: {comp}")

def verify_scenario_pills():
    print("[*] Verifying scenario pills in RetroTerminal.tsx...")
    terminal_path = os.path.join(BASE_DIR, "src/components/RetroTerminal.tsx")
    with open(terminal_path, "r", encoding="utf-8") as f:
        content = f.read()
    for pill in EXPECTED_SCENARIO_PILLS:
        assert pill in content, f"Scenario pill missing from RetroTerminal: {pill}"
        print(f"  [✓] Pill confirmed: {pill}")

def verify_pin_logic():
    print("[*] Verifying 4-digit PIN logic in TelephonyModal.tsx...")
    modal_path = os.path.join(BASE_DIR, "src/components/TelephonyModal.tsx")
    with open(modal_path, "r", encoding="utf-8") as f:
        content = f.read()
    assert "Math.floor(1000 + Math.random() * 9000)" in content, "4-digit random PIN logic missing"
    print("  [✓] 4-digit random PIN generator validated.")

def verify_nextjs_build():
    print("[*] Running full Next.js production build verification...")
    res = subprocess.run(["npm", "run", "build"], cwd=BASE_DIR, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[!] Build failed:\n{res.stderr}\n{res.stdout}", file=sys.stderr)
        sys.exit(res.returncode)
    print("  [✓] Next.js build compilation PASSED cleanly!")

def main():
    print("=== Workflow 04: Demo Stage & Terminal Verification ===")
    verify_component_files()
    verify_scenario_pills()
    verify_pin_logic()
    verify_nextjs_build()
    print("=== Workflow 04 SUCCESS ===")

if __name__ == "__main__":
    main()
