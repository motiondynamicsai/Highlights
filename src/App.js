import './App.css';
import { useState } from 'react';

function App() {
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showHighlights, setShowHighlights] = useState(false);

  const handleButtonClick = () => {
    const randomSeconds = Math.floor(Math.random() * (7 - 3 + 1)) + 3; // Random number between 3 and 7
    setProgress(0);
    setShowHighlights(false);
    setShowProgressBar(true);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 100 / (randomSeconds * 10); // Increment progress in steps
      if (currentProgress >= 100) {
        clearInterval(interval);
        setShowProgressBar(false);
        setShowHighlights(true);
      }
      setProgress(currentProgress);
    }, 100); // Update progress every 100ms
  };

  const handleReset = () => {
    setShowHighlights(false);
    setShowProgressBar(false);
    setProgress(0);
  };

  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Video Analysis App</h1>
      <div style={{ margin: '20px 0' }}>
        <iframe
          title="Video Analysis"
          width="600"
          height="400"
          src="https://www.youtube.com/embed/upHZFNagiEY"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        ></iframe>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleButtonClick}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: 'white',
            cursor: 'pointer',
            marginRight: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Get Highlights
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#FF4D4D',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Reset
        </button>
      </div>
      {showProgressBar && (
        <div style={{ margin: '20px 0', width: '300px', margin: '20px auto' }}>
          <div style={{ height: '20px', background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: '#007BFF',
                transition: 'width 0.1s ease',
              }}
            ></div>
          </div>
        </div>
      )}
      {showHighlights && (
        <div>
          <h2>Highlights:</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns for a 2x2 grid
              gap: '20px', // Space between videos
              justifyContent: 'center',
              alignItems: 'center', // Center-align videos vertically
              margin: '0 auto', // Center-align the grid
              maxWidth: '600px', // Restrict grid width for a compact layout
            }}
          >
            {['/1125 (1).mp4', '/1125 (1)(1).mp4', '/1125 (1)(2).mp4', '/1125 (1)(3).mp4'].map((videoSrc, index) => (
              <video
                key={index}
                width="500" // Smaller video width
                height="auto" // Smaller video height
                controls
                preload="metadata"
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag, or the video could not be loaded.
              </video>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
