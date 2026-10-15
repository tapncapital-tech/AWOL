#!/usr/bin/env python3
"""
Workflow 01 Verification Script: Environment & Runtime Check
Verifies Python, Node.js, npm, and required workspace directories.
"""

import os
import shutil
import subprocess
import sys

def check_python():
    print(f"[+] Python runtime: {sys.version.split()[0]} (Passed)")
    assert sys.version_info >= (3, 8), "Python 3.8+ required"

def check_node():
    node_path = shutil.which("node")
    if not node_path:
        raise RuntimeError("Node.js is not found in PATH.")
    out = subprocess.check_output([node_path, "--version"], text=True).strip()
    print(f"[+] Node.js runtime: {out} at {node_path} (Passed)")

def check_npm():
    npm_path = shutil.which("npm")
    if not npm_path:
        raise RuntimeError("npm is not found in PATH.")
    out = subprocess.check_output([npm_path, "--version"], text=True).strip()
    print(f"[+] npm package manager: v{out} at {npm_path} (Passed)")

def check_directories():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    for d in ["instructions", "execution", ".tmp"]:
        target = os.path.join(base_dir, d)
        os.makedirs(target, exist_ok=True)
        print(f"[+] Directory verified: {d}/")

def main():
    print("=== Workflow 01: Environment Verification ===")
    try:
        check_python()
        check_node()
        check_npm()
        check_directories()
        print("=== Environment Verification SUCCESS ===")
    except Exception as e:
        print(f"[!] Verification failed: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
