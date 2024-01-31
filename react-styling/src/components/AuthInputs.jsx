import { useState } from "react";
import "./authInputs.css";
import Styled from "./AuthInputs.Styled.jsx";
import CustomInputs from "./CustomInput.jsx";
import CustomInputsTw from "./CustomInputTW.jsx";
export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <Styled.StyledDivControls>
        <CustomInputs
          lable="Email"
          invalid={emailNotValid}
          type="email"
          onChange={(event) => handleInputChange("email", event.target.value)}
        ></CustomInputs>

        <CustomInputsTw
          lable="Password"
          invalid={passwordNotValid}
          type="password"
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
        ></CustomInputsTw>
      </Styled.StyledDivControls>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <Styled.StyledButton onClick={handleLogin}>Sign In</Styled.StyledButton>
      </div>
    </div>
  );
}
