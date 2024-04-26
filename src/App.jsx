/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import "./App.css";

function App() {
  let [textDisplayed, setTextDisplayed] = useState("");
  let [operatorInUse, setOperatorInUse] = useState("");
  let [previousOperator, setPreviousOperator] = useState("");
  let [result, setResult] = useState("");
  let [operatorState, setOperatorState] = useState(false);
  let [hybridState, setHybridState] = useState(false);
  let [complexInitializedFirst, setComplexInitializedFirst] = useState(false);
  let [alternateComplexPieState, setAlternateComplexPieState] = useState(false);
  let [hybridPieState, setHybridPieState] = useState(false);

  function appendNumber(event) {
    let complexOperatorState = false;
    let complexPieState = false;
    let number = event.target.getAttribute("data-number");
    let operatorWithPie = textDisplayed.substring(textDisplayed.length - 2);
    let indexOfOperator = textDisplayed.indexOf(operatorInUse);
    let secondNumber;
    if (indexOfOperator > 0) {
      secondNumber = textDisplayed.substring(indexOfOperator + 1);
    }
    if (textDisplayed.startsWith("\u03c0") && operatorWithPie == "") {
      return;
    } else if (textDisplayed.startsWith("\u03c0") && operatorWithPie != "") {
      if (textDisplayed[textDisplayed.length - 2] == "\u03c0") {
        return;
      }
    } else if (textDisplayed != "" && operatorInUse != "" && number == "pie") {
      complexPieState = true;
      if (textDisplayed.endsWith("\u03c0")) {
        return;
      } else {
        number = `${textDisplayed}\u03c0`;
      }
    }
    if (
      textDisplayed.startsWith("\u2212") &&
      textDisplayed.includes("\u03c0") &&
      number
    ) {
      if (textDisplayed.endsWith("\u03c0")) {
        return;
      } else if (operatorWithPie != "") {
        number;
        alternateComplexPieState = true;
        setAlternateComplexPieState(alternateComplexPieState);
      } else {
        return;
      }
    }
    if (textDisplayed.includes(number) && number == "." && secondNumber == "") {
      number = "";
    } else if (secondNumber) {
      if (secondNumber.includes(number) && number == ".") {
        number = "";
      }
      if (secondNumber.includes("\u03c0")) {
        return;
      }
    }
    if (number == "pie") {
      number = "\u03c0 ";
    }
    if (
      textDisplayed.startsWith("\u221a") ||
      textDisplayed.startsWith("\u221b") ||
      textDisplayed.startsWith("\u221c") ||
      textDisplayed.startsWith("Tan") ||
      textDisplayed.startsWith("Cos") ||
      textDisplayed.startsWith("Sin")
    ) {
      complexOperatorState = true;
      complexInitializedFirst = true;
      setComplexInitializedFirst(complexInitializedFirst);
    }
    if (
      textDisplayed.includes("\u221a") ||
      textDisplayed.includes("\u221b") ||
      textDisplayed.includes("\u221c") ||
      textDisplayed.includes("Tan") ||
      textDisplayed.includes("Sin") ||
      textDisplayed.includes("Cos")
    ) {
      if (!textDisplayed.endsWith("\u03c0")) {
        complexInitializedFirst
          ? ((hybridState = false), setHybridState(hybridState))
          : (hybridState = true),
          setHybridState(hybridState);
        if (
          textDisplayed.startsWith("\u2212") &&
          textDisplayed.includes("\u03c0") &&
          hybridState == true
        ) {
          hybridPieState = true;
          setHybridPieState(hybridPieState);
        }
        if (isNaN(textDisplayed.substring(textDisplayed.length - 1))) {
          textDisplayed = `${textDisplayed} `;
        } else {
          textDisplayed;
        }
      } else {
        return;
      }
    }
    number == "\u03c0" || complexPieState
      ? (textDisplayed = number)
      : (textDisplayed += number);
    setTextDisplayed(textDisplayed);
    setNumbers(
      textDisplayed,
      true,
      true,
      complexOperatorState,
      complexPieState,
      hybridState
    );
  }

  function appendOperator(event) {
    let complexPieState = false;
    let operatorInitializedFirst = false;
    let complexOperatorState = false;
    let operatorClass = event.target.className;
    operatorInUse = event.target.textContent;
    setOperatorInUse(operatorInUse);
    if (operatorInUse == "AC") {
      textDisplayed = textDisplayed.substring(0, textDisplayed.length - 1);
      setTextDisplayed(textDisplayed);
      setNumbers(textDisplayed, true, true, complexOperatorState, false);
      setOperatorInUse(operatorInUse);
      return;
    }
    if (result != "") {
      if (hybridState) {
        hybridState = false;
        setHybridState(hybridState);
      }
      if (String(result).includes(".")) {
        result = parseFloat(String(result)).toFixed(2);
      }
      if (String(result).includes("-")) {
        result = String(result).replace("-", "\u2212 ");
      }

      operatorClass == "complex"
        ? ((textDisplayed = `${operatorInUse} ${result}`),
          (operatorState = true),
          (complexOperatorState = true))
        : ((textDisplayed = result), (operatorState = false));
      result = "";
      setTextDisplayed(textDisplayed);
      setResult(result);
    }
    if (textDisplayed == "") {
      if (operatorInUse == "\u2212") {
        operatorInitializedFirst = true;
        operatorClass == "complex"
          ? (complexOperatorState = true)
          : (complexOperatorState = false);

        textDisplayed = `${operatorInUse} ${textDisplayed}`;
        setTextDisplayed(textDisplayed);
        operatorState = true;
      }
    }
    if (operatorState) {
      let operatorPattern = /(\u221a|\u221b|\u221c|Tan|Sin|Cos)/;
      if (operatorPattern.test(operatorInUse)) {
        operatorState = false;
        operatorClass = "";
      }
    }
    if (!operatorState) {
      if (complexOperatorState) {
        textDisplayed;
      } else {
        if (operatorClass == "complex") {
          complexOperatorState = true;
          textDisplayed = `${operatorInUse} ${textDisplayed}`;
        } else {
          if (textDisplayed != "") {
            textDisplayed = `${textDisplayed} ${operatorInUse} `;
          }
        }
      }
      operatorState = true;
      setOperatorState(operatorState);
      setTextDisplayed(textDisplayed);
      setOperatorState(operatorState);
    }
    setNumbers(
      textDisplayed,
      operatorState,
      operatorInitializedFirst,
      complexOperatorState,
      complexPieState,
      hybridState
    );
  }

  function calculate(operator, firstNumber, secondNumber, complexNumber) {
    if (typeof secondNumber == "number") {
      secondNumber = String(secondNumber);
    }

    if (firstNumber && secondNumber) {
      if (firstNumber.includes("\u2212")) {
        firstNumber = firstNumber.replace(/\u2212\s*/, "-");
      }
      if (secondNumber.includes("\u2212")) {
        console.log("fuck");
        secondNumber = secondNumber.replace(/\u2212\s*/, "-");
      }
    }
    if (firstNumber != undefined || secondNumber != undefined) {
      if (firstNumber.includes("\u03c0")) {
        firstNumber.includes("-")
          ? (firstNumber = `-${Math.PI}`)
          : (firstNumber = Math.PI);
      }
      if (secondNumber.includes("\u03c0")) {
        secondNumber = Math.PI;
      }
    }
    if (complexNumber != undefined) {
      if (complexNumber.includes("\u03c0")) {
        complexNumber.trim();
        complexNumber = Math.PI;
      }
    }
    if (secondNumber != "" && complexNumber != "") {
      if (operator != "AC") {
        previousOperator = operatorInUse;
        setPreviousOperator(previousOperator);
      } else {
        operator = previousOperator;
      }
      switch (operator) {
        case "\u002b":
          result = parseFloat(firstNumber) + parseFloat(secondNumber);
          break;
        case "\u2212":
          result = firstNumber - secondNumber;
          break;
        case "\u00d7":
          result = firstNumber * secondNumber;
          break;
        case "\u00f7":
          result = firstNumber / secondNumber;
          break;
        case "\u221a":
          result = Math.sqrt(complexNumber);
          break;
        case "\u221b":
          result = Math.pow(complexNumber, 1 / 3);
          break;
        case "\u221c":
          result = Math.pow(complexNumber, 1 / 4);
          break;
        case "Sin":
          result = Math.sin(complexNumber);
          break;
        case "Cos":
          result = Math.cos(complexNumber);
          break;
        case "Tan":
          result = Math.tan(complexNumber);
          break;
      }
      if (secondNumber == "secondNumber") {
        return result;
      } else {
        setResult(result);
      }
    }
  }

  function setNumbers(
    number,
    operatorState,
    initialized,
    complexOperatorState,
    complexPieState
  ) {
    if ((number !== "" && operatorState) || initialized) {
      let operandPattern,
        text,
        input,
        firstNumber,
        secondNumber,
        complexNumber,
        sign,
        lengthA,
        lengthB,
        hybridSign,
        hybridNumber,
        specialNumber;
      if (complexPieState) {
        lengthA = 3;
        lengthB = 2;
      }
      if (!complexOperatorState) {
        alternateComplexPieState ? (lengthA = 0) : (lengthA = 2);
        lengthB = 1;
      }
      if (hybridPieState) {
        lengthA = 0;
      }
      if (number.startsWith("\u03c0")) {
        !hybridState
          ? (operandPattern = /\u03c0\s+/)
          : (operandPattern =
              /\u03c0\s*[\u002b\u2212\u00d7\u00f7]\s*(\u221a|\u221b|\u221c|Tan|Sin|Cos)/);
      } else if (hybridState) {
        hybridPieState
          ? (operandPattern =
              /\u2212\s*\u03c0\s*[\u002b\u2212\u00d7\u00f7]\s*(\u221a|\u221b|\u221c|Tan|Sin|Cos)/)
          : (operandPattern =
              /\u2212?\s*\d*\.?\d+\s+[\u002b\u2212\u00d7\u00f7]\s*(\u221a|\u221b|\u221c|Tan|Sin|Cos)/);
      } else if (!complexOperatorState) {
        alternateComplexPieState
          ? (operandPattern = /\u2212\s*\u03c0\s*/)
          : (operandPattern =
              /\u2212?\s*\d*\.?\d+\s+[\u002b\u2212\u00d7\u00f7]/);
      } else if (complexOperatorState) {
        if (number.includes("\u03c0")) {
          operandPattern = /(\u221a|\u221b|\u221c|Sin|Tan|Cos)\s*\u03c0/;
        } else {
          operandPattern =
            /(\u221a|\u221b|\u221c|Sin|Tan|Cos)\s*(\d+(\.\d+)?|\d+)/;
        }
      }

      if (number && operatorInUse != "") {
        !complexOperatorState
          ? ((text = number.match(operandPattern)[0]),
            (input = number.match(operandPattern)["input"]).trim(),
            hybridState
              ? ((hybridSign = number.match(operandPattern)[1]),
                (lengthA = hybridSign.length + 2))
              : null,
            (firstNumber = text.substring(0, text.length - lengthA).trim()),
            (secondNumber = input.substring(text.length + lengthB).trim()),
            hybridState ? (hybridNumber = secondNumber) : secondNumber)
          : ((text = number.match(operandPattern)[0]),
            (sign = number.match(operandPattern)[1]),
            (complexNumber = text.substring(sign.length)));
        if (hybridState) {
          operatorInUse = text
            .substring(0, text.length - lengthA)
            .substring(text.substring(0, text.length - lengthA).length - 1);
          firstNumber = text
            .substring(0, text.length - lengthA)
            .substring(0, text.substring(0, text.length - lengthA).length - 1);

          specialNumber = calculate(
            hybridSign,
            firstNumber,
            "secondNumber",
            hybridNumber
          );
        } else {
          specialNumber = secondNumber;
        }
        calculate(operatorInUse, firstNumber, specialNumber, complexNumber);
      }
    }
  }

  return (
    <>
      <div id="Calculator">
        <div id="display">
          <div id="upperText">{textDisplayed}</div>
          <div id="lowerText">{result}</div>
        </div>
        <div id="operators">
          <div id="numberOperators">
            <button className="number" data-number="7" onClick={appendNumber}>
              7
            </button>
            <button className="number" data-number="8" onClick={appendNumber}>
              8
            </button>
            <button className="number" data-number="9" onClick={appendNumber}>
              9
            </button>
            <button className="number" data-number="4" onClick={appendNumber}>
              4
            </button>
            <button className="number" data-number="5" onClick={appendNumber}>
              5
            </button>
            <button className="number" data-number="6" onClick={appendNumber}>
              6
            </button>
            <button className="number" data-number="1" onClick={appendNumber}>
              1
            </button>
            <button className="number" data-number="2" onClick={appendNumber}>
              2
            </button>
            <button className="number" data-number="3" onClick={appendNumber}>
              3
            </button>
            <button className="number" data-number="0" onClick={appendNumber}>
              0
            </button>
            <button className="number" data-number="." onClick={appendNumber}>
              .
            </button>
            <button className="number" data-number="pie" onClick={appendNumber}>
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
