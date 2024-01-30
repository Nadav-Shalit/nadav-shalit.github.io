import { useState } from "react";
import Header from "./componenet/Header/Header";
import InvesmentForm from "./componenet/InvesmentForm/InvesmentForm";
import OutputTable from "./componenet/OutputTable/OutputTable";
export const INPUTS_CONFIG = {
  initialInvestment: {
    id: "txtInit",
    capation: "INITIAL INVESMENT",
    val: 1000,
  },
  annualInvestment: {
    id: "txtAnual",
    capation: "ANUAL INVESMENT",
    val: 1200,
  },
  expectedReturn: {
    id: "txtReturn",
    capation: "EXPETED RETURN",
    val: 6,
  },
  duration: { id: "txtDuration", capation: "DURATION", val: 10 },
};
function App() {
  const initObj = Object.keys(INPUTS_CONFIG).reduce((accumulator, value) => {
    const entry = INPUTS_CONFIG[value];
    return { ...accumulator, [value]: +entry.val };
  }, {});
  // console.log(initObj);
  const [params, setParams] = useState(initObj);

  let errMsg =
    params.initialInvestment && params.initialInvestment < 0
      ? "Initial Investment must be postive"
      : params.annualInvestment && params.annualInvestment < 0
      ? "Annual Investment must be postive"
      : params.expectedReturn && params.expectedReturn < 0
      ? "Expected Return must be postive"
      : params.duration <= 0
      ? "Duration must be greter then 0"
      : null;

  function handleChange(key, value) {
    console.log({ key, value });
    setParams((curParams) => {
      // const newParams = { ...curParams };
      const newParams = { ...curParams, [key]: value };
      // newParams[key] = value;
      return newParams;
    });
    console.log({ params });
  }

  // console.log({ res });
  return (
    <>
      <Header />
      <InvesmentForm params={params} onChange={handleChange} />
      {errMsg && <p className="center">{errMsg}</p>}
      {!errMsg && <OutputTable params={params}></OutputTable>}
    </>
  );
}

export default App;
