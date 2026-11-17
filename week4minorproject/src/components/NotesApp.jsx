import { useState, useEffect } from "react";
import NoteCard from "./NoteCard.jsx";
import Chips from "./Chips.jsx";

const categories = ["Study", "Ideas", "Personal", "Fun"];

function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("muchi-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Study");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("muchi-notes", JSON.stringify(notes));
  }, [notes]);

  const resetForm = () => {
    setTitle("");
    setBody("");
    setCategory("Study");
    setEditingId(null);
  };

  const saveNote = (e) => {
    e.preventDefault();
    if (title.trim() === "" && body.trim() === "") return;
    const time = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    if (editingId) {
      // editing an old note
      setNotes(
        notes.map((n) =>
          n.id === editingId
            ? { ...n, title: title.trim(), body: body.trim(), category, time: `Edited ${time}` }
            : n
        )
      );
    } else {
      // creating a new note
      const newNote = { id: Date.now(), title: title.trim(), body: body.trim(), category, time: `Created ${time}` };
      setNotes([newNote, ...notes]);
    }
    resetForm();
  };

  const startEdit = (id) => {
    const note = notes.find((n) => n.id === id);
    setTitle(note.title);
    setBody(note.body);
    setCategory(note.category);
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (editingId === id) resetForm();
  };

  const visibleNotes = notes.filter((n) => {
    const matchesCategory = catFilter === "All" || n.category === catFilter;
    const words = `${n.title} ${n.body}`.toLowerCase();
    return matchesCategory && words.includes(search.toLowerCase());
  });

  return (
    <section className="card card-sky" aria-label="Notes app">
      <h2 className="section-title">My notes</h2>

      <form className="note-form" onSubmit={saveNote}>
        <label className="sr-only" htmlFor="note-title">Note title</label>
        <input
          id="note-title"
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="sr-only" htmlFor="note-body">Note text</label>
        <textarea
          id="note-body"
          className="input"
          rows="3"
          placeholder="Write your note here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="form-row">
          <label className="sr-only" htmlFor="note-cat">Category</label>
          <select
            id="note-cat"
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button className="btn btn-mint" type="submit">
            {editingId ? "Update note" : "Add note"}
          </button>
          {editingId && (
            <button className="btn" type="button" onClick={resetForm}>Cancel</button>
          )}
        </div>
      </form>

      <label className="sr-only" htmlFor="search">Search notes</label>
      <input
        id="search"
        className="input search"
        type="search"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Chips
        options={["All", ...categories]}
        active={catFilter}
        onPick={setCatFilter}
        label="Filter notes by category"
      />

      {visibleNotes.length === 0 ? (
        <p className="empty">No notes found. Write one above!</p>
      ) : (
        <div className="notes-grid">
          {visibleNotes.map((note) => (
            <NoteCard key={note.id} note={note} onEdit={startEdit} onDelete={deleteNote} />
          ))}
        </div>
      )}
    </section>
  );
}

export default NotesApp;