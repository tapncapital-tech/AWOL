# Workflow 03: Dynamic Rep Routing & 30-Day Attribution System

## Objective
Implement and verify the dynamic sales rep attribution system supporting URL query parameter detection (`?rep=...` or `?r=...`), 30-day cookie (`awol_rep`), `localStorage` synchronization, default fallback to Sylvester Moore El, and the persistent top Rep Business Card.

## Data Model & Roster
1. **Sylvester Moore El** (Default)
   - `rep_id`: `sylvester`
   - `rep_name`: `Sylvester Moore El`
   - `rep_number`: `1(202)618-1204`
   - `rep_email`: `tech@agentworkforce.online`
   - `rep_title`: `Lead AI Architect`
   - `avatar_initials`: `S`
2. **Robert Sam**
   - `rep_id`: `robert`
   - `rep_name`: `Robert Sam`
   - `rep_number`: `1(972) 559-9447`
   - `rep_email`: `sales@agentworkforce.online`
   - `rep_title`: `Sales Director`
   - `avatar_initials`: `R`
3. **Slot 3** (Reserved / Coming Soon)

## Components & Utilities
- `src/lib/repRoster.ts`: Roster definitions and lookup utilities.
- `src/lib/repAttribution.ts`: Browser cookie + localStorage detection and fallback logic.
- `src/components/RepBusinessCard.tsx`: Visual top bar business card with live phone link, email, title badge, and active status indicator.

## Execution
Run the verification script:
```bash
python3 execution/03_verify_rep_attribution.py
```

## Success Criteria
- Script validates roster integrity and query-to-rep resolution.
- Next.js build compiles without TypeScript errors.
- Default fallback resolves to Sylvester Moore El.
- Query parameters `?rep=robert` and `?r=robert` resolve to Robert Sam.
