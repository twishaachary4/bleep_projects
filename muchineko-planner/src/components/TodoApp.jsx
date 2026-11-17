import { useState, useEffect } from "react";
import TodoItem from "./TodoItem.jsx";
import Chips from "./Chips.jsx";
import ProgressBar from "./ProgressBar.jsx";

function TodoApp() {
  // load saved tasks from localStorage (or start empty)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("muchi-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [due, setDue] = useState("");
  const [filter, setFilter] = useState("All");

  // save every time tasks change
  useEffect(() => {
    localStorage.setItem("muchi-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    const newTask = { id: Date.now(), text: text.trim(), done: false, due };
    setTasks([newTask, ...tasks]); // spread operator
    setText("");
    setDue("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const saveTask = (id, newText) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  };

  const visibleTasks = tasks.filter((t) => {
    if (filter === "Completed") return t.done;
    if (filter === "Pending") return !t.done;
    return true;
  });

  const doneCount = tasks.filter((t) => t.done).length;
  const percent = tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);

  return (
    <section className="card card-yellow" aria-label="To-Do app">
      <h2 className="section-title">My tasks</h2>
      <ProgressBar percent={percent} />

      <form className="form-row" onSubmit={addTask}>
        <label className="sr-only" htmlFor="task-text">New task</label>
        <input
          id="task-text"
          className="input"
          placeholder="What do you want to do?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label className="sr-only" htmlFor="task-due">Due date</label>
        <input
          id="task-due"
          type="date"
          className="input date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
        <button className="btn btn-pink" type="submit">Add task</button>
      </form>

      <Chips
        options={["All", "Completed", "Pending"]}
        active={filter}
        onPick={setFilter}
        label="Filter tasks"
      />

      {visibleTasks.length === 0 ? (
        <p className="empty">Nothing here yet. Add a task above!</p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onSave={saveTask}
            />
          ))}
        </ul>
      )}

      <p className="count">{doneCount} of {tasks.length} tasks done</p>
    </section>
  );
}

export default TodoApp;