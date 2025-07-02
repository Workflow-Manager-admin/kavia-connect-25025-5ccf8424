 // API utility for KAVIA Meet backend endpoints

// PUBLIC_INTERFACE
export async function getBackendHealth(baseUrl = "") {
  /** Fetches the backend '/' route to check API health.
   *  Returns: { status: <"ok">, message: <string> }
   */
  try {
    const res = await fetch(`${baseUrl}/`);
    if (!res.ok) throw new Error("Failed to fetch backend health");
    return await res.json();
  } catch (err) {
    return { status: "error", message: err.message };
  }
}

// PUBLIC_INTERFACE
export async function getDbHealth(baseUrl = "") {
  /** Fetches the '/health/db' route to check database health.
   *  Returns: { status: <"ok"|"error">, message: <string> }
   */
  try {
    const res = await fetch(`${baseUrl}/health/db`);
    if (!res.ok) throw new Error("Failed to fetch DB health");
    return await res.json();
  } catch (err) {
    return { status: "error", message: err.message };
  }
}
