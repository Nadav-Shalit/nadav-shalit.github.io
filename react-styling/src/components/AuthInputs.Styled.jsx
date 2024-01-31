import { styled } from "styled-components";

const StyledDivControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;
const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(props) => (props.$invalid ? "#f87171" : "#6b7280")};
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  color: ${(props) => (props.$invalid ? "#ef4444" : "#374151")};
  background-color: ${({ $invalid }) =>
    $invalid
      ? "#fed2d2"
      : "#d1d5db"}; //Same as aboce just with destrcting of props values
  border: 1px solid ${(props) => (props.$invalid ? "#f73f3f" : "#transparent")};
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

function StyledButton({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 font-semibold uppercase rounded text-stone-900 bg-amber-400 hover:bg-amber-500"
      {...props}
    >
      {children}
    </button>
  );
}
const Styled = { StyledButton, StyledInput, StyledLabel, StyledDivControls };
export default Styled;
