export default function BoardButton({ symbol, click, winner }) {
  const isdisabled = symbol || winner ? "disabled" : undefined;
  function handleButtnClick(e) {
    click();
  }
  return (
    <li>
      <button disabled={isdisabled} onClick={handleButtnClick}>
        {symbol}
      </button>
    </li>
  );
}
