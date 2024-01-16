export default function BoardButton({ symbol, togglePlayer, winner }) {
  const isdisabled = symbol || winner ? "disabled" : undefined;
  return (
    <li>
      <button disabled={isdisabled} onClick={togglePlayer}>
        {symbol}
      </button>
    </li>
  );
}
