from pydantic import BaseModel
from typing import Optional


class NoteBase(BaseModel):
    title: str
    body: str


class NoteCreate(NoteBase):
    pass


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None


class Note(NoteBase):
    id: int

    class Config:
        orm_mode = True
