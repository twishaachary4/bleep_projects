// The "weight gauge" from the design, now it shows how many tasks are done
function ProgressBar({ percent }) {
  return (
    <div className="gauge-wrap">
      <span className="gauge-label">Progress {percent}%</span>
      <div
        className="gauge"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className="gauge-fill" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

export default ProgressBar;