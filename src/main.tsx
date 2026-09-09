import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AuthProvider } from "@/hooks/useAuth";
import { ProgressProvider } from "@/hooks/useProgress";
import { SessionVisibilityProvider } from "@/hooks/useSessionVisibility";

import "./styles/global.css";
import "./styles/components.css";
import "./styles/pages.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <SessionVisibilityProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </SessionVisibilityProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
