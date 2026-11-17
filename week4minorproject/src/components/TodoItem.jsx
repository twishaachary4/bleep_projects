import { useState } from "react";

function TodoItem({ task, onToggle, onDelete, onSave }) {
  const { id, text, done, due } = task; // destructuring
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);

  const today = new Date().toISOString().slice(0, 10);
  const overdue = due && !done && due < today;

  const saveEdit = () => {
    if (draft.trim() === "") return;
    onSave(id, draft.trim());
    setEditing(false);
  };

  return (
    <li className={`task ${done ? "task-done" : ""}`}>
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(id)}
        aria-label={`Mark ${text} as completed`}
      />

      <div className="task-body">
        {editing ? (
          <input
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Edit task"
            autoFocus
          />
        ) : (
          <span className="task-text">{text}</span>
        )}

        <div className="task-meta">
          <span className={`badge ${done ? "badge-done" : "badge-pending"}`}>
            {done ? "Completed" : "Pending"}
          </span>
          {due && (
            <span className={`due ${overdue ? "due-late" : ""}`}>
              Due {due}
              {overdue && " (late!)"}
            </span>
          )}
        </div>
      </div>

      <div className="task-buttons">
        {editing ? (
          <button className="btn btn-mint small" onClick={saveEdit}>Save</button>
        ) : (
          <button className="btn btn-sky small" onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className="btn btn-pink small" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;