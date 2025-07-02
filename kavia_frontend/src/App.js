import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HealthStatus from './HealthStatus';
import { registerUser, loginUser } from './api';

// Register Form Component
function RegisterForm({ onRegister, loading, error, success }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const disabled = loading;

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ username, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid var(--border-color)",
        borderRadius: 10,
        padding: 24,
        marginBottom: 18,
        maxWidth: 320,
        marginLeft: "auto",
        marginRight: "auto",
        background: "var(--bg-secondary)"
      }}
      aria-label="Register form"
    >
      <h2 style={{ marginTop: 0 }}>Register</h2>
      <input
        aria-label="Register username"
        placeholder="Username"
        value={username}
        autoComplete="username"
        disabled={disabled}
        required
        onChange={(e) => setUsername(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "0.6em 0.9em",
          marginBottom: 10,
          borderRadius: 7,
          border: "1px solid var(--border-color)",
          fontSize: 16
        }}
      />
      <input
        aria-label="Register password"
        placeholder="Password"
        type="password"
        autoComplete="new-password"
        value={password}
        required
        disabled={disabled}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "0.6em 0.9em",
          marginBottom: 10,
          borderRadius: 7,
          border: "1px solid var(--border-color)",
          fontSize: 16
        }}
      />
      <button
        type="submit"
        className="theme-toggle"
        disabled={disabled}
        style={{
          width: "100%",
          marginBottom: 5,
          marginTop: 2,
          backgroundColor: "var(--button-bg)",
          color: "var(--button-text)"
        }}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      {error && (
        <div style={{ color: "#AD2A2E", fontSize: "0.97em", marginTop: 4 }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ color: "#03864F", fontSize: "0.97em", marginTop: 4 }}>
          Registration successful! Please log in.
        </div>
      )}
    </form>
  );
}

// Login Form Component
function LoginForm({ onLogin, loading, error, success }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const disabled = loading;

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid var(--border-color)",
        borderRadius: 10,
        padding: 24,
        marginBottom: 18,
        maxWidth: 320,
        marginLeft: "auto",
        marginRight: "auto",
        background: "var(--bg-secondary)"
      }}
      aria-label="Login form"
    >
      <h2 style={{ marginTop: 0 }}>Login</h2>
      <input
        aria-label="Login username"
        placeholder="Username"
        value={username}
        autoComplete="username"
        required
        disabled={disabled}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "0.6em 0.9em",
          marginBottom: 10,
          borderRadius: 7,
          border: "1px solid var(--border-color)",
          fontSize: 16
        }}
      />
      <input
        aria-label="Login password"
        placeholder="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        required
        disabled={disabled}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "0.6em 0.9em",
          marginBottom: 10,
          borderRadius: 7,
          border: "1px solid var(--border-color)",
          fontSize: 16
        }}
      />
      <button
        type="submit"
        className="theme-toggle"
        disabled={disabled}
        style={{
          width: "100%",
          marginBottom: 5,
          marginTop: 2,
          backgroundColor: "var(--button-bg)",
          color: "var(--button-text)"
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && (
        <div style={{ color: "#AD2A2E", fontSize: "0.97em", marginTop: 4 }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ color: "#03864F", fontSize: "0.97em", marginTop: 4 }}>
          Logged in successfully!
        </div>
      )}
    </form>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [page, setPage] = useState('login'); // 'login' | 'register'
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken") || '');
  const [authUser, setAuthUser] = useState(() => localStorage.getItem("authUser") || '');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Effect to load token from localStorage
  useEffect(() => {
    if (authToken && authUser) {
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("authUser", authUser);
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    }
  }, [authToken, authUser]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const handleRegister = async ({ username, password }) => {
    setRegisterLoading(true);
    setRegisterError('');
    setRegisterSuccess(false);
    try {
      const res = await registerUser({ username, password });
      if (res.status === "ok" || res.success) {
        setRegisterSuccess(true);
      } else {
        setRegisterError(res.message || "Registration failed");
      }
    } catch (err) {
      setRegisterError(err.message || "Registration failed");
    } finally {
      setRegisterLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleLogin = async ({ username, password }) => {
    setLoginLoading(true);
    setLoginError('');
    setLoginSuccess(false);
    try {
      const res = await loginUser({ username, password });
      if ((res.status === "ok" || res.success) && res.token) {
        setAuthToken(res.token);
        setAuthUser(username);
        setLoginSuccess(true);
      } else {
        setLoginError(res.message || "Login failed");
      }
    } catch (err) {
      setLoginError(err.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleLogout = () => {
    setAuthToken('');
    setAuthUser('');
    setLoginSuccess(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>KAVIA Meet Frontend</h1>

        {!authToken ? (
          <div style={{ width: "100%", maxWidth: 360, margin: "0 auto" }}>
            {page === "login" ? (
              <>
                <LoginForm
                  onLogin={handleLogin}
                  loading={loginLoading}
                  error={loginError}
                  success={loginSuccess}
                />
                <div style={{ textAlign: "center", marginBottom: 8 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setPage("register");
                      setRegisterError('');
                      setRegisterSuccess(false);
                      setLoginError('');
                      setLoginSuccess(false);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      fontSize: "0.97em",
                      textDecoration: "underline"
                    }}
                  >
                    Don't have an account? Register
                  </button>
                </div>
              </>
            ) : (
              <>
                <RegisterForm
                  onRegister={handleRegister}
                  loading={registerLoading}
                  error={registerError}
                  success={registerSuccess}
                />
                <div style={{ textAlign: "center", marginBottom: 8 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setPage("login");
                      setLoginError('');
                      setLoginSuccess(false);
                      setRegisterError('');
                      setRegisterSuccess(false);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      fontSize: "0.97em",
                      textDecoration: "underline"
                    }}
                  >
                    Already have an account? Login
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div style={{
            border: "1px solid var(--border-color)",
            borderRadius: 10,
            background: "var(--bg-secondary)",
            maxWidth: 340,
            margin: "0 auto",
            padding: 22,
            marginBottom: 16,
          }}>
            <p>
              Logged in as <span style={{ fontWeight: 600 }}>{authUser}</span>
            </p>
            <button
              className="theme-toggle"
              style={{
                width: "100%",
                backgroundColor: "#e6474d",
                color: "#fff",
                marginTop: 7,
                marginBottom: 3,
                fontWeight: 600,
              }}
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        )}

        <HealthStatus />
        <p>
          <em>
            Future features (user, meetings, chat, translation, etc.) will appear here as API routes are added to the backend!
          </em>
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
      </header>
    </div>
  );
}

export default App;
