import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Baby, Users, Star, Trophy, Crown } from 'lucide-react';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [ageIndex, setAgeIndex] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const ageGroups = [
    {
      id: 'kids',
      title: 'Kids',
      subtitle: 'Ages 5-10',
      icon: Baby,
      colorClass: 'gradient-pink-purple',
      description: 'Fun and interactive learning for young learners'
    },
    {
      id: 'adults',
      title: 'Adults',
      subtitle: 'Ages 10+',
      icon: Users,
      colorClass: 'gradient-blue-indigo',
      description: 'Comprehensive training for mature learners'
    }
  ];

  const levels = [
    {
      id: 'beginner',
      title: 'Beginner',
      subtitle: 'Just Starting',
      icon: Star,
      colorClass: 'gradient-green-teal',
      description: 'Perfect for those new to speech training'
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      subtitle: 'Some Experience',
      icon: Trophy,
      colorClass: 'gradient-yellow-orange',
      description: 'For those with basic speech control skills'
    },
    {
      id: 'advanced',
      title: 'Advanced',
      subtitle: 'Experienced',
      icon: Crown,
      colorClass: 'gradient-purple-pink',
      description: 'Advanced techniques and fine-tuning'
    }
  ];

  const handleAgeNavigation = (direction) => {
    if (direction === 'next' && ageIndex < ageGroups.length - 1) {
      setAgeIndex(ageIndex + 1);
    } else if (direction === 'prev' && ageIndex > 0) {
      setAgeIndex(ageIndex - 1);
    }
  };

  const handleLevelNavigation = (direction) => {
    if (direction === 'next' && levelIndex < levels.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (direction === 'prev' && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
  };

  const handleSelection = () => {
  if (selectedAge === 'adults' && selectedLevel) {
    navigate(`/Adult/${selectedLevel}`);
  }
};


  const renderIcon = (IconComponent, size) => {
    return React.createElement(IconComponent, { size });
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        {/* Header */}
        <div className="welcome-header">
          <h1 className="welcome-title">WELCOME</h1>
          <p className="welcome-subtitle">
            Let's start your journey to confident speaking. Choose your age group and skill level to get personalized training.
          </p>
        </div>

        {/* Selection Rows */}
        <div className="selection-rows">
          {/* Age Group Selection Row */}
          <div className="selection-row">
            <h2 className="selection-row-title">Select Your Age Group</h2>
            <div className="selection-controls">
              {/* Previous Button */}
              <button
                onClick={() => handleAgeNavigation('prev')}
                className="nav-button"
                disabled={ageIndex === 0}
              >
                <ChevronLeft size={24} />
              </button>

              {/* Age Group Card */}
              <div 
                className={`selection-card ${
                  selectedAge === ageGroups[ageIndex].id ? 'selected' : ''
                }`}
                onClick={() => setSelectedAge(ageGroups[ageIndex].id)}
              >
                <div className={`selection-card-background ${ageGroups[ageIndex].colorClass}`} />
                <div className="selection-card-content">
                  <div className="selection-card-icon">
                    {renderIcon(ageGroups[ageIndex].icon, 48)}
                  </div>
                  <h3 className="selection-card-title">{ageGroups[ageIndex].title}</h3>
                  <p className="selection-card-subtitle">{ageGroups[ageIndex].subtitle}</p>
                  <p className="selection-card-description">{ageGroups[ageIndex].description}</p>
                </div>
                {selectedAge === ageGroups[ageIndex].id && (
                  <div className="selection-indicator">
                    <div className="selection-indicator-dot"></div>
                  </div>
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handleAgeNavigation('next')}
                className="nav-button"
                disabled={ageIndex === ageGroups.length - 1}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Dots Indicator */}
            <div className="dots-indicator">
              {ageGroups.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index === ageIndex ? 'active' : 'inactive'}`}
                />
              ))}
            </div>
          </div>

          {/* Level Selection Row */}
          <div className="selection-row">
            <h2 className="selection-row-title">Choose Your Level</h2>
            <div className="selection-controls">
              {/* Previous Button */}
              <button
                onClick={() => handleLevelNavigation('prev')}
                className="nav-button"
                disabled={levelIndex === 0}
              >
                <ChevronLeft size={24} />
              </button>

              {/* Level Card */}
              <div 
                className={`selection-card ${
                  selectedLevel === levels[levelIndex].id ? 'selected' : ''
                }`}
                onClick={() => setSelectedLevel(levels[levelIndex].id)}
              >
                <div className={`selection-card-background ${levels[levelIndex].colorClass}`} />
                <div className="selection-card-content">
                  <div className="selection-card-icon">
                    {renderIcon(levels[levelIndex].icon, 48)}
                  </div>
                  <h3 className="selection-card-title">{levels[levelIndex].title}</h3>
                  <p className="selection-card-subtitle">{levels[levelIndex].subtitle}</p>
                  <p className="selection-card-description">{levels[levelIndex].description}</p>
                </div>
                {selectedLevel === levels[levelIndex].id && (
                  <div className="selection-indicator">
                    <div className="selection-indicator-dot"></div>
                  </div>
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handleLevelNavigation('next')}
                className="nav-button"
                disabled={levelIndex === levels.length - 1}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Dots Indicator */}
            <div className="dots-indicator">
              {levels.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index === levelIndex ? 'active' : 'inactive'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="continue-section">
          <button
            onClick={handleSelection}
            className={`continue-button ${
              selectedAge && selectedLevel ? 'enabled' : 'disabled'
            }`}
            disabled={!selectedAge || !selectedLevel}
          >
            Start Your Journey
          </button>
          {(!selectedAge || !selectedLevel) && (
            <p className="continue-message">
              Please select both age group and level to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;