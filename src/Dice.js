import Die from "./Die";
import "./Dice.css";

function Dice({ dice, handleClick, locked }) {
  return (
    <div className="Dice">
      {dice.map((d, idx) => (
        <Die
          handleClick={handleClick}
          val={d}
          locked={locked[idx]}
          idx={idx}
          key={idx}
        />
      ))}
    </div>
  );
}

export default Dice;
