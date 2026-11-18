import catImg from "../assets/cat.svg";

const tones = ["tone1", "tone2", "tone3"];

function Header({ title, subtitle, theme, onToggleTheme }) {
  // split the title into letters so each one gets its own shade
  const letters = title.split("");

  return (
    <header className="header">
      <div>
        <h1 className="bubble-title" aria-label={title}>
          {letters.map((letter, index) => (
            <span
              key={index}
              className={`letter ${tones[index % tones.length]}`}
              style={{ animationDelay: `${index * 0.12}s` }}
              aria-hidden="true"
            >
              {letter}
            </span>
          ))}
        </h1>
        <p className="subtitle">{subtitle}</p>
      </div>

      <div className="header-right">
        <img className="cat" src={catImg} alt="A chubby cat" />
        <button
          type="button"
          className="btn small"
          onClick={onToggleTheme}
          aria-pressed={theme === "dark"}
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;