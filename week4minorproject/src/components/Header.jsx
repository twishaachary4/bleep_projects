import catImg from "../assets/cat.svg";

const colors = ["pink", "yellow", "mint", "sky", "lav"];

function Header({ title, subtitle }) {
  // split the title into letters so each one gets its own colour
  const letters = title.split("");

  return (
    <header className="header">
      <div>
        <p className="jp">むちねこ</p>
        <h1 className="bubble-title" aria-label={title}>
          {letters.map((letter, index) => (
            <span
              key={index}
              className={`letter ${colors[index % colors.length]}`}
              style={{ animationDelay: `${index * 0.12}s` }}
              aria-hidden="true"
            >
              {letter}
            </span>
          ))}
        </h1>
        <p className="subtitle">{subtitle}</p>
      </div>
      <img className="cat" src={catImg} alt="A chubby cat" />
    </header>
  );
}

export default Header;