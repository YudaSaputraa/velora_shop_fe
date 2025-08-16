import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import data_store from "./api/data_store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={data_store}>
      <App />
    </Provider>
  </StrictMode>
);
