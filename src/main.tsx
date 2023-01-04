import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeToggle from "./components/themeToggle/ThemeToggle";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeToggle />
    <App />
  </React.StrictMode>
);
