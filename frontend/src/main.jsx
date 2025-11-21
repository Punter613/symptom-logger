import React from "react";
import ReactDOM from "react-dom/client";

// SUPER SIMPLE TEST APP
function TestApp() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a", // dark blue
        color: "white",
        fontFamily: "system-ui, sans-serif",
        gap: "1rem",
      }}
    >
      <h1>✅ React is running</h1>
      <p>If you can see this, the problem was in App.jsx or routing, not Render.</p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
    </div>
  );
}

const rootEl = document.getElementById("root");

console.log("Bootstrapping React…", rootEl);

if (!rootEl) {
  console.error("❌ No #root element found in DOM");
} else {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <TestApp />
    </React.StrictMode>
  );
}
