# Workflow 04: Demonstration Switcher & HVAC Tri-Modal Terminal Stage

## Objective
Build and verify the full interactive demonstration suite:
1. **Demo Switcher**: Tab selection between `HVAC-serf-awol` (active), `SyncGM` (enterprise management preview with glassmorphic transition), and `Example 3` (field ops teaser).
2. **Retro CRT Terminal**: Green monochrome CLI terminal styled as `RUN AUTOBOT.EXE APID DISPATCH PROOF`, with blinking cursor, command prompt, streaming dispatch replies, and the 5 emergency scenario chips.
3. **Telephony Proof Modal**: 4-digit ephemeral PIN generator modal with configurable dispatch phone number and dialing instructions.
4. **Voice Avatar Visualizer**: Animated canvas audio visualizer toggled from the terminal header.
5. **ROI & Performance Dashboard**: 99.4% recovery rate, < 3.2s response time, interactive revenue calculator based on $1,850 average job ticket, and live dispatch event ticker.

## Components Created
- `src/components/DemoSelector.tsx`
- `src/components/RetroTerminal.tsx`
- `src/components/TelephonyModal.tsx`
- `src/components/VoiceVisualizer.tsx`
- `src/components/RoiDashboard.tsx`
- Updated `src/app/page.tsx` assembling all layers.

## Execution
Run the verification script:
```bash
python3 execution/04_verify_demo_stage.py
```

## Success Criteria
- All 5 components created and integrated.
- Python test script validates scenario prompt generation and PIN format.
- Next.js production build (`npm run build`) completes with zero errors.
