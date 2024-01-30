export default function TextInput({ id, capation, onInput, param }) {
  function hendleInput(e) {
    onInput(param.key, +e.target.value);
  }

  return (
    <p>
      <label htmlFor={id}>{capation}</label>
      <input
        type="number"
        id={id}
        value={param.val}
        className="form-group"
        onInput={hendleInput}
        required
      />
    </p>
  );
}
