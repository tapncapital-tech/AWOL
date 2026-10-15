# Project Specifications: AgentWorkforce.online

## 1. Executive Overview & Mission
**Agentworkforce.online** is an automated AI workforce demonstration platform designed to demonstrate the tangible business value of autonomous AI employees and convert visitors into booked consultations. 

The platform serves as an interactive portal where business owners explore real-world examples of AI workforce solutions. The **`hvac-serf-awol`** agent is the first active demonstration—serving as a high-impact example for trade contractors (showing 24/7 responsiveness, zero missed calls, and revenue capture). Subsequent demonstrations such as **`SyncGM`** and future vertical solutions will showcase different business applications under the same overarching platform.

---

## 2. Dynamic Rep Routing & 30-Day Attribution System
### 2.1 Rep Profile Data Model
The system supports multiple team members / sales reps. Each rep profile exposes:
- `rep_id`: Unique slug identifier (e.g., `sylvester`, `robert`)
- `rep_name`: Full name displayed on the card (e.g., "Sylvester Moore El")
- `rep_title`: Role badge (e.g., "Lead AI Architect", "Enterprise Sales Director")
- `rep_number`: Direct phone number formatted for display and `tel:` links (e.g., `1(202)618-1204`)
- `rep_email`: Direct email address (e.g., `tech@agentworkforce.online`)
- `avatar_initials`: Avatar character badge (e.g., "S", "R")

#### Pre-Configured Roster:
1. **Sylvester Moore El** (Default)
   - `rep_name`: "Sylvester Moore El"
   - `rep_number`: "1(202)618-1204"
   - `rep_email`: "tech@agentworkforce.online"
   - `rep_title`: "Lead AI Architect"
2. **Robert Sam**
   - `rep_name`: "Robert Sam"
   - `rep_number`: "1(972) 559-9447"
   - `rep_email`: "sales@agentworkforce.online"
   - `rep_title`: "Sales Director"
3. **Slot 3** (Reserved / Coming Soon)

### 2.2 30-Day Attribution Mechanism
- **Detection**: On initial visit, the application inspects URL query parameters (`?rep=sylvester`, `?rep=robert`, `?r=...`).
- **Persistence**: If found, it writes a secure 30-day cookie (`awol_rep`) and synchronizes with `localStorage`.
- **Fallthrough**: If no query param is present or valid, it reads the existing cookie/storage. If neither exists, it defaults to Sylvester Moore.
- **Bot Context Array**: The three active variables `[rep_name, rep_number, rep_email]` are dynamically injected into the active session context passed to the Dialogflow CX / bot engine around Step 11 of the conversation flow.
- **Analytics Ready**: Rep ID is attached as a dimension to all user interaction events (page view, demo switch, chat messages, PIN generation, call clicks).

---

## 3. Demonstration Selection & Layer Transition
Below the persistent top Rep Business Card, users can choose between 3 demonstrations:

1. **HVAC-serf-awol** (Active & Default):
   - 24/7 Rapid Emergency Dispatcher for Commercial & Residential HVAC (Heating, Ventilation & Air Conditioning).
   - Value Proposition: 78% of customers hire the first business that answers; eliminates missed calls and books on-call technicians.
   - Modes: Interactive Retro Terminal Chat (`RUN AUTOBOT.EXE`), Voice Avatar visualizer mode, and Live 4-Digit Telephony Proof modal.
2. **SyncGM** (Preview / Tech Transition Mode):
   - Modern enterprise management agent environment.
   - Visual shift trigger: When clicked, the demo stage undergoes a sleek animated visual transition (glassmorphic / cyan theme shift) displaying the SyncGM preview architecture card and "Join Early Access" notification.
3. **Example 3** (Placeholder / Sandbox):
   - Autonomous field ops / logistics agent teaser.

---

## 4. HVAC-serf-awol Tri-Modal Architecture
### 4.1 Functional Retro Terminal Chat
- **Visual Design**: Styled with authentic retro CRT / CLI aesthetics (`C:\AWOL\DISPATCH> RUN AUTOBOT.EXE APID DISPATCH PROOF [PHONE PIN] ONLINE`).
- **Engine**: Fully functional interactive chatbox directly communicating with Google Dialogflow CX agent `5b162614-4754-4fa9-b40a-dce8b6b22236` in project `hvac-serf-awol`.
- **Session Injection**: Posts the active rep array `[rep_name, rep_number, rep_email]` so the bot knows which team member is credited with the consultation booking.
- **Scenario Pills**: Quick-action emergency dispatch scenario chips:
  - `Commercial AC Breakdown`
  - `Midnight No-Heat Furnace Outage`
  - `Rooftop Compressor Failure`
  - `Server Room Cooling Alarm`
  - `Refrigerant Leak & Heat Pump Outage`
  Clicking a chip auto-submits the emergency inquiry directly into the terminal stream.

### 4.2 Live 4-Digit Ephemeral Session Handoff (Telephony Proof)
- **Modal Flow**: Clicking "Call Voice Line (Live 4-Digit Proof)" generates a unique 4-digit ephemeral PIN linked to the user's active session.
- **Dispatch Telephony**: Displays the live phone number (configurable via `NEXT_PUBLIC_DISPATCH_PHONE_NUMBER`) with click-to-call instructions ("Call the dispatch line and enter your 4-digit PIN to seamlessly bridge your web conversation to live phone audio").

### 4.3 Voice Avatar Canvas Visualizer
- Toggle tab allowing the user to switch from Terminal Chat to an audio-reactive canvas waveform avatar simulating real-time Gemini Live / telephony speech response.

---

## 5. Live ROI & Performance Dashboard
Positioned below the demonstration layer to demonstrate quantifiable business impact to commercial contractors:
- **Missed Call Recovery Rate**: 99.4% on 1st ring.
- **Average Emergency Response Time**: < 3.2 seconds.
- **Estimated Monthly Revenue Saved**: Dynamic calculator based on average job ticket ($1,850) and after-hours call volume.
- **Live Dispatch Feed**: Real-time ticker showing simulated emergency qualification and calendar dispatch logs.

---

## 6. Required Platforms, Subscriptions & Technology Tools

To run and deploy this platform, the following tools, services, and accounts are utilized:

### 6.1 Google Cloud Platform (GCP)
*All hosted on your existing Google Cloud account (`tapncapital@gmail.com`).*
- **Google Cloud Run (Active)**:
  - Purpose: Hosts the containerized Next.js web application.
  - Project: `awol-online` (Service: `awol-web`, Region: `us-central1`).
  - URL: `https://awol-web-4g7bm3uxea-uc.a.run.app/`
  - Cost/Subscription: Free tier covers up to 2 million requests/month, pay-as-you-go pennies thereafter.
- **Google Dialogflow CX (Active)**:
  - Purpose: Natural language AI engine powering the `hvac-serf-awol` bot.
  - Project: `hvac-serf-awol`
  - Agent ID: `5b162614-4754-4fa9-b40a-dce8b6b22236`
  - Cost/Subscription: Free trial tier / usage-based ($0.007 per text query).
- **Google Cloud Build & Artifact Registry (Active)**:
  - Purpose: Automates building and storing the Docker container images for deployment.
  - Cost/Subscription: 120 free build-minutes per day.
- **Google Calendar API & Service Account (Phase 2)**:
  - Purpose: Directly dispatches booked consultation events to the master calendar.
  - Cost/Subscription: Free API included with Google Cloud / Google Workspace.

### 6.2 Telephony & Voice Services (Plugged in when ready)
- **Twilio OR Google Cloud CCAI Phone Number (Future / Optional)**:
  - Purpose: Provides the live phone number for the 4-digit PIN telephony demonstration ("Call Voice Line").
  - Cost/Subscription: Phone number rental (~$1.15/month) + standard voice minutes (~$0.013/min). Currently configured with an environment variable placeholder (`NEXT_PUBLIC_DISPATCH_PHONE_NUMBER`) until you obtain the number.
- **Gemini Live / Web Audio API**:
  - Purpose: Powers the visual audio-reactive avatar canvas and real-time voice streaming.

### 6.3 Domain & DNS
- **Domain Registrar (Existing)**:
  - Domain: `agentworkforce.online`
  - Purpose: Custom domain mapped to the Google Cloud Run service `awol-web`.

### 6.4 Local Development Stack (Zero Cost / Open Source)
- **Node.js (v18+) & Next.js 15 (App Router)**: Core frontend/backend web application framework.
- **Tailwind CSS & Lucide Icons**: UI design system and retro CRT CRT visual effects.
- **Python 3**: For automated test workflows in `execution/` per `instructions.md`.
- **Google Cloud SDK (`gcloud`)**: CLI tool managing deployments and authentication.

---

## 7. What the User Can Send as Input
- **Rep Attribution**: URL parameter `?rep=sylvester` or `?rep=robert`.
- **Demo Selection**: Switching between HVAC, SyncGM, and Example 3.
- **Chat Prompts**: Typing emergency HVAC scenarios in the retro terminal or clicking pre-built emergency quick-action chips.
- **Handoff PIN**: Requesting a 4-digit phone handoff PIN.
- **Voice Mode**: Toggling between Terminal Chat and Voice Avatar view.

---

## 8. Expected Outputs
- Persistent personalized Rep Business Card pinned at the top with correct name, phone, email, and 30-day retention.
- Instant, contextual AI responses in the CRT terminal with real-time streaming feel.
- Interactive 4-digit PIN dialog with telephone dial-in instructions.
- Smooth visual transition between demonstration environments.
- Comprehensive ROI metric cards and dispatch activity feed.

---

## 9. Where Data is Stored
- **Browser State**: Cookies (`awol_rep`) + `localStorage` for 30-day attribution tracking and ephemeral session IDs.
- **Server/Agent State**: Google Dialogflow CX session state and Google Cloud Run container memory.
- **Calendar & Booking**: Google Calendar API / webhook integrations.

---

## 10. Definition of "Done"
1. `project_specs.md` reviewed and approved by user.
2. Next.js web application built with high-fidelity retro terminal matching the reference screenshot.
3. Top Rep Business Card dynamically switches based on `?rep=...` and persists for 30 days.
4. Rep array `[rep_name, rep_number, rep_email]` passes to Dialogflow CX session.
5. All 3 demo switcher states functioning (HVAC active, SyncGM preview transition, Example 3 placeholder).
6. 4-Digit PIN modal functional with configurable phone number.
7. Automated verification tests in `execution/` passing 100%.
8. Deployed to Google Cloud Run service `awol-web` at `https://awol-web-4g7bm3uxea-uc.a.run.app/` with live confirmation.
