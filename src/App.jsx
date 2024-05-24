/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCurrentState } from "./stateDIstributer";
import { AppendNumberF } from "./numbers.JSX";
import { RenderOperators } from "./operators.JSX";
import "./App.css";

function App() {
  let { textDisplayed, result } = useCurrentState();
  const { appendNumberF } = AppendNumberF();
  const { appendOperator } = RenderOperators();

  return (
    <>
      <div id="Calculator">
        <div id="display">
          <div id="upperText">{textDisplayed}</div>
          <div id="lowerText">{result}</div>
        </div>
        <div id="operators">
          <div id="numberOperators">
            <button className="number" data-number="7" onClick={appendNumberF}>
              7
            </button>
            <button className="number" data-number="8" onClick={appendNumberF}>
              8
            </button>
            <button className="number" data-number="9" onClick={appendNumberF}>
              9
            </button>
            <button className="number" data-number="4" onClick={appendNumberF}>
              4
            </button>
            <button className="number" data-number="5" onClick={appendNumberF}>
              5
            </button>
            <button className="number" data-number="6" onClick={appendNumberF}>
              6
            </button>
            <button className="number" data-number="1" onClick={appendNumberF}>
              1
            </button>
            <button className="number" data-number="2" onClick={appendNumberF}>
              2
            </button>
            <button className="number" data-number="3" onClick={appendNumberF}>
              3
            </button>
            <button className="number" data-number="0" onClick={appendNumberF}>
              0
            </button>
            <button className="number" data-number="." onClick={appendNumberF}>
              .
            </button>
            <button
              className="number"
              data-number="pie"
              onClick={appendNumberF}
            >
              {"\u03c0"}
            </button>
          </div>
          <div id="functionalOperators">
            <button
              className="basics"
              data-value="clear"
              onClick={appendOperator}
            >
              AC
            </button>
            <button
              className="basics"
              data-value="equals"
              onClick={appendOperator}
            >
              {"\u003d"}
            </button>
            <button
              className="basics"
              data-value="plus"
              onClick={appendOperator}
            >
              {"\u002b"}
            </button>
            <button
              className="basics"
              data-value="minus"
              onClick={appendOperator}
            >
              {"\u2212"}
            </button>
            <button
              className="basics"
              data-value="multiplication"
              onClick={appendOperator}
            >
              {"\u00d7"}
            </button>
            <button
              className="basics"
              data-value="division"
              onClick={appendOperator}
            >
              {"\u00f7"}
            </button>
            <button
              className="complex"
              data-value="squareRoot"
              onClick={appendOperator}
            >
              {"\u221A"}
            </button>
            <button
              className="complex"
              data-value="cubeRoot"
              onClick={appendOperator}
            >
              {"\u221b"}
            </button>
            <button
              className="complex"
              data-value="fourthRoot"
              onClick={appendOperator}
            >
              {"\u221c"}
            </button>
            <button
              className="complex"
              data-value="sine"
              onClick={appendOperator}
            >
              Sin
            </button>
            <button
              className="complex"
              data-value="cosine"
              onClick={appendOperator}
            >
              Cos
            </button>
            <button
              className="complex"
              data-value="tan"
              onClick={appendOperator}
            >
              Tan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
