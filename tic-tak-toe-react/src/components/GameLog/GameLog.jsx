export default function GameLog({ logData }) {
  console.log({ logData });
  return (
    <ul id="log">
      {logData.map((etry, idx) => (
        <li
          key={etry.time.getTime()}
          className={idx === 0 ? "highlighted" : undefined}
        >
          <span>{etry.time.toLocaleTimeString()}</span>
          {/* <span style={{ padding: "5px" }}>{etry.player}</span> */}
          <span style={{ padding: "5px" }}>{etry.curPlayer} played</span>
          <span style={{ color: "yellow" }}>
            {Object.values(etry.symbolIdx).join(",")}
          </span>
        </li>
      ))}
    </ul>
  );
}
