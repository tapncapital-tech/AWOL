# AGENTWORKFORCE.ONLINE - DETAILED TECHNICAL SPECIFICATIONS

**Document Version:** 1.0.0  
**Target Environment:** Google Antigravity IDE / Google Cloud Run / Firebase  
**Target Runtime:** Node.js 20+ LTS / TypeScript 5.x / Next.js 15+ (App Router)

---

## 1. PROJECT SPECIFICATION & SCOPE

`agentworkforce.online` is an automated AI workforce demonstration platform designed to convert visitors into booked consultations. It showcases `awol_autobot`, a multi-modal AI worker with unified session memory across Web Chat, Gemini Live Avatar (Audio-Reactive Canvas), and Telephony Voice AI.

### Core Deliverables
1. **Dynamic Rep Routing Subsystem:** Edge/SSR resolution for `/[repSlug]` and `?rep=[repSlug]` displaying tailored rep identity while maintaining a single unified booking calendar.
2. **Tri-Modal Front-End Engine:**
   - Text Chat Widget (SSE/Streaming).
   - Audio-Reactive Canvas Avatar using Web Audio API + Gemini Live WebSockets.
   - 4-Digit Ephemeral Session Handoff PIN modal.
3. **Agent Development Kit (ADK) Runtime:** Supervisor-worker multi-agent execution pipeline orchestrating qualification, booking, and session state.
4. **Google Cloud CCAI Webhook Bridge:** Telephony integration resolving 4-digit DTMF/voice PINs to resume active web sessions.
5. **Google Calendar API Booking Engine:** Service-account dispatched event creation onto the central master calendar.

---

## 2. REPOSITORY ARCHITECTURE & DIRECTORY MAP

```
agentworkforce/
├── .idx/
│   └── dev.nix                      # Antigravity / Google IDX environment config
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout & providers
│   │   ├── page.tsx                 # Default landing (Tenant 0 default rep)
│   │   ├── [repSlug]/
│   │   │   └── page.tsx             # Dynamic personalized rep landing
│   │   └── api/
│   │       ├── reps/
│   │       │   └── [repSlug]/route.ts
│   │       ├── sessions/
│   │       │   ├── init/route.ts
│   │       │   ├── pin/generate/route.ts
│   │       │   └── pin/resolve/route.ts # CCAI Telephony Webhook
│   │       ├── live/
│   │       │   └── ws/route.ts      # WebSocket proxy to Gemini Live
│   │       └── calendar/
│   │           ├── availability/route.ts
│   │           └── book/route.ts
│   ├── components/
│   │   ├── canvas/
│   │   │   └── AudioVisualizer.tsx  # Pure Web Audio API reactive canvas
│   │   ├── chat/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── InputBox.tsx
│   │   ├── modals/
│   │   │   └── PinHandoffModal.tsx  # Dynamic 4-digit code generation display
│   │   ├── rep/
│   │   │   └── RepHeaderCard.tsx    # Single Point of Contact banner
│   │   └── ui/                      # Shared atomic UI components
│   ├── lib/
│   │   ├── adk/
│   │   │   ├── supervisor.ts        # Google ADK multi-agent router
│   │   │   ├── tools/
│   │   │   │   ├── calendar.ts      # Tool: check availability & book
│   │   │   │   ├── crm.ts           # Tool: mock customer CRM query
│   │   │   │   └── pin.ts           # Tool: generate handoff PIN
│   │   │   └── prompts.ts           # System instructions for awol_autobot
│   │   ├── firebase/
│   │   │   ├── client.ts            # Client-side Firestore & Auth
│   │   │   └── admin.ts             # Firebase Admin SDK (Node runtime)
│   │   ├── gcal/
│   │   │   └── client.ts            # Google Calendar Service Account client
│   │   └── audio/
│   │       ├── audio-recorder.ts    # PCM 16kHz microphone capturer
│   │       └── audio-player.ts      # PCM 24kHz raw audio streaming buffer
│   ├── types/
│   │   └── index.ts                 # System TypeScript type contracts
│   └── styles/
│       └── globals.css
├── public/
│   └── audio-worklets/
│       └── pcm-processor.js         # Low-latency audio processing worklet
├── firebase.json
├── firestore.rules
├── next.config.ts
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 3. DEPENDENCIES & PACKAGE MANIFEST

```json
{
  "name": "agentworkforce-online",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@google/genai": "^0.1.1",
    "firebase": "^11.0.1",
    "firebase-admin": "^13.0.0",
    "googleapis": "^144.0.0",
    "lucide-react": "^0.460.0",
    "next": "^15.0.3",
    "react": "^19.0.0-rc-66855b96-20241025",
    "react-dom": "^19.0.0-rc-66855b96-20241025",
    "ws": "^8.18.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^22.9.0",
    "@types/react": "^19.0.0-rc.1",
    "@types/react-dom": "^19.0.0-rc.1",
    "@types/ws": "^8.5.13",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "typescript": "^5.6.3"
  }
}
```

---

## 4. TYPE DEFINITIONS & DATA CONTRACTS (`src/types/index.ts`)

```typescript
export interface RepProfile {
  repId: string;
  slug: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  active: boolean;
}

export type ChannelType = 'web_chat' | 'avatar_live' | 'phone';

export interface SessionState {
  sessionId: string;
  tenantId: string;
  assignedRepId: string;
  currentChannel: ChannelType;
  handoffPin?: string;
  pinExpiresAt?: number; // Epoch timestamp (ms)
  createdAt: number;
  updatedAt: number;
  qualification: LeadQualification;
  messages: Array<{
    role: 'user' | 'model' | 'system';
    content: string;
    channel: ChannelType;
    timestamp: number;
  }>;
}

export interface LeadQualification {
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  primaryPainPoint?: string;
  estimatedHoursWastedWeekly?: number;
  currentSystems?: string[];
  budgetBracket?: string;
}

export interface ConsultationBookingRequest {
  tenantId: string;
  sessionId: string;
  repSlug: string;
  leadDetails: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    notes?: string;
  };
  slotStartIso: string;
  slotEndIso: string;
}

export interface PinValidationRequest {
  pin: string;
  telephonyCallerId?: string;
}

export interface PinValidationResponse {
  valid: boolean;
  sessionId?: string;
  tenantId?: string;
  repId?: string;
  leadContext?: LeadQualification;
  recentMessages?: Array<{ role: string; content: string }>;
}
```

---

## 5. API SPECIFICATIONS & ROUTE HANDLERS

### 5.1 Dynamic Rep Resolver
* **Path:** `GET /api/reps/[repSlug]`
* **Purpose:** Returns the personalized profile for the header/contact card.
* **Response Schema:**
```json
{
  "success": true,
  "rep": {
    "repId": "rep_01",
    "slug": "alex",
    "fullName": "Alex Rivera",
    "title": "Principal AI Automation Architect",
    "email": "alex@agentworkforce.online",
    "phone": "+1-555-0199",
    "avatarUrl": "/avatars/alex.webp"
  }
}
```

### 5.2 Dynamic 4-Digit Handoff PIN Generation
* **Path:** `POST /api/sessions/pin/generate`
* **Payload:**
```json
{
  "sessionId": "sess_89f02c4b",
  "tenantId": "awol_primary"
}
```
* **Processing:**
  1. Generate random 4-digit code in range $[1000, 9999]$.
  2. Verify no active code collision in `tenants/awol_primary/pins/{pin}`.
  3. Store document with TTL: `pinExpiresAt = Date.now() + (5 * 60 * 1000)`.
  4. Update `tenants/awol_primary/sessions/{sessionId}` with current PIN.
* **Response Schema:**
```json
{
  "success": true,
  "pin": "8421",
  "expiresAt": 1792618950000,
  "dialInNumber": "+1-800-555-AWOL"
}
```

### 5.3 CCAI Telephony Webhook PIN Resolution
* **Path:** `POST /api/sessions/pin/resolve`
* **Headers:** `Authorization: Bearer <CCAI_WEBHOOK_SECRET>`
* **Payload:**
```json
{
  "pin": "8421",
  "telephonyCallerId": "+15551234567"
}
```
* **Processing:**
  1. Query `tenants/awol_primary/pins/{pin}`.
  2. Validate `Date.now() < pinExpiresAt`.
  3. Retrieve active conversation history and qualification data from linked session.
  4. Mark channel on session record as `'phone'`.
* **Response Schema:**
```json
{
  "valid": true,
  "sessionId": "sess_89f02c4b",
  "leadContext": {
    "fullName": "Jane Smith",
    "primaryPainPoint": "Manual invoice data entry between CRM and ERP"
  },
  "greetingPrompt": "Welcome back Jane. I have your notes on automating invoice entry between your CRM and ERP. Would you like to schedule your consultation now?"
}
```

### 5.4 Central Google Calendar Dispatch
* **Path:** `POST /api/calendar/book`
* **Authentication:** Next.js Server-Side API Secret.
* **Payload:** `ConsultationBookingRequest`
* **Processing:**
  1. Initialize `google.calendar({ version: 'v3', auth: serviceAccountAuth })`.
  2. Fetch target master calendar from `process.env.CENTRAL_GCAL_CALENDAR_ID`.
  3. Build event body:
     - `summary`: `Consultation: [Lead Name] / [Company] (Rep: [Rep Name])`
     - `description`: Structured lead notes, pain points, and session reference.
     - `attendees`: Client email, assigned Rep email, central admin email.
     - `conferenceData`: Google Meet link generation parameters.
  4. Execute `calendar.events.insert({ calendarId, conferenceDataVersion: 1, requestBody })`.
  5. Store record in `tenants/{tenantId}/consultations`.

---

## 6. GEMINI LIVE & WEB AUDIO API SPECIFICATION

### 6.1 Audio Input/Output Standards
* **Input (Mic to Live API):** Linear PCM 16-bit, 16000 Hz, 1 channel (mono), little-endian.
* **Output (Live API to Speaker):** Linear PCM 16-bit, 24000 Hz, 1 channel (mono), little-endian.
* **Chunk Frequency:** Audio slices emitted every $100\text{ ms}$ over WebSocket.

### 6.2 Visualizer Canvas Component Implementation (`AudioVisualizer.tsx`)
* **Technology:** HTML5 `<canvas>` driven by `window.requestAnimationFrame`.
* **Audio Analysis Node:**
  ```typescript
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 128;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  ```
* **Visual Representation:**
  - A glowing, animated concentric sphere or multi-frequency waveform reacting to:
    $$\text{RMS} = \sqrt{\frac{1}{N} \sum_{i=0}^{N-1} x_i^2}$$
  - Dynamic color gradients shift between Cyan (`#06b6d4`), Electric Indigo (`#6366f1`), and Emerald (`#10b981`) proportional to the user vs. agent speaking state.
  - Zero-latency: Operates directly off incoming AudioContext buffers before speaker playback.

---

## 7. AGENT SYSTEM PROMPT & ADK TOOL CONTRACTS

### 7.1 System Instruction (`awol_autobot`)
```markdown
You are awol_autobot, the lead AI workforce specialist at agentworkforce.online.
Your mission is to understand visitor business bottlenecks, demonstrate multi-agent capabilities, and schedule an architecture consultation on our central calendar.

Business Problems We Solve:
1. Repetitive manual tasks eating up high-value employee hours.
2. Prospective leads going cold due to delayed follow-ups.
3. Needing humans to monitor statuses, orders, or alerts across systems.
4. Scattered data across CRM, ERP, and databases that do not talk to each other.

Operating Principles:
- Be concise, sharp, and consultative.
- Identify: (1) Company Name, (2) Core bottleneck, (3) Current software tools used.
- When the visitor is qualified, proactively offer a 30-minute consultation with our automation team.
- Offer tools: Use `book_calendar_consultation` when the user agrees to a time.
- If the visitor wants to switch to phone, call `generate_handoff_pin` and read the code clearly.
```

### 7.2 ADK Tool Function Declarations
```json
[
  {
    "name": "lookup_calendar_slots",
    "description": "Checks available consultation slots on the central calendar.",
    "parameters": {
      "type": "object",
      "properties": {
        "startDateIso": { "type": "string", "description": "ISO start date" },
        "endDateIso": { "type": "string", "description": "ISO end date" },
        "timezone": { "type": "string", "description": "User local timezone" }
      },
      "required": ["startDateIso", "endDateIso"]
    }
  },
  {
    "name": "book_calendar_consultation",
    "description": "Books confirmed consultation to the central Google Calendar.",
    "parameters": {
      "type": "object",
      "properties": {
        "clientName": { "type": "string" },
        "clientEmail": { "type": "string" },
        "companyName": { "type": "string" },
        "startTimeIso": { "type": "string" },
        "primaryProblem": { "type": "string" }
      },
      "required": ["clientName", "clientEmail", "startTimeIso"]
    }
  },
  {
    "name": "generate_handoff_pin",
    "description": "Generates a 4-digit PIN for the visitor to switch to phone call voice AI.",
    "parameters": {
      "type": "object",
      "properties": {
        "sessionId": { "type": "string" }
      },
      "required": ["sessionId"]
    }
  }
]
```

---

## 8. ENVIRONMENT VARIABLES & SECRETS CONFIGURATION

```bash
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="agentworkforce-online.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="agentworkforce-online"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="agentworkforce-online.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:abcdef"

# Gemini & Google Cloud APIs
GEMINI_API_KEY="AIzaSy..."
GEMINI_LIVE_WS_ENDPOINT="wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent"

# Google Service Account (Calendar & Cloud Admin)
GOOGLE_SERVICE_ACCOUNT_EMAIL="awol-core-service@agentworkforce-online.iam.gserviceaccount.com"
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3...\n-----END PRIVATE KEY-----\n"
CENTRAL_GCAL_CALENDAR_ID="appointments@agentworkforce.online"

# Telephony Bridge Security
CCAI_WEBHOOK_AUTH_TOKEN="sec_tok_live_ccai_bridge_99482"
TELEPHONY_INBOUND_NUMBER="+1-800-555-2965"

# Multi-Tenancy Defaults
DEFAULT_TENANT_ID="awol_primary"
DEFAULT_REP_SLUG="alex"
```

---

## 9. IMPLEMENTATION CHECKLIST & PHASING (ANTIGRAVITY IDE)

### Phase 1: Foundation & Dynamic Routing
- [ ] Initialize Next.js 15 project in Antigravity IDE (`.idx/dev.nix` with Node.js 20).
- [ ] Setup Tailwind CSS styling and layout containers.
- [ ] Configure Firestore multi-tenant collections: `/tenants/awol_primary/reps/`.
- [ ] Implement `/[repSlug]/page.tsx` with dynamic SSR lookup of rep profile.

### Phase 2: Tri-Modal Agent Engine & Visualizer
- [ ] Build `AudioVisualizer.tsx` with Web Audio API canvas visualizer.
- [ ] Create WebSocket proxy route for Gemini Live API audio streaming.
- [ ] Construct the `awol_autobot` core chat widget with tool call interception.
- [ ] Build `PinHandoffModal.tsx` for generating and showing the 5-minute 4-digit code.

### Phase 3: Telephony & Calendar Systems
- [ ] Setup Service Account integration for Google Calendar API (`events.insert`).
- [ ] Build `/api/sessions/pin/resolve` webhook and link with Google Cloud CCAI.
- [ ] Implement booking confirmation flow: Slot check $\to$ GCal booking $\to$ Confirmation email trigger.

### Phase 4: Testing & Verification
- [ ] Verify dynamic rep URLs render custom contact information without broken assets.
- [ ] Verify web chat context survives handoff to telephony via 4-digit PIN test call.
- [ ] Verify scheduled meetings appear on the central Google Calendar with rep metadata accurately assigned.