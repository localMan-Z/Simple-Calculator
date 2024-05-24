import { useCurrentState } from "./stateDIstributer";

function initial(parameter) {
  let {
    event,
    textDisplayed,
    operatorInUse,
    alternateComplexPieState,
    setAlternateComplexPieState,
    complexInitializedFirst,
    setComplexInitializedFirst,
    hybridState,
    setHybridState,
    hybridPieState,
    setHybridPieState,
    setTextDisplayed,
    setNumbers,
  } = parameter;

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

export function AppendNumberF() {
  let {
    event,
    textDisplayed,
    operatorInUse,
    alternateComplexPieState,
    setAlternateComplexPieState,
    complexInitializedFirst,
    setComplexInitializedFirst,
    hybridState,
    setHybridState,
    hybridPieState,
    setHybridPieState,
    setTextDisplayed,
    setNumbers,
  } = useCurrentState();

  const appendNumberF = () => {
    initial({
      event,
      textDisplayed,
      operatorInUse,
      alternateComplexPieState,
      setAlternateComplexPieState,
      complexInitializedFirst,
      setComplexInitializedFirst,
      hybridState,
      setHybridState,
      hybridPieState,
      setHybridPieState,
      setTextDisplayed,
      setNumbers,
    });
  };

  return { appendNumberF };
}
