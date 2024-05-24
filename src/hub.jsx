import { useCurrentState } from "./stateDIstributer";
import { appendNumber } from "./numbers.JSX";

export const ComponentLink = () => {
  const {
    textDisplayed,
    setTextDisplayed,
    operatorInUse,
    alternateComplexPieState,
    setAlternateComplexPieState,
    complexInitializedFirst,
    setComplexInitializedFirst,
    hybridState,
    setHybridState,
    hybridPieState,
    setHybridPieState,
    setNumbers,
  } = useCurrentState();

  const appendNumberF = (event) => {
    appendNumber({
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

  return {
    appendNumberF,
  };
};
