# Workflow 09: Live Dialogflow CX Backend Integration

## Objective
Verify the end-to-end integration between the Next.js web application and the live Google Dialogflow CX agent `5b162614-4754-4fa9-b40a-dce8b6b22236` in project `hvac-serf-awol` (location: `global`).

## Architecture
1. **Official SDK**: `@google-cloud/dialogflow-cx` installed in `package.json`.
2. **Server-Side API**: `src/app/api/chat/route.ts` handles POST requests, passes rep attribution data (`rep_name`, `rep_number`, `rep_email`, `rep_id`) into session parameters, calls `detectIntent`, and returns agent responses.
3. **Session Continuity**: Preserves visitor session IDs across multiple turns.
4. **Client-Side Terminal**: `src/components/RetroTerminal.tsx` connects directly to `/api/chat` with graceful fallback handling.
5. **IAM Configuration**: Cloud Run service account `881416316008-compute@developer.gserviceaccount.com` and web service account `hvac-web-sa@hvac-serf-awol.iam.gserviceaccount.com` granted `roles/dialogflow.client`.

## Execution
```bash
python3 execution/09_verify_live_dialogflow.py
```
