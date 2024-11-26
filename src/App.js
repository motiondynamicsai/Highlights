import './App.css';
import { useState } from 'react';

function App() {
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showHighlights, setShowHighlights] = useState(false);
  const [selectedSport, setSelectedSport] = useState('squash');

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

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
    handleReset(); // Reset the state when changing the sport
  };

  // Define video sources and descriptions for each sport
  const videoData = {
    squash: [
      { src: '/Highlights/vid1.mp4', description: 'Highlight 1: Huge rally between world no1 and 2 (26s)' },
      { src: '/Highlights/vid2.mp4', description: 'Highlight 2: Outrageous skill level from both players (47s)' },
      { src: '/Highlights/vid3.mp4', description: 'Highlight 3: Stunning comeback in the second game (70s)' },
      { src: '/Highlights/vid4.mp4', description: 'Highlight 4: Unbelievable dive to win the rally (27s)' }
    ],
    tennis: [
      { src: '/Highlights/TennisHL1.mp4', description: 'Tennis Highlight 1' },
      { src: '/Highlights/TennisHL2.mp4', description: 'Tennis Highlight 2' },
      { src: '/Highlights/TennisHL3.mp4', description: 'Tennis Highlight 3' },
      { src: '/Highlights/TennisHL4.mp4', description: 'Tennis Highlight 4' },
      { src: '/Highlights/TennisHL5.mp4', description: 'Tennis Highlight 5' },
      { src: '/Highlights/TennisHL6.mp4', description: 'Tennis Highlight 6' }
    ],
    football: [
      { src: '/Highlights/FootballHL1.mp4', description: 'Football Highlight 1' },
      { src: '/Highlights/FootballHL2.mp4', description: 'Football Highlight 2' },
      { src: '/Highlights/FootballHL3.mp4', description: 'Football Highlight 3' },
      { src: '/Highlights/FootballHL4.mp4', description: 'Football Highlight 4' },
      { src: '/Highlights/FootballHL5.mp4', description: 'Football Highlight 5' },
      { src: '/Highlights/FootballHL6.mp4', description: 'Football Highlight 6' },
      { src: '/Highlights/FootballHL7.mp4', description: 'Football Highlight 7' }
        ],
    padel: [
      { src: '/Highlights/padel1.mp4', description: 'Padel Highlight 1' },
      { src: '/Highlights/padel2.mp4', description: 'Padel Highlight 2' }
    ]
  };

  // Define YouTube video URLs for each sport
  const youtubeVideos = {
    squash: "https://www.youtube.com/embed/upHZFNagiEY", // Default squash video
    tennis: "https://www.youtube.com/embed/i29zruv8mKc?si=qDqf7JGDgS8U7NNB",
    football: "https://www.youtube.com/embed/3j_daNHio4o?si=pAnSb0ATTtvM33jb",
    padel: "https://www.youtube.com/embed/OTmnKkEMnDM"
  };

  return (
    <div className="App">
      <div className="highlightAI-container">
        <p className="highlightAI">
          Highlight<span className="ai-color">AI</span>
        </p>
        <select onChange={handleSportChange} value={selectedSport}>
          <option value="squash">Squash</option>
          <option value="tennis">Tennis</option>
          <option value="football">Football</option>
          <option value="padel">Padel</option>
        </select>
      </div>

      {/* Text above the main embedded video */}
      <div className="video-description-container">
        <p className="video-description">
         Coll v Farag | GillenMarkets Canary Wharf 2023 - 34 minutes
        </p>
      </div>

      <div className="video-container">
        <iframe
          title="Video Analysis"
          src={youtubeVideos[selectedSport]}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="button-container">
        <button onClick={handleButtonClick} className="btn primary-btn">
          Generate Highlights
        </button>
        <button onClick={handleReset} className="btn reset-btn">
          Reset
        </button>
      </div>

      {showProgressBar && (
        <div className="progress-bar">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
      {showHighlights && (
        <div className="highlights">
          <h2>{videoData[selectedSport].length} Highlights found:</h2>
          <div className="video-grid">
            {videoData[selectedSport].map((video, index) => (
              <div key={index} className="video-item">
                <video controls preload="metadata">
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag, or the video could not be loaded.
                </video>
                <p className="video-caption">{video.description}</p> {/* Display description */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
