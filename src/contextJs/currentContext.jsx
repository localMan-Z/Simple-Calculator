import { useContext } from "react";
import globalContext from "./globalContext";

const useCurrentState = () => useContext(globalContext);
export default useCurrentState;
