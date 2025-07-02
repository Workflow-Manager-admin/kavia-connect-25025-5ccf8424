import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HealthStatus from './HealthStatus';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
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
