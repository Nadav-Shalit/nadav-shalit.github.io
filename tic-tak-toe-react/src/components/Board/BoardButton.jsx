export default function BoardButton({ rowIdx, colIdx, symbol, click }) {
  function handleButtnClick(e) {
    console.log("click", click, { rowIdx, colIdx });
    e.target.setAttribute("disabled", "disabled");
    click();
  }
  return (
    <li>
      <button onClick={handleButtnClick}>{symbol}</button>
    </li>
  );
}
