import Styled from "./AuthInputs.Styled.jsx";

export default function CustomInputs({ lable, invalid, ...props }) {
  return (
    <p>
      <Styled.StyledLabel $invalid={invalid}>{lable}</Styled.StyledLabel>
      <Styled.StyledInput $invalid={invalid} {...props} />
    </p>
  );
}
