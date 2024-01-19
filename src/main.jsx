// main.jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";

// Using ReactDOM.createRoot to render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
