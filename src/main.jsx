import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/ui/Toast.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./style.css";
import "./i18n/config";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);