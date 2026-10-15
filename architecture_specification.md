# AGENTWORKFORCE.ONLINE - SYSTEM ARCHITECTURE SPECIFICATION
**Document Version:** 1.0.0  
**Status:** Approved Architectural Baseline  
**Target Environment:** Google Cloud Platform (GCP) & Firebase Multi-Tenant Infrastructure  

---

## 1. ARCHITECTURAL OVERVIEW & DESIGN PRINCIPLES

`agentworkforce.online` is an enterprise demonstration and sales conversion platform built to showcase autonomous, multi-modal AI agents embedded into modern business workflows.

```
+---------------------------------------------------------------------------------------+
|                                    CUSTOMER TOUCHPOINTS                               |
|                                                                                       |
|   +--------------------------+    +--------------------------+    +---------------+   |
|   |       Website Chat       |    |  Avatar (Gemini Live)    |    |   Phone (CCAI)|   |
|   | [Next.js Streaming UI]   |    | [Web Audio / Canvas Vis] |    |  [Voice Stream]   |
|   +------------+-------------+    +------------+-------------+    +-------+-------+   |
|                |                               |                          |           |
+----------------|-------------------------------|--------------------------|-----------+
                 |                               |                          |
                 +-----------------------+-------+                          |
                                         |                                  |
                                         v                                  v
+----------------------------------------------------+      +---------------------------+
|               NEXT.JS EDGE GATEWAY                 |      | GOOGLE CLOUD CCAI / SIP   |
|  - Dynamic Rep Routing (/[repSlug])               |      | - Telephony Inbound Trunk |
|  - Ephemeral 4-Digit PIN Generator                |      | - DTMF / Speech PIN Input |
|  - Bidirectional Gemini Live WebSocket Proxy      |      +-------------+-------------+
+-------------------------+--------------------------+                    |
                          |                                               |
                          +-----------------------+-----------------------+
                                                  |
                                                  v
+---------------------------------------------------------------------------------------+
|                    GOOGLE AGENT DEVELOPMENT KIT (ADK) RUNTIME                         |
|                                                                                       |
|    +-----------------------------------------------------------------------------+    |
|    |                      Session & Context Persistence Manager                  |    |
|    |      - Cross-Channel Memory (Web <-> Phone <-> Avatar)                      |    |
|    |      - PIN-to-Session Resolution Table (Redis / Firestore Cache)            |    |
|    +--------------------------------------+--------------------------------------+    |
|                                           |                                           |
|                                           v                                           |
|    +-----------------------------------------------------------------------------+    |
|    |                     Multi-Agent Orchestrator (Supervisor)                   |    |
|    |   +-------------------+  +--------------------+  +---------------------+    |    |
|    |   | Sales / Qual Agent|  | Scheduling Agent   |  | Monitoring Agent    |    |    |
|    |   +-------------------+  +--------------------+  +---------------------+    |    |
|    +--------------------------------------+--------------------------------------+    |
+-------------------------------------------|-------------------------------------------+
                                            | Tool / Action Invocations
                                            v
+---------------------------------------------------------------------------------------+
|                               BUSINESS INTEGRATION LAYER                              |
|                                                                                       |
|  +------------------------+  +------------------------+  +-------------------------+  |
|  | Central Google Calendar|  | Multi-Tenant Firestore |  | Client Webhooks & CRMs  |  |
|  | - Single Owner Calendar|  | - Rep Profiles         |  | - Salesforce            |  |
|  | - Rep Metadata Tagging |  | - Lead Storage         |  | - HubSpot               |  |
|  +------------------------+  +------------------------+  +-------------------------+  |
+---------------------------------------------------------------------------------------+
```

### Core Principles
1. **Omnichannel Session Continuity:** State and contextual memory persist seamlessly across Website Text Chat, Gemini Live Avatar, and Telephony Voice AI using unified Google ADK session management.
2. **Multi-Tenancy by Design:** Strict tenant-level isolation across all data models, agent configurations, and session records, even while hosting the initial single tenant (`Tenant 0: AWOL`).
3. **Single Point of Contact (Front-Facing Customization):** Dynamic front-end routing customizes rep contact details (name, title, email, phone) on demand, while routing all calendar bookings to a single unified Google Calendar backend.
4. **Zero-Latency Audio/Visual Pipeline:** The visual avatar uses a lightweight, client-side Web Audio API canvas visualizer driven directly by Gemini Live audio streams, avoiding the latency and compute overhead of third-party video streaming engines.
5. **Google-Native Synergy:** Leveraging Next.js with Firebase, Google Cloud Run, Google ADK, Google Cloud Contact Center AI (CCAI), and Gemini 1.5/2.0 multimodal endpoints.

---

## 2. SYSTEM COMPONENTS & SUBSYSTEM DECOMPOSITION

### 2.1 Front-End Layer (Next.js & Firebase)
* **Framework:** Next.js (App Router, React, Tailwind CSS).
* **Hosting:** Firebase Hosting with Google Cloud Run integration for edge and SSR capabilities.
* **Rep Routing Engine:**
  * Clean subpath routing (`/[repSlug]`) and fallback query string parameter (`?rep=[repSlug]`).
  * Rep metadata is fetched from Firestore cache at edge/SSR runtime:
    * `rep_name`, `rep_title`, `rep_email`, `rep_phone`, `rep_avatar_url`.
  * Renders a customized conversion landing page without brand fragmentation.
* **Tri-Modal Interface Controller:**
  * **Text Mode:** Low-overhead streaming chat widget connected via Server-Sent Events (SSE) or WebSockets.
  * **Avatar Mode:** Full-duplex audio stream via Gemini Live API WebSocket proxy. A high-frequency Web Audio API analyzer renders an audio-reactive, responsive particle/orb visualizer on an HTML5 `<canvas>` element.
  * **PIN Utility:** A reactive pop-up generating a dynamic 4-digit PIN with a countdown timer (5-minute TTL) for visitors wishing to switch to phone dial-in.

### 2.2 Telephony Bridge Layer (Google Cloud CCAI)
* **Inbound Voice Ingestion:** Google Cloud Contact Center AI (CCAI) acts as the Session Initiation Protocol (SIP) / Telephony gateway.
* **Speech-to-Text & DTMF Handling:** Captures inbound user audio and dual-tone multi-frequency (DTMF) tones.
* **PIN Resolution Hook:**
  * Inbound calls trigger an introductory IVR: *"Welcome to Agent Workforce. Enter your 4-digit web PIN, or stay on the line to start a new session."*
  * DTMF/Voice PIN is validated against the Session Bridge table in Firestore/Redis.
  * If valid, CCAI bridges audio directly to the ongoing Google ADK session.

### 2.3 Agent Orchestration & Execution Layer (Google ADK)
* **Agent Development Kit (ADK) Runtime:** Runs inside a containerized Google Cloud Run microservice.
* **Supervisor Agent (Dispatcher):**
  * Evaluates intent, tracks conversation state, and delegates tasks to specialized sub-agents.
* **Specialized Agent Pool:**
  * **Sales & Discovery Agent:** Engages prospects, probes pain points (repetitive tasks, slow follow-ups, scattered data), and quantifies automation ROI.
  * **Lead Capture Agent:** Validates and stores contact data (Name, Email, Company, Phone, Scope).
  * **Scheduling Agent:** Checks free/busy slots via Google Calendar API, confirms slot selection, and issues calendar invites.
  * **Monitoring Agent:** Pre-configured mock worker demonstrating automated health/order checks against mock customer APIs.

### 2.4 Data & State Persistence Layer
* **Cloud Firestore:**
  * Hierarchical, multi-tenant document store.
  * Houses rep rosters, lead captures, consultation bookings, and session history.
* **In-Memory Cache (Redis / Firestore In-Memory State):**
  * Manages active WebSocket connections, ephemeral 4-digit PINs, and real-time audio chunk buffers.
* **Google Calendar API:**
  * Authenticated service-account-level integration writing directly to the platform owner's central calendar.
  * Automatically sets meeting title, description (including prospect qualification notes), and tags the associated rep as an optional attendee.

---

## 3. MULTI-TENANT DATA MODEL (FIRESTORE)

The database schema is partitioned by `tenant_id`. For internal operations, `tenant_id = "awol_primary"`.

```
/tenants/{tenant_id}
  │
  ├── /config/
  │     └── general: { company_name, domain, default_calendar_id, primary_timezone }
  │
  ├── /reps/{rep_id}
  │     └── {
  │           rep_slug: "alex",
  │           full_name: "Alex Rivera",
  │           title: "Senior AI Automation Architect",
  │           email: "alex@agentworkforce.online",
  │           phone: "+1-555-0199",
  │           active: true,
  │           created_at: TIMESTAMP
  │         }
  │
  ├── /sessions/{session_id}
  │     └── {
  │           tenant_id: "awol_primary",
  │           assigned_rep_id: "alex",
  │           channel: "web_chat" | "avatar_live" | "phone",
  │           status: "active" | "completed" | "abandoned",
  │           handoff_pin: "4821",
  │           pin_expires_at: TIMESTAMP,
  │           conversation_history: [
  │             { role: "user" | "agent", content: "...", timestamp: TIMESTAMP, channel: "..." }
  │           ],
  │           qualification_data: {
  │             company_size: "10-50",
  │             pain_point: "Manual customer follow-up",
  │             budget_bracket: "$5k-$10k"
  │           },
  │           updated_at: TIMESTAMP
  │         }
  │
  ├── /leads/{lead_id}
  │     └── {
  │           full_name: "Jane Smith",
  │           email: "jane@acmecorp.com",
  │           phone: "+1-555-4321",
  │           company: "Acme Corp",
  │           origin_rep_id: "alex",
  │           session_id: "sess_abc123",
  │           status: "qualified",
  │           created_at: TIMESTAMP
  │         }
  │
  └── /consultations/{consultation_id}
        └── {
              lead_id: "lead_xyz789",
              assigned_rep_id: "alex",
              google_calendar_event_id: "gcal_evt_556677",
              scheduled_time: TIMESTAMP,
              meeting_url: "https://meet.google.com/xyz-abcd-efg",
              status: "confirmed",
              created_at: TIMESTAMP
            }
```

---

## 4. CROSS-CHANNEL SESSION HANDOFF WORKFLOW

```
Web Client (Browser)             Next.js / ADK Gateway            CCAI / Telephony            Central DB / GCal
     |                                    |                              |                           |
     |--- 1. Starts Web Chat ------------>|                              |                           |
     |    (User gives name & pain points) |                              |                           |
     |                                    |--- 2. Write Session State -->|                           |
     |                                    |       to Firestore/Redis     |                           |
     |                                    |                              |                           |
     |<-- 3. Return 4-Digit PIN (8392) --|                              |                           |
     |       (Valid for 5 mins)           |                              |                           |
     |                                    |                              |                           |
     | [User switches to Phone]           |                              |                           |
     |                                    |                              |                           |
     |--- 4. Dials AWOL Phone Number ----------------------------------->|                           |
     |                                                                   |--- 5. Prompt for PIN ---->|
     |--- 6. Sends DTMF "8392" ----------------------------------------->|                           |
     |                                                                   |                           |
     |                                    |<-- 7. Query Session (8392) --|                           |
     |                                    |--- 8. Return History & Context ------------------------->|
     |                                    |                                                          |
     |                                    |    [Session Resumed via ADK]                             |
     |<===================================+==============================+ 9. Real-Time Conversation|
     |                                    |                                   (Voice AI continues)   |
     |                                    |                                                          |
     |--- 10. "Let's book Thursday 2pm" ->|                                                          |
     |                                    |--- 11. Call Calendar API ------------------------------->|
     |                                    |        (Insert event with Rep tags)                      |
     |<-- 12. Voice Confirms Booking -----|                                                          |
     |                                    |                                                          |
```

### Detailed Sequence Mechanics
1. **Initiation:** User engages `awol_autobot` via Web Chat or Live Avatar. A `session_id` is created under `/tenants/awol_primary/sessions/`.
2. **PIN Creation:** The user clicks "Switch to Phone" or the agent suggests a phone transition. The backend generates a cryptographically random, collision-free 4-digit PIN, writes an index record with a 300-second TTL, and displays it on the UI.
3. **Inbound Ingestion:** The user calls the platform's telephony line. Google Cloud CCAI intercepts the call, greets the caller, and requests the PIN via DTMF or speech.
4. **Context Hydration:** CCAI calls the ADK runtime webhook `POST /api/sessions/resolve-pin`. The runtime locates the active session, attaches the inbound telephone call channel to the existing memory buffer, and updates the channel status to `phone`.
5. **Seamless Continuation:** `awol_autobot` resumes: *"Welcome back, Jane. I still have your note about automating customer follow-ups. Let's find a time for your team to meet with Alex."*

---

## 5. TRI-MODAL INTERFACE ARCHITECTURES

### 5.1 Website Text Chat
* Pure JSON over WebSocket or chunked HTTP streaming.
* Minimal client footprint.
* Optimized for fast discovery, technical questions, and quick data entry.

### 5.2 Interactive Avatar (Gemini Live + Canvas Visualizer)
* **Audio Pipeline:** User microphone input $\to$ PCM 16kHz audio chunks $\to$ Next.js WebSocket Proxy $\to$ Gemini Live API (Bidirectional streaming).
* **Return Stream:** Gemini Live returns 24kHz PCM audio chunks $\to$ Client-side Web Audio API context $\to$ Speaker output.
* **Canvas Reactive Animation:**
  * An `AudioContext` and `AnalyserNode` analyze frequency bins (`getByteFrequencyData`).
  * A 60 FPS HTML5 `<canvas>` animation loop modulates radius, color gradient (AWOL brand neon/cyan/indigo), and particle velocity proportional to root-mean-square (RMS) energy.
  * Result: A sleek, ultra-responsive visual intelligence presence with **0ms additional network rendering latency**.

### 5.3 Telephony Voice AI (Google Cloud CCAI)
* SIP trunk handles public switched telephone network (PSTN) calls.
* Streaming gRPC connection bridges caller audio to Google Cloud Speech-to-Text and Gemini model nodes.
* Sub-second voice roundtrip latency using Google's low-latency text-to-speech synthesis profiles.

---

## 6. CALENDAR DISPATCH & SCHEDULING INTEGRATION

### 6.1 Single Master Calendar Strategy
Rather than maintaining fragmented OAuth credentials across multiple team members' individual accounts, the platform uses a **Centralized Authority Pattern**:
* A Google Cloud Service Account with domain-wide delegation or direct write privileges connects to the primary business calendar (`appointments@agentworkforce.online` or owner's primary inbox).
* When a consultation is scheduled:
  1. The assigned rep's profile is extracted from session context (`session.assigned_rep_id`).
  2. Free/busy slots are evaluated within authorized business operating windows (e.g., Mon–Fri 09:00–17:00 EST).
  3. The event is created via Google Calendar API `events.insert`.

### 6.2 Event Payload Specification
```json
{
  "summary": "AI Automation Strategy Session: Acme Corp / Jane Smith",
  "description": "Assigned Consultant: Alex Rivera (alex@agentworkforce.online)\n\nClient Notes:\n- Pain Point: Spending 20+ hrs/wk manually updating orders across ERP and CRM.\n- Current Stack: Salesforce, QuickBooks, Custom PostgreSQL.\n- Target Outcome: Automated bi-directional sync agent.\n\nSession ID: sess_987654321\nChannel: Telephony Transition",
  "start": { "dateTime": "2026-10-15T14:00:00-04:00" },
  "end": { "dateTime": "2026-10-15T14:45:00-04:00" },
  "attendees": [
    { "email": "jane@acmecorp.com", "displayName": "Jane Smith" },
    { "email": "alex@agentworkforce.online", "displayName": "Alex Rivera (AWOL)" },
    { "email": "owner@agentworkforce.online", "displayName": "Central Operations" }
  ],
  "conferenceData": {
    "createRequest": {
      "requestId": "sess_987654321_conf",
      "conferenceSolutionKey": { "type": "hangoutsMeet" }
    }
  }
}
```

---

## 7. MULTI-AGENT ORCHESTRATION HIERARCHY

The platform demonstrates enterprise capability through dynamic agent delegation:

```
                          +------------------------+
                          |    SUPERVISOR AGENT    |
                          | (Google ADK Router)    |
                          +-----------+------------+
                                      |
         +----------------------------+----------------------------+
         |                            |                            |
         v                            v                            v
+------------------+         +------------------+         +------------------+
|  SALES & QUAL    |         | SCHEDULING AGENT |         | MONITORING AGENT |
|      AGENT       |         |                  |         |  (DEMO WORKER)   |
+------------------+         +------------------+         +------------------+
| - Probes Ops     |         | - Evaluates GCal |         | - Queries Mock   |
| - Calculates ROI |         | - Manages Timezns|         |   ERP / DB APIs  |
| - Captures Info  |         | - Books Invites  |         | - Reports Status |
+------------------+         +------------------+         +------------------+
```

* **Tool Declarations:** Sub-agents utilize strictly defined function schemas:
  * `lookup_availability(date_range, timezone)`
  * `book_consultation(lead_details, slot_timestamp, rep_id)`
  * `query_system_status(order_number_or_account_id)` (Showcase tool)
  * `generate_phone_handoff_pin(session_id)`

---

## 8. SECURITY, PRIVACY & TENANCY BOUNDARIES

1. **Isolation Enforcement:** Every Firestore read and write operation is bound by security rules enforcing `request.auth` or internal backend microservice authentication matched with `tenant_id`.
2. **Ephemeral PIN Security:**
   * PINs are limited to numeric 4-digit codes with a strictly enforced 5-minute lifespan.
   * Rate limiting: Max 3 failed validation attempts per phone number before the PIN is invalidated to prevent brute-force association.
3. **Secret Management:** Google Cloud Secret Manager manages all API tokens (Gemini API keys, CCAI credentials, Service Account JSON certificates). Client applications never hold direct database write permissions to shared tables.
4. **PII Protection:** Audio data processed through Gemini Live and CCAI is streamed in-memory without persistent disk caching of raw audio unless explicitly configured for diagnostic logging.

---

## 9. INFRASTRUCTURE & DEPLOYMENT TOPOLOGY

* **Domain & DNS:** Managed via Cloudflare or Google Cloud DNS routing to Firebase Hosting edge nodes.
* **Compute Services:**
  * **Next.js Web Frontend:** Google Cloud Run (Fully managed, autoscaling 0-to-N instances).
  * **ADK Agent Engine:** Cloud Run Worker instance maintaining WebSocket connections and handling orchestrations.
* **Continuous Integration / Continuous Deployment (CI/CD):**
  * GitHub Actions automated pipeline executing linting, unit tests, Docker container builds, and zero-downtime deployment to Cloud Run and Firebase Hosting.