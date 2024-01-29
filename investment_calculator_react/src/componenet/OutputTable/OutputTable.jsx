import Row from "./Row";
import { formatter } from "./../../util/investment.js";
import calculateInvestmentResults from "../../util/investment.js";

export default function OutputTable({ params }) {
  const res = calculateInvestmentResults(params);
  const initailInvesment =
    res[0].valueEndOfYear - res[0].interest - res[0].annualInvestment;
  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Intrest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {res.map((y) => {
          const totalIntrest =
            y.valueEndOfYear -
            y.year * params.annualInvestment -
            initailInvesment;
          const totalAmountInvested = y.valueEndOfYear - totalIntrest;
          return (
            <tr key={y.year}>
              <Row>{y.year}</Row>
              <Row>{formatter.format(y.valueEndOfYear)}</Row>
              <Row>{formatter.format(y.interest)}</Row>
              <Row>{formatter.format(totalIntrest)}</Row>
              <Row>{formatter.format(totalAmountInvested)}</Row>
            </tr>
          );
        })}
        {/* {
    "year": 1,
    "interest": 2250,
    "valueEndOfYear": 18150,
    "annualInvestment": 900
    } */}
      </tbody>
    </table>
  );
}
