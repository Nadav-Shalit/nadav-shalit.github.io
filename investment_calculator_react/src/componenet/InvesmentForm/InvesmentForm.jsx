import TextInput from "./TextInput.jsx";
export default function InvesmentForm({ onChange }) {
  const INPUTS_ARR = [
    { id: "txtInit", capation: "INITIAL INVESMENT", key: "initialInvestment" },
    { id: "txtAnual", capation: "ANUAL INVESMENT", key: "annualInvestment" },
    { id: "txtReturn", capation: "EXPETED RETURN", key: "expectedReturn" },
    { id: "txtDuration", capation: "DURATION", key: "duration" },
  ];
  function onInputForm(key, val) {
    console.log({ key, val });
    onChange(key, val);
  }
  return (
    <section id="user-input">
      <div className="input-group">
        {INPUTS_ARR.map((txt) => (
          <TextInput
            key={txt.key}
            paramKey={txt.key}
            id={txt.id}
            capation={txt.capation}
            onInput={onInputForm}
          />
        ))}
      </div>
    </section>
  );
}
