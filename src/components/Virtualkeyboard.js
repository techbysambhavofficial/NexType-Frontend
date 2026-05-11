import React, { useEffect, useRef } from 'react';
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import './VirtualKeyboard.scss';

const VirtualKeyboard = ({ inputRef, language = 'english', onKeyPress }) => {
  const keyboardRef = useRef(null);
  const keyboardInstance = useRef(null);

  useEffect(() => {
    if (keyboardRef.current && !keyboardInstance.current) {
      keyboardInstance.current = new Keyboard(keyboardRef.current, {
        onChange: input => {
          if (inputRef.current) {
            const currentValue = inputRef.current.value;
            inputRef.current.value = currentValue + input;
            // Trigger React's onChange event
            const event = new Event('input', { bubbles: true });
            inputRef.current.dispatchEvent(event);
          }
        },
        onKeyPress: button => {
          if (onKeyPress) onKeyPress(button);
        },
        layoutName: language === 'hindi' ? 'hindi' : 'default',
        theme: 'hg-theme-default hg-layout-default',
        display: {
          '{shift}': '⇧ Shift',
          '{lock}': '⇪ Caps',
          '{enter}': '↵ Enter',
          '{tab}': '⇥ Tab',
          '{bksp}': '⌫ Backspace',
          '{space}': '␣ Space',
        }
      });
    }
  }, [inputRef, onKeyPress]);

  useEffect(() => {
    if (keyboardInstance.current) {
      keyboardInstance.current.setOptions({
        layoutName: language === 'hindi' ? 'hindi' : 'default'
      });
    }
  }, [language]);

  return <div ref={keyboardRef} className="virtual-keyboard" />;
};

export default VirtualKeyboard;