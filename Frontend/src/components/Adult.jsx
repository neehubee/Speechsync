import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, StopCircle, Upload, ChevronLeft, ChevronRight } from 'lucide-react';

const Adult = () => {
  // For demo purposes, defaulting to 'beginner' level
  // In your actual app, you'll get this from useParams
  const { level } = useParams();
  const navigate = useNavigate();

  const validLevels = ['beginner', 'intermediate', 'advanced'];
  if (!validLevels.includes(level)) {
    navigate('/');
    return null;
  }

  const contentData = {
    beginner: [
      `Peter picked a purple pencil from the box. But before Peter could begin drawing, the big blackboard broke behind him. He blinked and bent down to pick up the broken pieces. "Please be careful," Patty politely pleaded. Peter paused, puffed his cheeks, and promised to be better.`,
      `Today, Tim tried talking to his teacher, but the ticking clock distracted him. "Today I tried…" he began nervously. The teacher tapped the table and told Tim to take a breath. Tim looked at the tiny turtle toy on her desk and smiled. "Thank you," he finally whispered.`
    ],
    intermediate: [
      `Brenda bravely brought blueberry bagels to the breakfast banquet. But when she began speaking about the bakery, her breath bounced back. "Bakery belongs to…" she muttered. The blinking lights above made her blink repeatedly. Brenda battled the bubbling panic and boldly began again.`,
      `The strange sounds from the street startled Steve. "Something strange is happening!" he shouted. His sister, Sandy, silently stared. Steve struggled to explain, stumbling over words like "strategy," "structure," and "strength." The stress of the situation stirred his stammer more.`
    ],
    advanced: [
      `Despite the devastating disaster downtown, Daniel decided to deliver a detailed description. "Due to the dangerous debris…" he declared, eyes darting around. His determination to demonstrate confidence was clear, but his deliberate diction delayed the delivery. Words like "devastation," "declaration," and "democracy" made him hesitate.`,
      `The philosophical professor presented a perplexing problem. "Persistence is pivotal," he proclaimed. The pupils were puzzled. Patricia, preparing her presentation, practiced pronunciation passionately. But words like "particularity," "precautionary," and "participation" pulled her into prolonged pauses, punctuated by pressure and pacing.`
    ]
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [recordings, setRecordings] = useState(Array(contentData[level].length).fill(null));
  const mediaRecorders = useRef([]);
  const audioChunks = useRef([]);

  const totalPages = contentData[level].length;
  const currentText = contentData[level][currentPage];

  const startRecording = async (index) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks.current[index] = [];

    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      audioChunks.current[index].push(event.data);
    };
    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current[index], { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const updatedRecordings = [...recordings];
      updatedRecordings[index] = audioUrl;
      setRecordings(updatedRecordings);
    };

    mediaRecorders.current[index] = recorder;
    recorder.start();
  };

  const stopRecording = (index) => {
    mediaRecorders.current[index]?.stop();
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="adult-container">
      <style>{`
        .adult-container {
        
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.4) 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 30%),
            linear-gradient(135deg, #ffecd2 0%,rgb(33, 66, 185) 100%);
          min-height: 100vh;
          width: 100vw;
          position: relative;
        }
        .adult-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255, 255, 255, 0.03) 30px, rgba(255, 255, 255, 0.03) 60px),
            repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(255, 255, 255, 0.02) 30px, rgba(255, 255, 255, 0.02) 60px);
          pointer-events: none;
        }
        .adult-heading {
          font-size: 2.5rem;
          text-align: center;
          color: #4a5568;
          margin-bottom: 2rem;
          text-shadow: 0 2px 4px rgba(255, 255, 255, 0.5);
          position: relative;
          z-index: 2;
        }
        .content-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .content-box {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 250, 252, 0.9) 100%);
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 8px rgba(0, 0, 0, 0.04);
          min-height: 300px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 1;
        }
        .content-box p {
          color: #374151;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        .recorder-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .audio-preview {
          margin-top: 1rem;
          width: 100%;
        }
        .navigation-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          position: relative;
          z-index: 2;
        }
        .nav-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .page-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4a5568;
          font-weight: 500;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
        }
        .page-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(74, 85, 104, 0.3);
          transition: background-color 0.2s;
        }
        .page-dot.active {
          background-color: #4a5568;
          box-shadow: 0 2px 4px rgba(74, 85, 104, 0.3);
        }
      `}</style>

      <h1 className="adult-heading">Adult - {level.charAt(0).toUpperCase() + level.slice(1)} Level</h1>

      <div className="content-section">
        <div className="content-box">
          <p>{currentText}</p>

          <div className="recorder-buttons">
            <button
              type="button"
              onClick={() => startRecording(currentPage)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full"
              title="Start Recording"
            >
              <Mic size={20} />
            </button>
            <button
              type="button"
              onClick={() => stopRecording(currentPage)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
              title="Stop Recording"
            >
              <StopCircle size={20} />
            </button>
            <button
              type="button"
              onClick={() => alert(`Audio submitted for text ${currentPage + 1}`)}
              disabled={!recordings[currentPage]}
              className={`p-2 rounded-full ${
                recordings[currentPage]
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
              title="Submit Audio"
            >
              <Upload size={20} />
            </button>
          </div>

          {recordings[currentPage] && (
            <audio className="audio-preview" controls src={recordings[currentPage]} />
          )}
        </div>

        <div className="navigation-section">
          <button
            type="button"
            onClick={previousPage}
            disabled={currentPage === 0}
            className="nav-button bg-gray-600 hover:bg-gray-700 text-white disabled:hover:bg-gray-600"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <div className="page-indicator">
            <span>Text {currentPage + 1} of {totalPages}</span>
            <div className="flex gap-1 ml-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <div
                  key={index}
                  className={`page-dot ${index === currentPage ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="nav-button bg-gray-600 hover:bg-gray-700 text-white disabled:hover:bg-gray-600"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adult;