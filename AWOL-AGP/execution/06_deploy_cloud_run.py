#!/usr/bin/env python3
"""
Workflow 06: Google Cloud Run Deployment & Live Verification
Deploys awol-web container to Cloud Run and verifies live HTTPS endpoint.
"""

import os
import shutil
import subprocess
import sys
import time
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ID = "awol-online"
SERVICE_NAME = "awol-web"
REGION = "us-central1"
LIVE_URL = "https://awol-web-4g7bm3uxea-uc.a.run.app/"

def check_gcloud():
    gcloud_path = shutil.which("gcloud")
    if not gcloud_path:
        candidate = os.path.expanduser("~/google-cloud-sdk/bin/gcloud")
        if os.path.exists(candidate):
            gcloud_path = candidate
    if not gcloud_path:
        raise RuntimeError("gcloud CLI is not installed or not in PATH.")
    out = subprocess.check_output([gcloud_path, "--version"], text=True).splitlines()[0]
    print(f"[+] gcloud CLI detected: {out} at {gcloud_path}")
    return gcloud_path

def deploy_service(gcloud_path):
    print(f"[*] Deploying {SERVICE_NAME} to Google Cloud Run (project: {PROJECT_ID}, region: {REGION})...")
    cmd = [
        gcloud_path,
        "run",
        "deploy",
        SERVICE_NAME,
        f"--project={PROJECT_ID}",
        f"--region={REGION}",
        "--source=.",
        "--allow-unauthenticated",
        "--port=8080",
    ]
    print(f"[*] Command: {' '.join(cmd)}")
    res = subprocess.run(cmd, cwd=BASE_DIR, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"Cloud Run deployment failed with return code {res.returncode}")
    print("[+] Cloud Run deployment finished successfully.")

def verify_live():
    print(f"[*] Verifying live endpoint at {LIVE_URL}...")
    for attempt in range(1, 10):
        try:
            req = urllib.request.Request(
                LIVE_URL,
                headers={"User-Agent": "AWOL-Verification-Agent/1.0"}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                if response.status == 200:
                    body = response.read().decode("utf-8")
                    assert "AgentWorkforce.online" in body or "Sylvester" in body, "Live endpoint returned unexpected content"
                    print(f"[+] Live URL responded with HTTP 200 OK! Verification successful.")
                    return
        except Exception as e:
            print(f"  [-] Attempt {attempt} waiting for service propagation ({e})...")
            time.sleep(3)
    raise RuntimeError("Live verification failed after 10 attempts.")

def main():
    print("=== Workflow 06: Google Cloud Run Deployment ===")
    gcloud_bin = check_gcloud()
    deploy_service(gcloud_bin)
    verify_live()
    print("=== Workflow 06 SUCCESS ===")

if __name__ == "__main__":
    main()
