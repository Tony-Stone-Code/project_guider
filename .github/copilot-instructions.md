## Purpose

This file gives concise, actionable guidance for an AI coding agent (Copilot/assistant) to be immediately productive in this repository.

## Repo snapshot (what I found)
- Top-level: `README.md` only. No source files, manifests (package.json, pyproject.toml, etc.), or CI configs were present when this file was generated.

## First steps the agent should take
1. Confirm the project language and entry points by searching for common manifests and source files. Example checklist:
   - `package.json`, `pnpm-lock.yaml`, `yarn.lock` (Node)
   - `pyproject.toml`, `requirements.txt`, `setup.py` (Python)
   - `pom.xml`, `build.gradle` (Java)
   - `*.csproj` (C#/.NET)
   - `Dockerfile`, `Makefile`
2. If none of the above exist (like now), ask the repository owner: "What language/runtime and entrypoint should I target?" Provide a short list of suggested scaffolds you can create.

## Project-specific patterns and constraints (discoverable)
- Minimal repo: there are no discoverable build/test scripts or directories. Don't assume frameworks or test suites exist.
- Reference file: `README.md` — keep edits minimal and ask before replacing or deleting it.

## How to propose/implement changes
- When adding new code, create a small scaffold that includes:
  - a top-level manifest (`package.json` / `pyproject.toml`) if missing, with a single `start` or `run` script
  - a minimal `src/` and `tests/` layout
  - a README update that documents how to run locally
- Prefer separate commits for: scaffold, feature, tests, and docs. Use clear commit messages like `feat(scaffold): add Node.js scaffold`.

## Debugging and verification guidance
- If build/test commands are unknown, list likely commands to the human and ask which to run. Example (do not run without confirmation):
```powershell
# Node: npm install; npm test
# Python: python -m venv .venv; .\.venv\Scripts\pip install -r requirements.txt; pytest
```

## Project-specific conventions and extras
- Merge & PR guidance: Keep changes minimal, explain why each file was added, and list manual steps a reviewer should run to validate (install, run tests). Open a draft PR for non-trivial changes.
- Integration points: No discoverable external integrations. If adding dependencies, prefer well-known OSS libraries and pin versions in the manifest.
- Integration points: No discoverable external integrations. If adding dependencies, prefer well-known OSS libraries and pin versions in the manifest.

## Frontend package manager
- The frontend scaffold uses npm by default. When modifying or extending the frontend, prefer `npm install` and `npm run ...` for consistency. If the maintainer prefers `pnpm` or `yarn`, confirm before switching.

## When information is missing — exact questions to ask the maintainer
1. What language / runtime should I target? (Node, Python, .NET, other)
2. Is there an existing service or entrypoint file (app.js, main.py, Program.cs)? If so, where?
3. Preferred test framework and CI provider?

## Safety & change policy
- Do not delete or replace `README.md` without explicit confirmation. If you add scaffolding, update `README.md` describing the scaffold and how to run tests.
- Open a draft PR for any non-trivial change and include the short checklist of manual steps you took so a human can review quickly.

## Notes for future maintainers
- If you add build manifests, update this file with the canonical build/test commands and any repo-specific linting or format rules.

---
If any part of this is unclear or you want me to target a specific language/runtime, tell me which one and I will scaffold a minimal project (manifest, `src/`, `tests/`) and update this file with concrete run/test commands.
