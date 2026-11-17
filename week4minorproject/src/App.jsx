import { useState } from "react";
import Header from "./components/Header.jsx";
import Chips from "./components/Chips.jsx";
import TodoApp from "./components/TodoApp.jsx";
import NotesApp from "./components/NotesApp.jsx";

function App() {
  // which app is showing right now
  const [tab, setTab] = useState("To-Do");

  return (
    <div className="app">
      <Header title="Planner" subtitle="Eat the tasks. Stay light. Reach the goal." />

      <Chips
        options={["To-Do", "Notes"]}
        active={tab}
        onPick={setTab}
        label="Choose an app"
      />

      {/* conditional rendering: show one app at a time */}
      {tab === "To-Do" ? <TodoApp /> : <NotesApp />}

      <footer className="footer">Made with React + lots of snacks</footer>
    </div>
  );
}

export default App;