import { useState, useEffect, useCallback, useRef } from 'react';
import { calculateWPM, calculateAccuracy, generateRandomText } from '../utils/helpers';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useTypingTest = (initialDuration = 60, initialDifficulty = 'medium') => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [startTime, setStartTime] = useState(null);
  
  const timerRef = useRef(null);
  
  const generateNewText = useCallback(() => {
    const newText = generateRandomText(initialDifficulty);
    setText(newText);
    setUserInput('');
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setCorrectChars(0);
  }, [initialDifficulty]);
  
  useEffect(() => {
    generateNewText();
  }, [generateNewText]);
  
  const startTest = useCallback(() => {
    if (isActive) return;
    
    setIsActive(true);
    setStartTime(Date.now());
    setTimeLeft(initialDuration);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isActive, initialDuration]);
  
  const endTest = useCallback(async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsActive(false);
    
    const finalWPM = wpm;
    const finalAccuracy = accuracy;
    
    try {
      await axios.post('https://nextype-backend.onrender.com/api/tests/submit', {
        wpm: finalWPM,
        accuracy: finalAccuracy,
        correctChars,
        mistakes,
        duration: initialDuration - timeLeft,
        difficulty: initialDifficulty,
        testType: 'paragraph',
        text
      });
      
      toast.success(`Test complete! ${finalWPM} WPM, ${finalAccuracy}% accuracy`);
    } catch (error) {
      console.error('Error saving test:', error);
    }
    
    return { wpm: finalWPM, accuracy: finalAccuracy, correctChars, mistakes };
  }, [wpm, accuracy, correctChars, mistakes, initialDuration, timeLeft, initialDifficulty, text]);
  
  useEffect(() => {
    if (!isActive) return;
    
    const calculateStats = () => {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      const wordsTyped = userInput.split(' ').filter(word => word.length > 0).length;
      const currentWPM = Math.round(wordsTyped / elapsedMinutes);
      
      let correct = 0;
      for (let i = 0; i < userInput.length && i < text.length; i++) {
        if (userInput[i] === text[i]) correct++;
      }
      
      const currentAccuracy = userInput.length > 0 
        ? Math.round((correct / userInput.length) * 100) 
        : 100;
      
      setWpm(currentWPM);
      setAccuracy(currentAccuracy);
      setCorrectChars(correct);
      setMistakes(userInput.length - correct);
    };
    
    const interval = setInterval(calculateStats, 100);
    return () => clearInterval(interval);
  }, [isActive, userInput, text, startTime]);
  
  const handleInputChange = (e) => {
    if (!isActive) return;
    
    const value = e.target.value;
    setUserInput(value);
    
    if (value.length >= text.length) {
      endTest();
    }
  };
  
  const resetTest = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsActive(false);
    generateNewText();
    setUserInput('');
    setTimeLeft(initialDuration);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setCorrectChars(0);
  };
  
  return {
    text,
    userInput,
    timeLeft,
    isActive,
    wpm,
    accuracy,
    mistakes,
    correctChars,
    startTest,
    handleInputChange,
    resetTest,
    generateNewText
  };
};