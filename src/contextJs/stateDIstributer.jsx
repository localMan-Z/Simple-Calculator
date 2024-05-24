import { useState } from "react";
import PropTypes from "prop-types";
import globalContext from "./globalContext";

export const StateDistributer = ({ children }) => {
  let [textDisplayed, setTextDisplayed] = useState("");
  let [operatorInUse, setOperatorInUse] = useState("");
  let [previousOperator, setPreviousOperator] = useState("");
  let [result, setResult] = useState("");
  let [operatorState, setOperatorState] = useState(false);
  let [hybridState, setHybridState] = useState(false);
  let [complexInitializedFirst, setComplexInitializedFirst] = useState(false);
  let [alternateComplexPieState, setAlternateComplexPieState] = useState(false);
  let [hybridPieState, setHybridPieState] = useState(false);

  let valueObject = {
    textDisplayed,
    setTextDisplayed,
    operatorInUse,
    setOperatorInUse,
    previousOperator,
    setPreviousOperator,
    result,
    setResult,
    operatorState,
    setOperatorState,
    hybridState,
    setHybridState,
    complexInitializedFirst,
    setComplexInitializedFirst,
    alternateComplexPieState,
    setAlternateComplexPieState,
    hybridPieState,
    setHybridPieState,
  };
  return (
    <globalContext.Provider value={valueObject}>
      {children}
    </globalContext.Provider>
  );
};
StateDistributer.propTypes = {
  children: PropTypes.node.isRequired,
};
