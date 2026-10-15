# Workflow 08: Pure HVAC Domain Realism Verification

## Objective
Verify that all cross-trade plumbing, pipe burst, flood, and water restoration references are 100% removed across all components, headlines, and terminal streams, ensuring the site is cohesive and authentic for HVAC contractors.

## Criteria
1. Headline reflects pure HVAC (`COMMERCIAL & RESIDENTIAL HVAC`).
2. Scenario pills are pure HVAC:
   - `Commercial AC Breakdown`
   - `Midnight No-Heat Furnace Outage`
   - `Rooftop Compressor Failure`
   - `Server Room Cooling Alarm`
   - `Refrigerant Leak & Heat Pump Outage`
3. Zero occurrences of `plumbing`, `pipe burst`, `flood`, or `water extraction` in `src/app/page.tsx` and `src/components/RetroTerminal.tsx`.
4. Next.js production build completes cleanly.

## Execution
```bash
python3 execution/08_verify_pure_hvac.py
```
