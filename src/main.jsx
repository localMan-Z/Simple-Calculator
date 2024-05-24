import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { StateDistributer } from "./contextJs/stateDIstributer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StateDistributer>
    <App />
  </StateDistributer>
);
