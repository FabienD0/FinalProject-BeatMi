import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GeneralProvider } from "./components/context/GeneralContext";
import { PlayerProvider } from "./components/context/PlayerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GeneralProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </GeneralProvider>
  </React.StrictMode>
);
