 // API utility for KAVIA Meet backend endpoints

// Utility to get the API base URL, always from env at startup
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  window.REACT_APP_API_BASE_URL ||
  ""; // fallback

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns central backend base URL (from .env or window). */
  return API_BASE_URL.replace(/\/$/, ""); // remove trailing slash
}

// PUBLIC_INTERFACE
export async function getBackendHealth(baseUrl) {
  /**
   * Fetches the backend '/' route to check API health.
   * Returns: { status: <"ok">, message: <string> }
   */
  const url = (baseUrl || getApiBaseUrl()) + "/";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch backend health");
    return await res.json();
  } catch (err) {
    return { status: "error", message: err.message };
  }
}

// PUBLIC_INTERFACE
export async function getDbHealth(baseUrl) {
  /**
   * Fetches the '/health/db' route to check database health.
   * Returns: { status: <"ok"|"error">, message: <string> }
   */
  const url = (baseUrl || getApiBaseUrl()) + "/health/db";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch DB health");
    return await res.json();
  } catch (err) {
    return { status: "error", message: err.message };
  }
}
