import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import FinanceDashboard from "./components/FinanceDashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<FinanceDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
