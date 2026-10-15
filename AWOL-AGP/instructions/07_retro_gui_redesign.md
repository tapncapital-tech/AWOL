# Workflow 07: Neo-Brutalist & Retro Computer GUI Redesign

## Objective
Rebuild the visual aesthetic and layout to strictly match the reference screenshot:
1. **Canvas & Background**: Light warm cream background (`#f8f7f2`) with a retro dot-matrix grid pattern (`radial-gradient(#c7c5bc 1.5px, transparent 1.5px)`).
2. **Top Rep Business Card**: White card with thick dark borders (`border-2 border-black`), offset box shadow (`shadow-[4px_4px_0px_0px_#000]`), square initial badge with green status pip, `LEAD AI ARCHITECT` yellow pill badge, `LIVE DEMONSTRATION` green pill badge, descriptive tagline, and right-hand `SYSTEM: AWOL CORE v1.0.4 [ 24/7 ONLINE // READY ]` status module.
3. **Hero Header**:
   - Yellow pill badge: `● RAPID DISPATCH TELEPHONY: 24/7 RAPID EMERGENCY DISPATCH` with black border and offset shadow.
   - Massive high-impact title: `STOP MISSED CALLS • 24/7 AUTO-DISPATCH • HVAC, AC & PLUMBING`.
   - Explanatory subheadline regarding the 78% win-rate of 1st-ring emergency response.
4. **Interactive 1-Click Scenario Pills**: White rounded pills with black borders, blue bullet dots (`●`), and solid drop shadows.
5. **Call Voice Line Action**: High-contrast mint-green button (`bg-[#34d399] border-2 border-black shadow-[4px_4px_0px_0px_#000]`) opening the 4-digit PIN handoff proof modal.
6. **Chat / Voice Mode Selector**: Toggle pill buttons (`TERMINAL CHAT` vs `VOICE AVATAR`).
7. **Retro CRT Terminal**: Deep black monitor frame with `C:\AWOL\DISPATCH> RUN AUTOBOT.EXE APID DISPATCH PROOF [ PHONE PIN ] ● ONLINE` header, glowing green text, prompt stream, and quick inputs.

## Components Updated
- `src/app/globals.css`
- `src/components/RepBusinessCard.tsx`
- `src/components/RetroTerminal.tsx`
- `src/components/TelephonyModal.tsx`
- `src/components/RoiDashboard.tsx`
- `src/app/page.tsx`

## Execution
```bash
python3 execution/07_verify_retro_gui.py
```
