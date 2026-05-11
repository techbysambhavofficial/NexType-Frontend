import React, { useState, useEffect, useRef } from 'react';
import { convertToKurtiDev, altCodesMapping } from '../data/kurti-dev-mapping';
import './KurtiDevTypingArea.scss';

const KurtiDevTypingArea = ({ value, onChange, placeholder, disabled, onComplete, targetText }) => {
  const [englishInput, setEnglishInput] = useState('');
  const [hindiOutput, setHindiOutput] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const textareaRef = useRef(null);
  
  useEffect(() => {
    if (value !== undefined && value !== hindiOutput) {
      setHindiOutput(value);
    }
  }, [value]);
  
  const handleInput = (e) => {
    const englishText = e.target.value;
    const convertedHindi = convertToKurtiDev(englishText);
    
    setEnglishInput(englishText);
    setHindiOutput(convertedHindi);
    setCharCount(convertedHindi.length);
    
    if (onChange) {
      onChange({
        target: { value: convertedHindi },
        rawValue: englishText
      });
    }
    
    if (targetText && convertedHindi.length >= targetText.length) {
      if (onComplete) onComplete();
    }
  };
  
  const handleKeyDown = (e) => {
    // Handle Alt codes
    if (e.altKey) {
      e.preventDefault();
      const altCode = `alt+${e.keyCode}`;
      if (altCodesMapping[altCode]) {
        const currentValue = englishInput;
        const newValue = currentValue + altCodesMapping[altCode];
        handleInput({ target: { value: newValue } });
      }
    }
    
    // Show keyboard guide on Ctrl+K
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      setShowKeyboard(!showKeyboard);
    }
  };
  
  return (
    <div className="kurti-dev-typing-area">
      <div className="typing-header">
        <div className="layout-badge">
          <span className="badge-icon">⌨️</span>
          <span className="badge-text">कुर्टी देव (Kurti Dev) - रैमिंगटन गेल</span>
        </div>
        <div className="typing-stats">
          <span>टाइप किए: {charCount}</span>
          <button className="help-btn" onClick={() => setShowKeyboard(!showKeyboard)}>
            ⌨️ कीबोर्ड
          </button>
        </div>
      </div>
      
      <div className="input-wrapper">
        <div className="hindi-output-box">
          <div className="hindi-text">
            {hindiOutput || <span className="placeholder">{placeholder || "यहाँ हिंदी टाइप होगी..."}</span>}
          </div>
        </div>
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
      </div>
      
      {showKeyboard && (
        <div className="keyboard-reference">
          <div className="kb-section">
            <h4>🔤 टॉप रो (Top Row)</h4>
            <div className="kb-keys">
              <span className="kb-key"><span className="eng">Q</span><span className="hin">क़</span><span className="sep">/</span><span className="hin cap">फ़</span></span>
              <span className="kb-key"><span className="eng">W</span><span className="hin">ॖ</span><span className="sep">/</span><span class="hin cap">ॐ</span></span>
              <span className="kb-key"><span className="eng">E</span><span className="hin">म</span><span className="sep">/</span><span class="hin cap">ं</span></span>
              <span className="kb-key"><span className="eng">R</span><span className="hin">त</span><span className="sep">/</span><span class="hin cap">थ</span></span>
              <span className="kb-key"><span className="eng">T</span><span className="hin">ज</span><span className="sep">/</span><span class="hin cap">ज्ञ</span></span>
              <span className="kb-key"><span className="eng">Y</span><span className="hin">ल</span><span className="sep">/</span><span class="hin cap">ळ</span></span>
              <span className="kb-key"><span className="eng">U</span><span className="hin">न</span><span className="sep">/</span><span class="hin cap">ऩ</span></span>
              <span className="kb-key"><span className="eng">I</span><span className="hin">प</span><span className="sep">/</span><span class="hin cap">फ़</span></span>
              <span className="kb-key"><span className="eng">O</span><span className="hin">व</span><span className="sep">/</span><span class="hin cap">ॉ</span></span>
              <span className="kb-key"><span className="eng">P</span><span className="hin">च</span><span className="sep">/</span><span class="hin cap">छ</span></span>
            </div>
          </div>
          
          <div className="kb-section">
            <h4>⌨️ होम रो (Home Row)</h4>
            <div className="kb-keys">
              <span className="kb-key"><span className="eng">A</span><span className="hin">ा</span><span className="sep">/</span><span class="hin cap">ओ</span></span>
              <span className="kb-key"><span className="eng">S</span><span className="hin">े</span><span className="sep">/</span><span class="hin cap">ए</span></span>
              <span className="kb-key"><span className="eng">D</span><span className="hin">क</span><span className="sep">/</span><span class="hin cap">क्</span></span>
              <span className="kb-key"><span className="eng">F</span><span className="hin">ि</span><span className="sep">/</span><span class="hin cap">ी</span></span>
              <span className="kb-key"><span className="eng">G</span><span className="hin">ह</span><span className="sep">/</span><span class="hin cap">ह्</span></span>
              <span className="kb-key"><span className="eng">H</span><span className="hin">ी</span><span className="sep">/</span><span class="hin cap">भ</span></span>
              <span className="kb-key"><span className="eng">J</span><span className="hin">र</span><span className="sep">/</span><span class="hin cap">श्र</span></span>
              <span className="kb-key"><span className="eng">K</span><span className="hin">ा</span><span className="sep">/</span><span class="hin cap">ज्ञ</span></span>
              <span className="kb-key"><span className="eng">L</span><span className="hin">स</span><span className="sep">/</span><span class="hin cap">ष</span></span>
              <span className="kb-key"><span className="eng">;</span><span className="hin">य</span></span>
              <span className="kb-key"><span className="eng">'</span><span className="hin">श</span><span className="sep">/</span><span class="hin cap">ष</span></span>
            </div>
          </div>
          
          <div className="kb-section">
            <h4>⬇️ बॉटम रो (Bottom Row)</h4>
            <div className="kb-keys">
              <span className="kb-key"><span className="eng">Z</span><span className="hin">्</span><span className="sep">/</span><span class="hin cap">त्र</span></span>
              <span className="kb-key"><span className="eng">X</span><span className="hin">ग</span><span className="sep">/</span><span class="hin cap">ग्</span></span>
              <span className="kb-key"><span className="eng">C</span><span className="hin">ब</span><span className="sep">/</span><span class="hin cap">ब्</span></span>
              <span className="kb-key"><span className="eng">V</span><span className="hin">अ</span><span className="sep">/</span><span class="hin cap">ट</span></span>
              <span className="kb-key"><span className="eng">B</span><span className="hin">इ</span><span className="sep">/</span><span class="hin cap">ठ</span></span>
              <span className="kb-key"><span className="eng">N</span><span className="hin">द</span><span className="sep">/</span><span class="hin cap">छ</span></span>
              <span className="kb-key"><span className="eng">M</span><span className="hin">उ</span><span className="sep">/</span><span class="hin cap">ड</span></span>
              <span className="kb-key"><span className="eng">,</span><span className="hin">ए</span><span className="sep">/</span><span class="hin cap">ढ</span></span>
              <span className="kb-key"><span className="eng">.</span><span className="hin">ण</span><span className="sep">/</span><span class="hin cap">झ</span></span>
              <span className="kb-key"><span className="eng">/</span><span className="hin">ध</span><span className="sep">/</span><span class="hin cap">ध्</span></span>
            </div>
          </div>
          
          <div className="kb-section">
            <h4>🔢 नंबर रो (Number Row)</h4>
            <div className="kb-keys">
              <span className="kb-key"><span className="eng">1</span><span className="hin">१</span><span className="sep">/</span><span class="hin cap">!</span></span>
              <span className="kb-key"><span className="eng">2</span><span className="hin">२</span><span className="sep">/</span><span class="hin cap">@</span></span>
              <span className="kb-key"><span className="eng">3</span><span className="hin">३</span><span className="sep">/</span><span class="hin cap">#</span></span>
              <span className="kb-key"><span className="eng">4</span><span className="hin">४</span><span className="sep">/</span><span class="hin cap">$</span></span>
              <span className="kb-key"><span className="eng">5</span><span className="hin">५</span><span className="sep">/</span><span class="hin cap">%</span></span>
              <span className="kb-key"><span className="eng">6</span><span className="hin">६</span><span className="sep">/</span><span class="hin cap">^</span></span>
              <span className="kb-key"><span className="eng">7</span><span className="hin">७</span><span className="sep">/</span><span class="hin cap">&</span></span>
              <span className="kb-key"><span className="eng">8</span><span className="hin">८</span><span className="sep">/</span><span class="hin cap">*</span></span>
              <span className="kb-key"><span className="eng">9</span><span className="hin">९</span><span className="sep">/</span><span class="hin cap">(</span></span>
              <span className="kb-key"><span className="eng">0</span><span className="hin">०</span><span className="sep">/</span><span class="hin cap">)</span></span>
            </div>
          </div>
          
          <div className="kb-note">
            💡 <strong>टिप:</strong> 
            • Shift + Key से बड़े/कैपिटल अक्षर आते हैं<br />
            • Alt + Number से विशेष अक्षर (Alt Codes)<br />
            • Ctrl + I = 'ी', Ctrl + P = 'ु' (मात्राएँ)
          </div>
        </div>
      )}
    </div>
  );
};

export default KurtiDevTypingArea;