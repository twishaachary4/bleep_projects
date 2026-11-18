import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Chips from "./components/Chips.jsx";
import TodoApp from "./components/TodoApp.jsx";
import NotesApp from "./components/NotesApp.jsx";

function App() {
  // which app is showing right now
  const [tab, setTab] = useState("To-Do");

  // theme: use the saved choice, or the device setting the first time
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("muchi-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // tell the page which theme is on and remember it
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("muchi-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="app">
      <Header
        title="Planner"
        subtitle="Eat the tasks. Stay light. Reach the goal."
        theme={theme}
        onToggleTheme={toggleTheme}
      />

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