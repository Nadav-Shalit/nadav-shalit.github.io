import { useState } from "react";
import Header from "./componenet/Header/Header";
import InvesmentForm from "./componenet/InvesmentForm/InvesmentForm";
import OutputTable from "./componenet/OutputTable/OutputTable";

function App() {
  const [params, setParams] = useState({
    initialInvestment: 1000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

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
      <InvesmentForm onChange={handleChange} />
      <OutputTable params={params}></OutputTable>
    </>
  );
}

export default App;
