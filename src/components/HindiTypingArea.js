import React, { useState, useEffect, useRef } from 'react';
import { convertToRemingtonHindi } from '../data/remington-gail-full';
import './HindiTypingArea.scss';

const HindiTypingArea = ({ value, onChange, placeholder, disabled, onComplete, targetText }) => {
  const [englishInput, setEnglishInput] = useState('');
  const [hindiOutput, setHindiOutput] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  const textareaRef = useRef(null);
  
  useEffect(() => {
    if (value !== undefined && value !== hindiOutput) {
      setHindiOutput(value);
    }
  }, [value]);
  
  const handleInput = (e) => {
    const englishText = e.target.value;
    const convertedHindi = convertToRemingtonHindi(englishText);
    
    setEnglishInput(englishText);
    setHindiOutput(convertedHindi);
    setCharCount(convertedHindi.length);
    
    // Compare with target text for mistakes
    if (targetText) {
      const newMistakes = [];
      for (let i = 0; i < convertedHindi.length && i < targetText.length; i++) {
        if (convertedHindi[i] !== targetText[i]) {
          newMistakes.push({ position: i, expected: targetText[i], got: convertedHindi[i] });
        }
      }
      setMistakes(newMistakes);
    }
    
    if (onChange) {
      onChange({
        target: { value: convertedHindi },
        rawValue: englishText
      });
    }
    
    // Check if completed
    if (targetText && convertedHindi.length >= targetText.length) {
      if (onComplete) onComplete();
    }
  };
  
  const handleKeyDown = (e) => {
    // Show keyboard mapping on Alt key
    if (e.altKey && e.key === 'k') {
      e.preventDefault();
      const guide = document.querySelector('.keyboard-guide-modal');
      if (guide) guide.classList.toggle('visible');
    }
  };
  
  return (
    <div className="hindi-typing-area">
      <div className="typing-header-info">
        <div className="layout-badge">
          <span className="badge-icon">⌨️</span>
          <span className="badge-text">रैमिंगटन गेल (Remington Gail)</span>
        </div>
        <div className="typing-stats">
          <span>टाइप किए: {charCount}</span>
          {mistakes.length > 0 && <span className="mistake-count">गलतियाँ: {mistakes.length}</span>}
        </div>
      </div>
      
      <div className="input-output-container">
        {/* English Input (Hidden but functional) */}
        <textarea
          ref={textareaRef}
          className="english-input-hidden"
          value={englishInput}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="अंग्रेजी कीबोर्ड पर टाइप करें..."
          disabled={disabled}
          autoFocus
        />
        
        {/* Hindi Output (Visible) */}
        <div className="hindi-output-display">
          <div className="hindi-text">
            {hindiOutput || (placeholder && <span className="placeholder">{placeholder}</span>)}
          </div>
          <div className="typing-cursor"></div>
        </div>
      </div>
      
      <div className="keyboard-reference">
        <div className="reference-title">
          <span>📖 कीबोर्ड संदर्भ (Keyboard Reference)</span>
          <button className="toggle-ref" onClick={() => {
            const ref = document.querySelector('.reference-content');
            ref.classList.toggle('visible');
          }}>▼</button>
        </div>
        <div className="reference-content">
          <div className="keyboard-layout">
            <div className="kb-row">
              <div className="key-group">
                <div className="key">Q</div>
                <div className="value">अ</div>
              </div>
              <div className="key-group">
                <div className="key">W</div>
                <div className="value">आ</div>
              </div>
              <div className="key-group">
                <div className="key">E</div>
                <div className="value">इ</div>
              </div>
              <div className="key-group">
                <div className="key">R</div>
                <div className="value">ई</div>
              </div>
              <div className="key-group">
                <div className="key">T</div>
                <div className="value">उ</div>
              </div>
              <div className="key-group">
                <div className="key">Y</div>
                <div className="value">ऊ</div>
              </div>
              <div className="key-group">
                <div className="key">U</div>
                <div className="value">ए</div>
              </div>
              <div className="key-group">
                <div className="key">I</div>
                <div className="value">ऐ</div>
              </div>
              <div className="key-group">
                <div className="key">O</div>
                <div className="value">ओ</div>
              </div>
              <div className="key-group">
                <div className="key">P</div>
                <div className="value">औ</div>
              </div>
            </div>
            <div className="kb-row">
              <div className="key-group">
                <div className="key">A</div>
                <div className="value">क</div>
              </div>
              <div className="key-group">
                <div className="key">S</div>
                <div className="value">ख</div>
              </div>
              <div className="key-group">
                <div className="key">D</div>
                <div className="value">ग</div>
              </div>
              <div className="key-group">
                <div className="key">F</div>
                <div className="value">घ</div>
              </div>
              <div className="key-group">
                <div className="key">G</div>
                <div className="value">ङ</div>
              </div>
              <div className="key-group">
                <div className="key">H</div>
                <div className="value">च</div>
              </div>
              <div className="key-group">
                <div className="key">J</div>
                <div className="value">छ</div>
              </div>
              <div className="key-group">
                <div className="key">K</div>
                <div className="value">ज</div>
              </div>
              <div className="key-group">
                <div className="key">L</div>
                <div className="value">झ</div>
              </div>
              <div className="key-group">
                <div className="key">;</div>
                <div className="value">ञ</div>
              </div>
            </div>
            <div className="kb-row">
              <div className="key-group">
                <div className="key">Z</div>
                <div className="value">ट</div>
              </div>
              <div className="key-group">
                <div className="key">X</div>
                <div className="value">ठ</div>
              </div>
              <div className="key-group">
                <div className="key">C</div>
                <div className="value">ड</div>
              </div>
              <div className="key-group">
                <div className="key">V</div>
                <div className="value">ढ</div>
              </div>
              <div className="key-group">
                <div className="key">B</div>
                <div className="value">ण</div>
              </div>
              <div className="key-group">
                <div className="key">N</div>
                <div className="value">त</div>
              </div>
              <div className="key-group">
                <div className="key">M</div>
                <div className="value">थ</div>
              </div>
              <div className="key-group">
                <div className="key">,</div>
                <div className="value">द</div>
              </div>
              <div className="key-group">
                <div className="key">.</div>
                <div className="value">ध</div>
              </div>
              <div className="key-group">
                <div className="key">/</div>
                <div className="value">न</div>
              </div>
            </div>
          </div>
          <div className="note">
            💡 <strong>टिप:</strong> Shift + Key से मात्राएँ लगती हैं। जैसे: Shift+A = का, Shift+S = खा
          </div>
        </div>
      </div>
    </div>
  );
};

export default HindiTypingArea;