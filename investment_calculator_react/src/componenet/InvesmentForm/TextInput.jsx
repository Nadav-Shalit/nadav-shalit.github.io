export default function TextInput({ id, capation, onInput, paramKey }) {
  function hendleInput(e) {
    console.log({ paramKey, val: e.target.value });
    onInput(paramKey, +e.target.value);
  }

  return (
    <p>
      <label htmlFor={id}>{capation}</label>
      <input
        type="number"
        id={id}
        className="form-group"
        onInput={hendleInput}
        required
      />
    </p>
  );
}
