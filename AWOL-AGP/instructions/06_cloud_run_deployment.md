# Workflow 06: Google Cloud Run Deployment

## Objective
Deploy the containerized Next.js application to Google Cloud Run (`awol-web` in project `awol-online`, region `us-central1`), mapping to `https://awol-web-4g7bm3uxea-uc.a.run.app/`.

## Prerequisites & Checklist
1. **Local Test Completed**: Verified in Workflow 05 (`execution/05_verify_local_server.py`).
2. **Environment & Secrets**: `.env` configured with necessary environment variables.
3. **Deployment Command Approval**: Under Rule 5, the command must be shown and approved before running.
4. **Cloud Run Command**:
   ```bash
   gcloud run deploy awol-web \
     --project awol-online \
     --region us-central1 \
     --source . \
     --allow-unauthenticated \
     --port 8080
   ```
5. **Live Verification**: Confirm `https://awol-web-4g7bm3uxea-uc.a.run.app/` returns HTTP 200 and loads the updated platform.

## Execution
Run the deployment script once approved:
```bash
python3 execution/06_deploy_cloud_run.py
```
