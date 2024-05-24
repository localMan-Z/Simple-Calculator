import { useCurrentState } from "./stateDIstributer";
import { SetNumbers } from "./set.JSX";

function initialAppend(parameter) {
  const { setNumbers } = SetNumbers();
  let {
    operatorInUse,
    setOperatorInUse,
    textDisplayed,
    setTextDisplayed,
    result,
    setResult,
    hybridState,
    setHybridState,
    operatorState,
    setOperatorState,
  } = parameter;

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

export function RenderOperators() {
  let {
    operatorInUse,
    setOperatorInUse,
    textDisplayed,
    setTextDisplayed,
    setNumbers,
    result,
    setResult,
    hybridState,
    setHybridState,
    operatorState,
    setOperatorState,
  } = useCurrentState();

  function appendOperator() {
    initialAppend({
      operatorInUse,
      setOperatorInUse,
      textDisplayed,
      setTextDisplayed,
      setNumbers,
      result,
      setResult,
      hybridState,
      setHybridState,
      operatorState,
      setOperatorState,
    });
  }

  return { appendOperator };
}
