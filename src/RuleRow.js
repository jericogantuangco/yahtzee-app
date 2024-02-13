import "./RuleRow.css";

function RuleRow({ name, score, doScore, description }) {
  const disabled = score !== undefined;

  return (
    <tr
      className={`RuleRow RuleRow-${disabled ? "disabled" : "active"}`}
      onClick={disabled ? null : doScore}
    >
      <td className="RuleRow-name">{name}</td>
      <td className="RuleRow-score">{disabled ? score : description}</td>
    </tr>
  );
}

export default RuleRow;
