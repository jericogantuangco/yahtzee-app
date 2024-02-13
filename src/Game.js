import { useState } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

function Game() {
  const [dice, setDice] = useState(Array.from({ length: NUM_DICE }));
  const [locked, setLocked] = useState(Array(NUM_DICE).fill(false));
  const [rollsLeft, setRollsLeft] = useState(NUM_ROLLS);
  const [rolling, setRolling] = useState(false);
  const [scores, setScores] = useState({
    ones: undefined,
    twos: undefined,
    threes: undefined,
    fours: undefined,
    fives: undefined,
    sixes: undefined,
    threeOfKind: undefined,
    fourOfKind: undefined,
    fullHouse: undefined,
    smallStraight: undefined,
    largeStraight: undefined,
    yahtzee: undefined,
    chance: undefined,
  });

  useEffect(() => animateRoll(), []);
  const roll = useCallback(() => {
    setDice(dice.map((d, i) => (locked[i] ? d : Math.ceil(Math.random() * 6))));
    setLocked(rollsLeft > 1 ? locked : Array(NUM_DICE).fill(true));
    setRollsLeft(rollsLeft - 1);
  }, [dice, rollsLeft, locked, setDice, setLocked, setRollsLeft]);

  function animateRoll() {
    setRolling(true);
  }

  useEffect(() => {
    let timeoutId;
    if (rolling) {
      timeoutId = setTimeout(() => {
        roll();
        setRolling(false);
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [rolling, roll]);

  function toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if (rollsLeft > 0 && !rolling) {
    setLocked([
      ...locked.slice(0, idx),
      !locked[idx],
      ...locked.slice(idx + 1),
    ]);
    }
  }

  function doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    setScores({ ...scores, [rulename]: ruleFn(dice) });
    setRollsLeft(NUM_ROLLS);
    setLocked(Array(NUM_DICE).fill(false));
    animateRoll();
  }
  }

  return (
    <div className="Game">
      <header className="Game-header">
        <h1 className="App-title">Yahtzee!</h1>

        <section className="Game-dice-section">
          <Dice
            dice={dice}
            locked={locked}
            handleClick={toggleLocked}
            disabled={rollsLeft === 0}
            rolling={rolling}
          />
          <div className="Game-button-wrapper">
            <button
              className="Game-reroll"
              disabled={locked.every((x) => x) || rollsLeft === 0 || rolling}
              onClick={animateRoll}
            >
              {rollsLeft} Rerolls Left
            </button>
          </div>
        </section>
      </header>
      <ScoreTable doScore={doScore} scores={scores} />
    </div>
  );
}

export default Game;
