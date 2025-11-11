import React, { useState, useEffect } from "react";
import { fetchNotes, createNote, updateNote, deleteNote } from "./api";

export default function App() {
  // echo demo
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState(null);

  // notes
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editing, setEditing] = useState(null);

  async function send() {
    const res = await fetch("http://127.0.0.1:8000/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });
    const j = await res.json();
    setReply(j);
  }

  async function loadNotes() {
    try {
      const n = await fetchNotes();
      setNotes(n);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleCreateOrUpdate(e) {
    e.preventDefault();
    try {
      if (editing) {
        await updateNote(editing.id, { title, body });
        setEditing(null);
      } else {
        await createNote({ title, body });
      }
      setTitle("");
      setBody("");
      await loadNotes();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete note?")) return;
    try {
      await deleteNote(id);
      await loadNotes();
    } catch (err) {
      console.error(err);
    }
  }

  function startEdit(note) {
    setEditing(note);
    setTitle(note.title);
    setBody(note.body);
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 20 }}>
      <h1>Project Guider — Demo</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Echo demo</h2>
        <p>
          Type a message and call the FastAPI backend <code>/echo</code> endpoint.
        </p>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="hello"
        />
        <button onClick={send} style={{ marginLeft: 8 }}>
          Send
        </button>
        {reply && (
          <pre style={{ marginTop: 12 }}>{JSON.stringify(reply, null, 2)}</pre>
        )}
      </section>

      <section>
        <h2>Notes</h2>
        <form onSubmit={handleCreateOrUpdate} style={{ marginBottom: 12 }}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: 300 }}
          />
          <input
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: 400, marginLeft: 8 }}
          />
          <button type="submit" style={{ marginLeft: 8 }}>
            {editing ? "Update" : "Create"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setTitle("");
                setBody("");
              }}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          )}
        </form>

        <div>
          {notes.length === 0 && <div>No notes yet</div>}
          {notes.map((n) => (
            <div
              key={n.id}
              style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}
            >
              <strong>{n.title}</strong>
              <div>{n.body}</div>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => startEdit(n)}>Edit</button>
                <button onClick={() => handleDelete(n.id)} style={{ marginLeft: 8 }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
