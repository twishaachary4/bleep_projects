function NoteCard({ note, onEdit, onDelete }) {
  const { id, title, body, category, time } = note;

  return (
    <article className={`note note-${category}`}>
      <span className="note-cat">{category}</span>
      <h3 className="note-title">{title}</h3>
      <p className="note-body">{body}</p>
      <p className="note-time">{time}</p>
      <div className="task-buttons">
        <button className="btn btn-sky small" onClick={() => onEdit(id)}>Edit</button>
        <button className="btn btn-pink small" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </article>
  );
}

export default NoteCard;