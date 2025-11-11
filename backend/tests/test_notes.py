import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_notes_crud():
    from backend.app.main import app

    async with AsyncClient(app=app, base_url="http://test") as ac:
        # create
        r = await ac.post("/notes", json={"title": "t1", "body": "b1"})
        assert r.status_code == 201
        data = r.json()
        assert data["id"] == 1

        # list
        r = await ac.get("/notes")
        assert r.status_code == 200
        assert len(r.json()) == 1

        # get
        r = await ac.get("/notes/1")
        assert r.status_code == 200

        # update
        r = await ac.put("/notes/1", json={"title": "t1b"})
        assert r.status_code == 200
        assert r.json()["title"] == "t1b"

        # delete
        r = await ac.delete("/notes/1")
        assert r.status_code == 204

        # not found
        r = await ac.get("/notes/1")
        assert r.status_code == 404
