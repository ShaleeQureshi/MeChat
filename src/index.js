import React from "react";
import ReactDOM from "react-dom";
import App from "./scripts/App";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
