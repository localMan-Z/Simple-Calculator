import { useCurrentState } from "./stateDIstributer";
import { Calculate } from "./calculate.JSX";

function initialSet(
  number,
  operatorState,
  initialized,
  complexOperatorState,
  complexPieState,
  parameter
) {
  const { calculate } = Calculate();
  let { alternateComplexPieState, hybridPieState, hybridState, operatorInUse } =
    parameter;
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
        : (operandPattern = /\u2212?\s*\d*\.?\d+\s+[\u002b\u2212\u00d7\u00f7]/);
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

export function SetNumbers() {
  let { alternateComplexPieState, hybridPieState, hybridState, operatorInUse } =
    useCurrentState();

  function setNumbers(
    number,
    operatorState,
    initialized,
    complexOperatorState,
    complexPieState
  ) {
    let parameterObject = {
      alternateComplexPieState,
      hybridPieState,
      hybridState,
      operatorInUse,
    };
    initialSet(
      number,
      operatorState,
      initialized,
      complexOperatorState,
      complexPieState,
      parameterObject
    );
  }
  return { setNumbers };
}
