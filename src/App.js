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
      { src: '/Highlights/TennisHL1.mp4', description: 'Tennis Highlight 1: Amazing come back from 2 breaks down to win the first game (115s)' },
      { src: '/Highlights/TennisHL2.mp4', description: 'Tennis Highlight 2: Unbelievable pass from Federer to break (22s)' },
      { src: '/Highlights/TennisHL3.mp4', description: 'Tennis Highlight 3: Incredible power from Djokovic (10s)' },
      { src: '/Highlights/TennisHL4.mp4', description: 'Tennis Highlight 4: Incredible atheletisism from to win the ralley (12s)'},
      { src: '/Highlights/TennisHL5.mp4', description: 'Tennis Highlight 5: Djokovic applying pressure to take set 2 (29s)' },
      { src: '/Highlights/TennisHL6.mp4', description: 'Tennis Highlight 6: Djokovic winning point (23s)' }
    ],
    football: [
      { src: '/Highlights/FootballHL1.mp4', description: 'Football Highlight 1: Amazing 1st goal of the match (7s)' },
      { src: '/Highlights/FootballHL2.mp4', description: 'Football Highlight 2: Great skill and strike from Messi to equalize (22s)' },
      { src: '/Highlights/FootballHL3.mp4', description: 'Football Highlight 3: Magnificent save (4s)' },
      { src: '/Highlights/FootballHL4.mp4', description: 'Football Highlight 4: Incredible left foot strike outside the box (9s)' },
      { src: '/Highlights/FootballHL5.mp4', description: 'Football Highlight 5: Extremely poor challenge leads to a red card (9s)' },
      { src: '/Highlights/FootballHL6.mp4', description: 'Football Highlight 6: Amazing ball control scoring off a cross (6s)' },
      { src: '/Highlights/FootballHL7.mp4', description: 'Football Highlight 7: Incredible set up for a last minute winner (20s)' }
        ],
    Snow: [
      { src: '/Highlights/snowHL1.mp4', description: 'Snow Highlight 1: Back flip into a fall' },
      { src: '/Highlights/snowHL2.mp4', description: 'Snow Highlight 2: Outrageos trick off a kicker' },
      { src: '/Highlights/snowHL3.mp4', description: 'Snow Highlight 3: Massive 360' },
      { src: '/Highlights/snowHL4.mp4', description: 'Snow Highlight 4: Huge wipe out ' },
      { src: '/Highlights/snowHL5.mp4', description: 'Snow Highlight 5: Flat spin fall to finish ' },
      { src: '/Highlights/snowHL6.mp4', description: 'Snow Highlight 6: Unbelievable 360 into a backlip' },
      { src: '/Highlights/snowHL7.mp4', description: 'Snow Highlight 7: Biggest backflip of the day!' }
    ]
  };

  // Define YouTube video URLs for each sport
  const youtubeVideos = {
    squash: "https://www.youtube.com/embed/upHZFNagiEY", // Default squash video
    tennis: "https://www.youtube.com/embed/i29zruv8mKc?si=qDqf7JGDgS8U7NNB",
    football: "https://www.youtube.com/embed/3j_daNHio4o?si=pAnSb0ATTtvM33jb",
    Snow: "https://www.youtube.com/embed/uMW5bW8mmnY?si=TrebKhGPytIFeOnR"
  };

  // Define video descriptions for each sport
  const videoDescriptions = {
    squash: "Coll v Farag | GillenMarkets Canary Wharf 2023 - 34 minutes",
    tennis: "Novak Djokovic v Roger Federer Australian Open 2020 Semifinal (1:55:28)",
    football: "Real Madrid vs Barça (1:43:17)",
    Snow: "Freeride World Tour 2024 (4:01:21)"
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
          <option value="Snow">SnowSports</option>
        </select>
      </div>

      {/* Text above the main embedded video */}
      <div className="video-description-container">
        <p className="video-description">
          {videoDescriptions[selectedSport]}
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
