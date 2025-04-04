import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CreateGame from "./componnents/craateGame.jsx";
import Games from "./componnents/dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/create-game" element={<CreateGame />} />
      <Route path="/" element={< Games/>} />
    </Routes>
    </BrowserRouter>
  </StrictMode>
);
