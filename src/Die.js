import "./Die.css";

function Die({ locked, handleClick, val, idx }) {
  function handleDieClick() {
    handleClick(idx);
  }
  return (
    <button
      className={"Die"}
      style={{ backgroundColor: locked ? "grey" : "black" }}
      onClick={handleDieClick}
    >
      {val}
    </button>
  );
}

export default Die;
