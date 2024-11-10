import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../src/ChainReaction/App.jsx";
import GIF from "./giphy.gif"

function RootComponent() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StrictMode>
      {isSplashVisible ? (
        <div className="splash-screen">
          <img
            src={GIF}// Replace with your GIF path
            alt="Loading..."
            className="splash-gif"
          />
        </div>
      ) : (
        <App />
      )}
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<RootComponent />);
