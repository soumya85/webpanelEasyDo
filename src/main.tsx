import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Ensure fonts are ready before initial render
const renderApp = async () => {
  // Wait for fonts to be ready if supported
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
      console.log("✅ Fonts ready for initial render");
    } catch (error) {
      console.warn("⚠️ Font readiness check failed:", error);
    }
  }

  // Add initial font loading class to prevent FOUT
  document.body.classList.add("text-multilingual");

  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

// Start the app
renderApp();
