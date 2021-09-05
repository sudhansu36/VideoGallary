import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { Provider } from "react-redux";
import LoadingState from "./context/toploadingbar/LoadingState";
ReactDOM.render(
  <Provider store={store}>
    <LoadingState>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LoadingState>
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
