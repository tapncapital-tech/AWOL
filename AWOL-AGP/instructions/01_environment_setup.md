# Workflow 01: Environment & Dependency Verification

## Objective
Verify that the host development environment possesses all required tools, runtimes, and dependencies before scaffolding the Next.js 15 web application.

## Requirements
1. **Python 3**: Python 3.9+ runtime to execute verification scripts.
2. **Node.js**: Node.js 18.18+ or 20+ required for Next.js 15.
3. **npm**: Node package manager installed and accessible in PATH.
4. **Directory Structure**: Ensure `instructions/`, `execution/`, and `.tmp/` directories exist.

## Execution
Run the matching verification script:
```bash
python3 execution/01_verify_environment.py
```

## Success Criteria
The script exits with code 0 and logs positive confirmation for:
- Python 3 version check
- Node.js version check
- npm availability
- Workspace directory layout
