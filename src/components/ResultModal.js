import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrendingUp, FiTarget, FiAlertCircle, FiClock, FiRefreshCw, FiAward } from 'react-icons/fi';
import './ResultModal.scss';

const ResultModal = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  const {
    wpm = 0,
    grossWPM = 0,
    netWPM = 0,
    accuracy = 0,
    rawAccuracy = 0,
    correctChars = 0,
    mistakes = 0,
    totalChars = 0,
    backspaceCount = 0,
    totalTime = 0,
    consistency = 0
  } = results;

  const getGrade = (score) => {
    if (score >= 90) return { grade: 'A+', color: '#10b981', message: 'Excellent! Outstanding performance!', icon: '🏆' };
    if (score >= 80) return { grade: 'A', color: '#34d399', message: 'Great job! Very impressive!', icon: '⭐' };
    if (score >= 70) return { grade: 'B', color: '#f59e0b', message: 'Good work! Keep practicing!', icon: '👍' };
    if (score >= 60) return { grade: 'C', color: '#f97316', message: 'Not bad! Room for improvement.', icon: '📈' };
    return { grade: 'D', color: '#ef4444', message: 'Keep practicing! You will get better.', icon: '🎯' };
  };

  const gradeInfo = getGrade(accuracy);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="result-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="result-modal"
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>
              <FiX />
            </button>

            <div className="modal-header">
              <div className="grade-badge" style={{ backgroundColor: gradeInfo.color }}>
                <span className="grade-icon">{gradeInfo.icon}</span>
                <span className="grade-text">{gradeInfo.grade}</span>
              </div>
              <h2>Test Complete! 🎉</h2>
              <p>{gradeInfo.message}</p>
            </div>

            <div className="stats-grid">
              <div className="stat-item highlight">
                <FiTrendingUp className="stat-icon" />
                <div className="stat-details">
                  <span className="stat-label">Net Speed</span>
                  <span className="stat-value">{netWPM || wpm} <small>WPM</small></span>
                  <span className="stat-sub">Gross: {grossWPM || wpm} WPM</span>
                </div>
              </div>

              <div className="stat-item">
                <FiTarget className="stat-icon" />
                <div className="stat-details">
                  <span className="stat-label">Accuracy</span>
                  <span className="stat-value">{accuracy}%</span>
                  <span className="stat-sub">Raw: {rawAccuracy || accuracy}%</span>
                </div>
              </div>

              <div className="stat-item">
                <FiAward className="stat-icon" />
                <div className="stat-details">
                  <span className="stat-label">Characters</span>
                  <span className="stat-value">{correctChars}/{totalChars}</span>
                  <span className="stat-sub">Correct / Total</span>
                </div>
              </div>

              <div className="stat-item">
                <FiAlertCircle className="stat-icon" style={{ color: '#ef4444' }} />
                <div className="stat-details">
                  <span className="stat-label">Mistakes</span>
                  <span className="stat-value">{mistakes}</span>
                  <span className="stat-sub">Errors made</span>
                </div>
              </div>

              <div className="stat-item">
                <FiRefreshCw className="stat-icon" style={{ color: '#f59e0b' }} />
                <div className="stat-details">
                  <span className="stat-label">Backspaces</span>
                  <span className="stat-value">{backspaceCount}</span>
                  <span className="stat-sub">Corrections made</span>
                </div>
              </div>

              <div className="stat-item">
                <FiClock className="stat-icon" />
                <div className="stat-details">
                  <span className="stat-label">Time Taken</span>
                  <span className="stat-value">{Math.floor(totalTime / 60)}:{String(totalTime % 60).padStart(2, '0')}</span>
                  <span className="stat-sub">Minutes:Seconds</span>
                </div>
              </div>
            </div>

            <div className="performance-section">
              <div className="performance-bar">
                <div className="bar-label">
                  <span>Performance Score</span>
                  <span>{Math.min(100, Math.round((accuracy / 100) * ((netWPM || wpm) / 100) * 100))}%</span>
                </div>
                <div className="bar-track">
                  <div 
                    className="bar-fill" 
                    style={{ 
                      width: `${Math.min(100, Math.round((accuracy / 100) * ((netWPM || wpm) / 100) * 100))}%`,
                      backgroundColor: gradeInfo.color 
                    }}
                  />
                </div>
              </div>

              <div className="comparison-stats">
                <div className="comparison-item">
                  <span className="label">Your Speed</span>
                  <span className="value">{netWPM || wpm} WPM</span>
                  <span className="vs">vs</span>
                  <span className="label">Average</span>
                  <span className="value">40 WPM</span>
                </div>
                <div className="comparison-item">
                  <span className="label">Your Accuracy</span>
                  <span className="value">{accuracy}%</span>
                  <span className="vs">vs</span>
                  <span className="label">Average</span>
                  <span className="value">85%</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={onClose}>
                Continue
              </button>
              <button className="btn-secondary" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>

            <div className="modal-footer">
              <p>💡 <strong>Pro Tip:</strong> Practice daily for 15-20 minutes to see significant improvement!</p>
              <p>✨ You've typed {correctChars} characters correctly!</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;