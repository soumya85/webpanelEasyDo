import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeGlobalLanguage } from "./lib/globalLanguage";

// Ensure fonts are ready before initial render
const renderApp = async () => {
  // Initialize global language system first
  initializeGlobalLanguage();

  // Re-initialize on navigation to ensure language state is maintained
  const handleRouteChange = () => {
    // Small delay to ensure navigation is complete
    setTimeout(() => {
      initializeGlobalLanguage();
    }, 100);
  };

  // Listen for route changes
  window.addEventListener("popstate", handleRouteChange);

  // Also listen for pushstate/replacestate (for programmatic navigation)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(history, args);
    handleRouteChange();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(history, args);
    handleRouteChange();
  };

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
