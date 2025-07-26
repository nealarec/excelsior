import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Chatbot from "./Chatbot.tsx";
import "./main.css";

createRoot(document.getElementById("excel-bot")!).render(
  <StrictMode>
    <App />
    <Chatbot />
  </StrictMode>
);
