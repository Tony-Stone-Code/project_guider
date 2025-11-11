# Project Context — Features & Self-Prompting

This document converts project features and required behaviour into a context-first format an AI agent can use for context engineering and self-prompting while building.

Project summary
- Small fullstack scaffold: Python FastAPI backend + React (Vite) frontend.
- Purpose: provide a starter template and pattern examples (API models, CORS, tests, dev commands).

Core features (context format)
- health-check: GET /health -> {status: "ok"}
  - contracts: no-auth, always returns simple JSON. Used by CI and smoke tests.

- echo service: POST /echo {message: string} -> {echo:string, length:int}
  - contracts: request model `EchoRequest` (pydantic), response includes derived fields.

Development & integration context
- backend runs on `http://127.0.0.1:8000` by default (uvicorn).
- frontend dev server runs on `http://localhost:5173`.
- CORS is preconfigured allowing the Vite dev origin; if the frontend host/port changes, update `backend/app/main.py` origins.

Self-prompt templates for the agent
Use these short prompts when asking the model to perform focused tasks.

1) Add a new CRUD resource (example: `notes`):
"Create a new FastAPI router `backend/app/routers/notes.py` that implements CRUD for `Note` (id:int, title:str, body:str). Use pydantic models, include unit tests under `backend/tests/`. Register the router in `backend/app/main.py` at `/notes`. Keep handlers synchronous unless strong reason. Add examples in `CONTEXT.md` responses."

2) Frontend UI for a new resource:
"Add a React page `frontend/src/pages/Notes.jsx` that lists notes from GET /notes and supports create/update/delete using fetch. Keep UI minimal and documented in `README.dev.md`."

3) API client generation:
"Generate a small typed client `frontend/src/api.js` that exports `fetchNotes()` and `createNote()` for use by the UI. Base URL should come from an env var `VITE_API_BASE` with default `http://127.0.0.1:8000`."

When to ask the repo owner
- Any destructive edits to `README.md` or top-level files.
- If runtime/language preferences contradict these scaffolds.

How the agent should use this file
- Load `CONTEXT.md` into the prompt context when generating code or tests. Use the self-prompt templates to break work into small, testable steps. After each change, run or describe the relevant local verification (unit test, smoke test, dev server behavior).
