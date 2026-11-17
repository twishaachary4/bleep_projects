// Reusable pill buttons - used for the tabs, the to-do filter and the note categories
function Chips({ options, active, onPick, label }) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`chip ${active === option ? "chip-on" : ""}`}
          aria-pressed={active === option}
          onClick={() => onPick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Chips;