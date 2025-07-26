import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Chatbot from "./Chatbot.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Chatbot />
  </StrictMode>
);
