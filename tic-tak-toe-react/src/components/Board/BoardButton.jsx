export default function BoardButton({ rowIdx, colIdx, symbol, click }) {
  // const key = [rowIdx, colIdx].join(",");
  // console.log("BoardButton.jsx", {
  //   key,
  //   rowIdx,
  //   colIdx,
  //   symbol,
  //   PlayerSymbol,
  //   click,
  // });
  function handleButtnClick() {
    console.log("click", click, { rowIdx, colIdx });
    click();
  }
  return (
    <li>
      <button onClick={handleButtnClick}>{symbol}</button>
    </li>
  );
}
