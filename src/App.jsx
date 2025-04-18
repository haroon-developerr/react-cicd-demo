import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const storedStart = localStorage.getItem('startTime');
    const storedRunning = localStorage.getItem('isRunning');

    if (storedRunning === 'true' && storedStart) {
      const elapsed = Math.floor((Date.now() - parseInt(storedStart)) / 1000);
      setTime(elapsed);
      setIsRunning(true);
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Save state changes to localStorage
  useEffect(() => {
    if (isRunning) {
      const alreadySet = localStorage.getItem('startTime');
      if (!alreadySet) {
        localStorage.setItem('startTime', Date.now().toString());
      }
      localStorage.setItem('isRunning', 'true');
    } else {
      localStorage.setItem('isRunning', 'false');
    }
  }, [isRunning]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days > 0 ? `${days} day${days > 1 ? 's' : ''} ` : ''}${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : ''
      }${minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} ` : ''}${secs} second${secs !== 1 ? 's' : ''}`;
  };

  const handleStart = () => {
    if (!isRunning) {
      localStorage.setItem('startTime', Date.now().toString());
      setTime(0);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.removeItem('startTime');
    localStorage.setItem('isRunning', 'false');
  };

  return (
    <>
      <h1>CI/CD using Github Actions with haroon</h1>
      <h2>For beginners v2</h2>
      <h2>With 2 projects</h2>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{formatTime(time)}</p>
        <button
          onClick={handleStart}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Start Timer
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Reset Timer
        </button>
      </div>
    </>
  );
}

export default App;
