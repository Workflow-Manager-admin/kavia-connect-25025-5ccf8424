import React, { useState } from "react";
import { getBackendHealth, getDbHealth } from "./api";

// PUBLIC_INTERFACE
export default function HealthStatus({ backendBaseUrl = "" }) {
  /**
   * HealthStatus: UI component to check/display backend and DB health endpoints.
   * - Calls GET / and GET /health/db when buttons are pressed.
   * - Shows current status and message, with color cues.
   */
  const [apiStatus, setApiStatus] = useState(null);
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // PUBLIC_INTERFACE
  async function checkApiHealth() {
    setLoading(true);
    const result = await getBackendHealth(backendBaseUrl);
    setApiStatus(result);
    setLoading(false);
  }

  // PUBLIC_INTERFACE
  async function checkDbHealth() {
    setLoading(true);
    const result = await getDbHealth(backendBaseUrl);
    setDbStatus(result);
    setLoading(false);
  }

  function renderStatus(statusObj) {
    if (!statusObj) return null;
    const ok = statusObj.status === "ok";
    return (
      <div style={{
        margin: "0.5em 0",
        padding: "1em",
        borderRadius: "8px",
        background: ok ? "#E6F4EA" : "#FFE6E6",
        color: ok ? "#03864F" : "#AD2A2E",
        fontWeight: 500,
        fontSize: "1.1em"
      }}>
        <b>Status: {statusObj.status}</b>
        <br />
        <span>{statusObj.message}</span>
      </div>
    );
  }

  return (
    <div style={{
      border: "1px solid var(--border-color)",
      padding: "2em",
      borderRadius: "12px",
      maxWidth: 400,
      margin: "1em auto"
    }}>
      <h2>Backend Health Checks</h2>
      <button
        onClick={checkApiHealth}
        style={{ margin: "0.25em", padding: "0.6em 1.5em" }}
        disabled={loading}
      >
        Check API
      </button>
      {renderStatus(apiStatus)}
      <button
        onClick={checkDbHealth}
        style={{ margin: "0.25em", padding: "0.6em 1.5em" }}
        disabled={loading}
      >
        Check Database
      </button>
      {renderStatus(dbStatus)}
      <p style={{fontSize: "0.9em", color:"var(--text-secondary)"}}>
        These endpoints verify backend and DB status. More features coming soon!
      </p>
    </div>
  );
}
