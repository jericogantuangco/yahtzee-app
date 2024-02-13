import "./Die.css";

function Die({
  locked,
  handleClick,
  val = 6,
  idx,
  numberWords = ["one", "two", "three", "four", "five", "six"],
  disabled,
  rolling,
}) {
  function handleDieClick() {
    handleClick(idx);
  }

  let classes = `Die fas fa-dice-${numberWords[val - 1]} fa-5x `;
  if (locked) classes += "Die-locked ";
  if (rolling) classes += "Die-rolling";
  return <i className={classes} onClick={handleDieClick} disabled={disabled} />;
}

export default Die;
