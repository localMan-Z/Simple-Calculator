import { useCurrentState } from "./stateDIstributer";

function initial(
  operator,
  firstNumber,
  secondNumber,
  complexNumber,
  parameter
) {
  let {
    previousOperator,
    operatorInUse,
    setPreviousOperator,
    result,
    setResult,
  } = parameter;

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

export function Calculate() {
  let {
    previousOperator,
    operatorInUse,
    setPreviousOperator,
    result,
    setResult,
  } = useCurrentState();

  function calculate(operator, firstNumber, secondNumber, complexNumber) {
    let parameterObject = {
      previousOperator,
      operatorInUse,
      setPreviousOperator,
      result,
      setResult,
    };
    initial(
      operator,
      firstNumber,
      secondNumber,
      complexNumber,
      parameterObject
    );
  }
  return { calculate };
}
