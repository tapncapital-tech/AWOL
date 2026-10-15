# Workflow 05: Local Preview & End-to-End Server Verification

## Objective
Launch the Next.js application on a local port (3000) and perform end-to-end HTTP and rendered DOM verification to ensure the page renders correctly, with all rep cards, CRT terminal text, and ROI dashboard elements properly in place.

## Execution
Run the verification script:
```bash
python3 execution/05_verify_local_server.py
```

## Success Criteria
- Next.js server starts locally and responds with HTTP 200 OK.
- Response contains executive rep branding ("Sylvester Moore El").
- Response contains the interactive CLI terminal and scenario chips.
- Response contains the ROI dashboard and calculator tokens.
- Server gracefully shuts down after validation.
