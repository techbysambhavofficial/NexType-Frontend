import React, { useState, useRef, useEffect } from 'react';
import { remingtonGailMapping } from '../data/remington-gail-mapping';

const HindiRemingtonInput = ({ value, onChange, placeholder, disabled, className }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const textareaRef = useRef(null);

  // Convert English keystrokes to Hindi Remington layout
  const convertToHindi = (englishText) => {
    let hindiText = '';
    let i = 0;
    
    while (i < englishText.length) {
      let matched = false;
      let currentChar = englishText[i];
      let nextChar = englishText[i + 1] || '';
      let isShift = false;
      
      // Check for shift key combinations (capital letters in English input)
      if (currentChar >= 'A' && currentChar <= 'Z') {
        isShift = true;
        currentChar = currentChar.toLowerCase();
      }
      
      // Check for two-character combinations
      if (i + 1 < englishText.length) {
        const twoChars = currentChar + (isShift ? nextChar.toUpperCase() : nextChar);
        const shiftKey = isShift ? `shift+${currentChar}${nextChar}` : null;
        
        if (shiftKey && remingtonGailMapping[shiftKey]) {
          hindiText += remingtonGailMapping[shiftKey];
          i += 2;
          matched = true;
        }
      }
      
      // Check for single character
      if (!matched) {
        const lookupKey = isShift ? `shift+${currentChar}` : currentChar;
        const hindiChar = remingtonGailMapping[lookupKey] || currentChar;
        hindiText += hindiChar;
        i++;
      }
    }
    
    return hindiText;
  };

  const handleInput = (e) => {
    const englishText = e.target.value;
    const hindiText = convertToHindi(englishText);
    setInputValue(englishText);
    
    // Trigger onChange with converted Hindi text
    if (onChange) {
      const event = {
        target: {
          value: hindiText,
          rawValue: englishText
        }
      };
      onChange(event);
    }
  };

  // Sync external value changes
  useEffect(() => {
    if (value !== inputValue && value !== undefined) {
      // Don't update if it's from internal change
    }
  }, [value]);

  return (
    <div className="hindi-remington-input-container">
      <div className="layout-indicator">
        <span className="layout-badge">⌨️ Remington Gail (Hindi Typewriter)</span>
        <span className="layout-hint">
          🔤 अंग्रेजी कीबोर्ड पर टाइप करें, हिंदी आउटपुट देखें
        </span>
      </div>
      <textarea
        ref={textareaRef}
        className={`${className} hindi-remington-textarea`}
        value={inputValue}
        onChange={handleInput}
        placeholder={placeholder || "अंग्रेजी कीबोर्ड पर टाइप करें...\n\nExample: a = क, s = ख, d = ग, f = घ"}
        disabled={disabled}
      />
      <div className="keyboard-reference">
        <details>
          <summary>📖 कीबोर्ड लेआउट संदर्भ (Keyboard Reference)</summary>
          <div className="keyboard-grid">
            <div className="row">
              <div className="key-info"><span className="eng">A</span> → <span className="hin">क</span></div>
              <div className="key-info"><span className="eng">S</span> → <span className="hin">ख</span></div>
              <div className="key-info"><span className="eng">D</span> → <span className="hin">ग</span></div>
              <div className="key-info"><span className="eng">F</span> → <span className="hin">घ</span></div>
              <div className="key-info"><span className="eng">G</span> → <span className="hin">ङ</span></div>
            </div>
            <div className="row">
              <div className="key-info"><span className="eng">H</span> → <span className="hin">च</span></div>
              <div className="key-info"><span className="eng">J</span> → <span className="hin">छ</span></div>
              <div className="key-info"><span className="eng">K</span> → <span className="hin">ज</span></div>
              <div className="key-info"><span className="eng">L</span> → <span className="hin">झ</span></div>
              <div className="key-info"><span className="eng">;</span> → <span className="hin">ञ</span></div>
            </div>
            <div className="row">
              <div className="key-info"><span className="eng">Q</span> → <span className="hin">अ</span></div>
              <div className="key-info"><span className="eng">W</span> → <span className="hin">आ</span></div>
              <div className="key-info"><span className="eng">E</span> → <span className="hin">इ</span></div>
              <div className="key-info"><span className="eng">R</span> → <span className="hin">ई</span></div>
              <div className="key-info"><span className="eng">T</span> → <span className="hin">उ</span></div>
            </div>
            <div className="row">
              <div className="key-info"><span className="eng">Y</span> → <span className="hin">ऊ</span></div>
              <div className="key-info"><span className="eng">U</span> → <span className="hin">ए</span></div>
              <div className="key-info"><span className="eng">I</span> → <span className="hin">ऐ</span></div>
              <div className="key-info"><span className="eng">O</span> → <span className="hin">ओ</span></div>
              <div className="key-info"><span className="eng">P</span> → <span className="hin">औ</span></div>
            </div>
            <div className="row">
              <div className="key-info"><span className="eng">Z</span> → <span className="hin">ट</span></div>
              <div className="key-info"><span className="eng">X</span> → <span className="hin">ठ</span></div>
              <div className="key-info"><span className="eng">C</span> → <span className="hin">ड</span></div>
              <div className="key-info"><span className="eng">V</span> → <span className="hin">ढ</span></div>
              <div className="key-info"><span className="eng">B</span> → <span className="hin">ण</span></div>
            </div>
            <div className="row">
              <div className="key-info"><span className="eng">N</span> → <span className="hin">त</span></div>
              <div className="key-info"><span className="eng">M</span> → <span className="hin">थ</span></div>
              <div className="key-info"><span className="eng">,</span> → <span className="hin">द</span></div>
              <div className="key-info"><span className="eng">.</span> → <span className="hin">ध</span></div>
              <div className="key-info"><span className="eng">/</span> → <span className="hin">न</span></div>
            </div>
          </div>
          <p className="note">
            💡 <strong>सुझाव:</strong> Shift + Key से मात्राएँ और विशेष अक्षर आते हैं। 
            जैसे: Shift + A = का, Shift + S = खि
          </p>
        </details>
      </div>
    </div>
  );
};

export default HindiRemingtonInput;