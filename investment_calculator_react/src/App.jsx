import { useState } from "react";
import Header from "./componenet/Header/Header";
import InvesmentForm from "./componenet/InvesmentForm/InvesmentForm";
import OutputTable from "./componenet/OutputTable/OutputTable";
import calculateInvestmentResults from "./util/investment.js";

function App() {
  const [params, setParams] = useState({
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 0,
    duration: 0,
  });

  function handleChange(key, value) {
    console.log({ key, value });
    setParams((curParams) => {
      const newParams = { ...curParams };
      newParams[key] = value;
      return newParams;
    });
    console.log({ params });
  }

  const res = calculateInvestmentResults(params);
  // console.log({ res });
  return (
    <>
      <Header />
      <InvesmentForm onChange={handleChange} />
      <OutputTable res={res}></OutputTable>
    </>
  );
}

export default App;
