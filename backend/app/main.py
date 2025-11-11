from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="project-guider-api", version="0.1.0")

# Allow local dev frontend by default. If you change frontend port, update this.
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EchoRequest(BaseModel):
    message: str


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/echo")
async def echo(req: EchoRequest):
    """Simple example endpoint: echo back the message with a short analysis.

    This is a placeholder to show how to structure request/response models.
    """
    return {"echo": req.message, "length": len(req.message)}


# Register routers
try:
    from .routers import notes
    app.include_router(notes.router)
except Exception:
    # router import is optional during some analysis steps
    pass
