import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./services/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <App />
  </Provider>
);
