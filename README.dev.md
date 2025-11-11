Project Guider — Developer runbook

This repo was scaffolded with a minimal Python FastAPI backend and a Vite + React frontend.

Backend (Python / FastAPI)
- location: `backend/`
- requirements: `backend/requirements.txt`
- entrypoint: `backend/app/main.py` (FastAPI app)

Dev run (PowerShell)

1) Create and activate a venv, install deps:

```powershell
# create virtualenv
python -m venv .venv
# activate
.\.venv\Scripts\Activate.ps1
# install
pip install -r backend/requirements.txt
# run server
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

Frontend (Vite + React)
- location: `frontend/`
- dev server runs on port 5173 by default.

Dev run (PowerShell)

```powershell
# from repo root
cd frontend
# install dependencies (npm is the preferred package manager)
npm install
# start dev server
npm run dev
```

Notes
- Frontend expects backend at `http://127.0.0.1:8000` for demo endpoints; update `frontend/src/App.jsx` or backend CORS if you change ports.
- Tests: `pytest` from repo root will discover backend tests (after installing `backend/requirements.txt`).

Environment variables
- The backend reads secrets from `backend/.env` (Pydantic `BaseSettings` or `python-dotenv` can be used). Do NOT commit `backend/.env` to git.
- Add a `backend/.env` by copying `backend/.env.example` and filling in values. Example file includes:

```text
# backend/.env (local, DO NOT COMMIT)
GROQ_API_KEY=sk_live_your_groq_key_here
GROQ_API_URL=https://api.groq.ai/v1/inference
```

Quick PowerShell (one-off) to set env var for this session instead of a file:

```powershell
$env:GROQ_API_KEY = "sk_live_your_groq_key_here"
# then run the server
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```
