from fastapi import APIRouter, HTTPException
from typing import List
from backend.app.schemas import Note, NoteCreate, NoteUpdate
import itertools

router = APIRouter(prefix="/notes", tags=["notes"])

# Very small in-memory store for demo purposes.
_store = {}
_id_counter = itertools.count(1)


@router.get("", response_model=List[Note])
async def list_notes():
    return list(_store.values())


@router.post("", response_model=Note, status_code=201)
async def create_note(payload: NoteCreate):
    nid = next(_id_counter)
    note = Note(id=nid, **payload.dict())
    _store[nid] = note
    return note


@router.get("/{note_id}", response_model=Note)
async def get_note(note_id: int):
    note = _store.get(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@router.put("/{note_id}", response_model=Note)
async def update_note(note_id: int, payload: NoteUpdate):
    note = _store.get(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    updated = note.copy(update=payload.dict(exclude_unset=True))
    _store[note_id] = updated
    return updated


@router.delete("/{note_id}", status_code=204)
async def delete_note(note_id: int):
    if note_id in _store:
        del _store[note_id]
    else:
        raise HTTPException(status_code=404, detail="Note not found")
