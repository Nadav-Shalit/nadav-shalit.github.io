export default function GameLog({ logData }) {
  return (
    <ul id="log">
      {logData.map((etry, idx) => (
        <li
          key={etry.time.getTime()}
          className={idx === 0 ? "highlighted" : undefined}
        >
          <span style={{ color: "red" }}>{etry.time.toLocaleTimeString()}</span>
          {/* <span style={{ padding: "5px" }}>{etry.player}</span> */}
          <span style={{ padding: "5px" }}>{etry.curPlayer}</span>
          <span style={{ color: "yellow" }}>
            {Object.values(etry.symbolIdx).join(",")}
          </span>
        </li>
      ))}
    </ul>
  );
}
