import { useRef } from "react";

export default function Player({ playerName, onSubmit }) {
  const inputPlayer = useRef();
  // const [playerName, setPalyerName] = useState(null);
  function hendleSubmit() {
    onSubmit(inputPlayer.current.value);
    inputPlayer.current.value = "";
  }
  return (
    <section id="player">
      <h2>Welcome {playerName ?? "Stranger"} </h2>
      <p>
        <input type="text" ref={inputPlayer} />
        <button onClick={hendleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
