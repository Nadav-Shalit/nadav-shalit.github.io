import TextInput from "./TextInput.jsx";
import { INPUTS_CONFIG } from "../../App.jsx";

export default function InvesmentForm({ onChange, params }) {
  function onInputForm(key, val) {
    onChange(key, val);
  }
  return (
    <section id="user-input">
      <div className="input-group">
        {Object.keys(INPUTS_CONFIG).map((inputEntry) => {
          const elm = INPUTS_CONFIG[inputEntry];

          return (
            <TextInput
              key={inputEntry}
              param={{ key: inputEntry, val: params[inputEntry] }}
              id={elm.id}
              capation={elm.capation}
              onInput={onInputForm}
            />
          );
        })}
      </div>
    </section>
  );
}
