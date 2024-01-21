import Row from "./Row";
import { formatter } from "./../../util/investment.js";

export default function OutputTable({ res }) {
  return (
    <table id="result">
      <thead>
        <tr>
          <th>year</th>
          <th>interest</th>
          <th>valueEndOfYear</th>
          <th>annualInvestment</th>
        </tr>
      </thead>
      <tbody>
        {res.map((y) => (
          <tr key={y.year}>
            <Row>{y.year}</Row>
            <Row>{formatter.format(y.interest)}</Row>
            <Row>{formatter.format(y.valueEndOfYear)}</Row>
            <Row>{formatter.format(y.annualInvestment)}</Row>
          </tr>
        ))}
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
