import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeGlobalLanguage } from "./lib/globalLanguage";

// Simple app initialization without complex font loading
const renderApp = () => {
  // Initialize global language system
  initializeGlobalLanguage();

  // Re-initialize on navigation to ensure language state is maintained
  const handleRouteChange = () => {
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

  // Add multilingual class immediately for proper font rendering
  document.body.classList.add("text-multilingual");

  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

// Start the app immediately
renderApp();
