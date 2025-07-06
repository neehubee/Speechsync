import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Mic, MicOff, RotateCcw, Star, Trophy, Crown, Home, Volume2 } from 'lucide-react';
import './kids.css';

const KidsPracticePage = () => {
  const { age: selectedAge, level: selectedLevel } = useParams();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const practiceContent = {
    kids: {
      beginner: [
        { id: 1, text: "Cat 🐱", emoji: "🐱", difficulty: "Easy", tip: "Say it slowly: C-A-T" },
        { id: 2, text: "Dog 🐕", emoji: "🐕", difficulty: "Easy", tip: "Take your time: D-O-G" },
        { id: 3, text: "Sun ☀️", emoji: "☀️", difficulty: "Easy", tip: "Sunny day: S-U-N" },
        { id: 4, text: "Moon 🌙", emoji: "🌙", difficulty: "Easy", tip: "Night time: M-O-O-N" },
        { id: 5, text: "Tree 🌳", emoji: "🌳", difficulty: "Easy", tip: "Big and tall: T-R-E-E" }
      ],
      intermediate: [
        { id: 1, text: "Mississippi 🏞️", emoji: "🏞️", difficulty: "Medium", tip: "Break it down: Miss-iss-ipp-i" },
        { id: 2, text: "Confusion 😵", emoji: "😵", difficulty: "Medium", tip: "Say slowly: Con-fu-sion" },
        { id: 3, text: "Butterfly 🦋", emoji: "🦋", difficulty: "Medium", tip: "Pretty wings: But-ter-fly" },
        { id: 4, text: "Rainbow 🌈", emoji: "🌈", difficulty: "Medium", tip: "Colorful: Rain-bow" }
      ],
      advanced: [
        { id: 1, text: "She sells seashells by the seashore 🐚", emoji: "🐚", difficulty: "Hard", tip: "Take breaks between words" },
        { id: 2, text: "Today is a sunny day and I'm happy 😊", emoji: "😊", difficulty: "Hard", tip: "Smile while you speak!" },
        { id: 3, text: "Peter picked a peck of pickled peppers 🌶️", emoji: "🌶️", difficulty: "Hard", tip: "Don't rush the P sounds" }
      ]
    }
  };

  const getCurrentContent = () => {
    return practiceContent[selectedAge]?.[selectedLevel] || [];
  };

  const currentContent = getCurrentContent();
  const currentCard = currentContent[currentCardIndex];

  const levelConfig = {
    beginner: { icon: Star, color: 'level-beginner', name: 'Beginner Star', emoji: '⭐' },
    intermediate: { icon: Trophy, color: 'level-intermediate', name: 'Intermediate Trophy', emoji: '🏆' },
    advanced: { icon: Crown, color: 'level-advanced', name: 'Advanced Crown', emoji: '👑' }
  };

  const currentLevelConfig = levelConfig[selectedLevel];

  const goToNextCard = () => {
    if (currentCardIndex < currentContent.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      resetCard();
    }
  };

  const goToPrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      resetCard();
    }
  };

  const resetCard = () => {
    setHasRecorded(false);
    setShowFeedback(false);
    setScore(0);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
      setTimeout(() => {
        setShowFeedback(true);
        setScore(Math.floor(Math.random() * 30) + 70);
      }, 1500);
    } else {
      setIsRecording(true);
      setShowFeedback(false);
    }
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentCard.text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  if (!currentCard) {
    return (
      <div className="oops-container">
        <div className="oops-content">
          <h1 className="oops-title">Oops! 😅</h1>
          <p className="oops-text">No content found for this selection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <button className="home-button">
              <Home size={20} />
              <span>Home</span>
            </button>
            <div className="level-info">
              <div className={`level-icon ${currentLevelConfig.color}`}>{currentLevelConfig.emoji}</div>
              <span className="level-name">{currentLevelConfig.name}</span>
            </div>
          </div>
          <div className="header-right">
            <div className="progress-status">
              <span>
                Card {currentCardIndex + 1} of {currentContent.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-area">
        <div className="progress-section">
          <div className="progress-text">
            <span>Your Progress 📈</span>
            <span>{Math.round(((currentCardIndex + 1) / currentContent.length) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentCardIndex + 1) / currentContent.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="emoji-section">
          <div className="emoji-icon">{currentCard.emoji}</div>
          <div className="difficulty-label">{currentCard.difficulty} Level</div>
        </div>

        <div className="text-display">
          <h2>{currentCard.text}</h2>
          <button onClick={speakText} className="listen-button">
            <Volume2 size={24} />
            <span>Listen 👂</span>
          </button>
        </div>

        <div className="tip-box">
          <div className="tip-icon">💡</div>
          <div>
            <h3>Helpful Tip:</h3>
            <p>{currentCard.tip}</p>
          </div>
        </div>

        <div className="recording-section">
          <h3 className="recording-status">Now it's your turn! 🎤</h3>
          <button
            onClick={toggleRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 transform hover:scale-110 ${
              isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isRecording ? <MicOff size={32} className="text-white" /> : <Mic size={32} className="text-white" />}
          </button>
          <p className="recording-status">{isRecording ? 'Recording... 🎙️' : 'Click to Start Recording'}</p>
          {isRecording && <p className="recording-hint">Read the text above clearly and slowly! 📖</p>}
        </div>

        {showFeedback && (
          <div className="feedback-card">
            <div className="score-emoji">{score >= 90 ? '🌟' : score >= 80 ? '🎉' : score >= 70 ? '👍' : '💪'}</div>
            <h3 className="feedback-title">Great job! Your score: {score}%</h3>
            <p className="feedback-text">
              {score >= 90 ? 'Amazing! You\'re a speech superstar! 🌟' :
               score >= 80 ? 'Excellent work! Keep it up! 🎉' :
               score >= 70 ? 'Good job! You\'re improving! 👍' :
               'Keep practicing! You can do it! 💪'}
            </p>
            <button onClick={resetCard} className="retry-button">
              <RotateCcw size={16} />
              <span>Try Again</span>
            </button>
          </div>
        )}

        <div className="navigation">
          <button onClick={goToPrevCard} disabled={currentCardIndex === 0} className="nav-button">
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>

          <div className="dot-indicators">
            {currentContent.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentCardIndex ? 'dot-active' : ''}`}
              ></div>
            ))}
          </div>

          <button onClick={goToNextCard} disabled={currentCardIndex === currentContent.length - 1} className="nav-button">
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="fun-elements right">
        <div className="fun-icon">🎈</div>
      </div>
      <div className="fun-elements left">
        <div className="fun-icon">⭐</div>
      </div>
    </div>
  );
};

export default KidsPracticePage;
