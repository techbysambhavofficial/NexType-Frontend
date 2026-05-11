import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiZap, FiTarget, FiClock, FiAlertCircle, FiBookOpen, FiSettings, FiPause, FiPlay, FiSquare, FiRefreshCw, FiGlobe } from 'react-icons/fi';
import ResultModal from '../components/ResultModal';
import './TypingTest.scss';
import { convertToKurtiDev, kurtiDevMapping, altCodesMapping } from '../data/Kurti-dev-mapping';

const TypingTest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [testActive, setTestActive] = useState(false);
  const [testPaused, setTestPaused] = useState(false);
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [rawInput, setRawInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [pauseStartTime, setPauseStartTime] = useState(null);
  const [totalPausedTime, setTotalPausedTime] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [isExerciseMode, setIsExerciseMode] = useState(false);
  const [showDurationSelector, setShowDurationSelector] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [showResultModal, setShowResultModal] = useState(false);
  const [testResults, setTestResults] = useState({});
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [lastInputLength, setLastInputLength] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [hasExercise, setHasExercise] = useState(false);
  const [isHindi, setIsHindi] = useState(false);
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const textAreaRef = useRef(null);
  const timerRef = useRef(null);
  const contentRef = useRef(null);
  const activeCharRef = useRef(null);
  
  // 1000-word paragraph for random test
  const thousandWordParagraph = `In the rapidly evolving landscape of technology and digital innovation, the art of typing has transformed from a simple office skill into an essential competency for virtually every profession. Whether you are a student writing academic papers, a professional drafting important documents, a programmer writing code, or simply someone communicating through email and social media, your typing speed and accuracy can significantly impact your productivity and efficiency. The journey to becoming a proficient typist is not merely about hitting keys faster; it involves developing muscle memory, understanding proper finger placement, and practicing consistently to achieve fluid, error-free typing.

The history of typing dates back to the invention of the typewriter in the 19th century. Christopher Latham Sholes, often credited as the inventor of the modern typewriter, developed the QWERTY keyboard layout that we still use today. Interestingly, this layout was designed specifically to prevent mechanical jamming in early typewriters by placing commonly used letter pairs apart from each other. Despite the emergence of alternative layouts like Dvorak and Colemak that claim to offer better ergonomics and speed, QWERTY remains the dominant standard globally. This historical context reminds us that many of the tools we take for granted have fascinating origins and design considerations.

For beginners, the process of learning to type can initially feel frustrating and slow. It is common to look at the keyboard frequently, make numerous mistakes, and feel like progress is minimal. However, research in cognitive psychology and motor learning demonstrates that with deliberate practice, the brain gradually develops automaticity in typing tasks. This means that over time, your fingers begin to move instinctively to the correct keys without conscious thought about their locations. The key to reaching this level is consistent, focused practice rather than sporadic, lengthy sessions. Even fifteen to twenty minutes of daily practice can yield remarkable improvements over several weeks.

Proper posture and ergonomics play a crucial role in typing efficiency and long-term health. Ideally, you should sit with your back straight, feet flat on the floor, and wrists slightly elevated but not resting on the desk. The keyboard should be positioned so that your elbows form approximately a ninety-degree angle. These ergonomic principles help prevent repetitive strain injuries such as carpal tunnel syndrome, which affects many individuals who spend extended periods typing without proper positioning. Taking regular breaks to stretch your fingers, wrists, and shoulders is equally important for maintaining comfort and preventing fatigue.

The role of typing tests and timed exercises in skill development cannot be overstated. When you practice under timed conditions, you simulate real-world scenarios where deadlines and efficiency matter. Typing tests measure your words per minute (WPM) and accuracy percentage, providing quantifiable metrics to track your progress over time. Many professional environments require minimum typing speeds ranging from forty to sixty WPM for administrative positions, while transcriptionists and court reporters often need speeds exceeding eighty WPM with exceptional accuracy. Setting incremental goals, such as improving your WPM by five points each month, can keep you motivated and focused on continuous improvement.

Technology has introduced numerous tools and platforms specifically designed for typing practice. From online typing tutors and games to specialized software that adapts difficulty levels based on performance, there is no shortage of resources for aspiring typists. Some platforms focus on teaching proper finger placement through visual guides and interactive exercises, while others provide real-world text passages from literature, news articles, and technical documentation. The diversity of available content ensures that learners can find material that interests them, which is essential for maintaining engagement and making practice sessions enjoyable rather than tedious.

Touch typing, the practice of typing without looking at the keyboard, represents the gold standard for efficiency. While initially challenging, touch typing allows you to keep your eyes on the screen or source material, dramatically reducing the time lost shifting visual attention. Learning touch typing typically begins with mastering the home row keys (ASDF for the left hand and JKL for the right hand) and gradually expanding to other keys. Most modern keyboards have small raised bumps on the F and J keys to help typists locate the home row position without looking. With sufficient practice, touch typing becomes second nature, enabling you to focus entirely on what you want to communicate rather than how to produce each character.

For individuals who type primarily in languages other than English, additional considerations come into play. Hindi typing, for example, often uses phonetic layouts like Kurti Dev or transliteration methods that convert English keystrokes into Devanagari script. Understanding these specialized input methods requires dedicated practice and familiarity with the mapping between English keys and Hindi characters. Many government examinations in India test Hindi typing proficiency, making this skill particularly valuable for individuals seeking clerical or administrative positions in Hindi-speaking regions. Fortunately, the same principles of consistent practice and proper technique apply regardless of the language or script being typed.

The relationship between typing speed and cognitive processing is fascinating. Professional typists often report that their fingers seem to anticipate upcoming words based on context, allowing them to maintain high speeds even when typing unfamiliar text. This suggests that typing proficiency involves not just motor skills but also predictive language processing. Studies using electroencephalography (EEG) have shown that expert typists exhibit different brain activation patterns compared to novices, with more efficient neural pathways that reduce cognitive load during typing tasks. These neurological adaptations demonstrate how the brain rewires itself in response to extensive practice, a phenomenon known as neuroplasticity.

For those preparing for typing tests in professional or academic contexts, developing strategies to manage test anxiety is essential. The pressure of a timed test can cause even skilled typists to make uncharacteristic errors or hesitate at crucial moments. Practicing under simulated test conditions helps build familiarity with the testing environment and reduces anxiety. Deep breathing exercises, positive visualization, and focusing on accuracy rather than speed at the beginning of a test can improve performance. Remember that most tests measure both speed and accuracy, so maintaining composure and typing deliberately is often more effective than rushing and making numerous corrections.

The digital age has brought about new forms of typing beyond traditional keyboards. Touchscreen keyboards on smartphones and tablets have become ubiquitous, yet they rarely achieve speeds comparable to physical keyboards due to the lack of tactile feedback and the smaller key sizes. Voice recognition technology continues to improve, offering an alternative for individuals who find typing physically challenging or who need to generate long documents quickly. However, voice typing introduces other challenges, including the need for clear pronunciation, dealing with background noise, and editing spoken text that may contain recognition errors. For most professionals, a combination of typing and voice input provides the most flexible and efficient workflow.`;

  // CHECK EXERCISE SELECTION - MAIN VALIDATION
  useEffect(() => {
    const checkExerciseSelection = () => {
      const storedExercise = localStorage.getItem('currentExercise');
      const hasSelectedExercise = localStorage.getItem('hasSelectedExercise');
      
      // IMPORTANT: If no exercise is selected, redirect to exercises page
      if (!storedExercise && (!hasSelectedExercise || hasSelectedExercise !== 'true')) {
        toast.error('Please select an exercise first!');
        navigate('/exercises');
        setIsCheckingAuth(false);
        return;
      }
      
      if (storedExercise) {
        try {
          const exercise = JSON.parse(storedExercise);
          setCurrentExercise(exercise);
          setIsExerciseMode(true);
          setText(exercise.content);
          setSelectedDuration(exercise.duration);
          setTimeLeft(exercise.duration);
          setShowDurationSelector(false);
          setHasExercise(true);
          
          // Detect if text is Hindi
          const hasHindi = /[\u0900-\u097F]/.test(exercise.content);
          setIsHindi(hasHindi);
          
          // Clear the stored exercise after loading (so it doesn't reload on refresh)
          localStorage.removeItem('currentExercise');
          localStorage.setItem('hasSelectedExercise', 'true');
          
          toast.success(`Exercise loaded: ${exercise.title}`);
          toast.success(`Duration: ${Math.floor(exercise.duration / 60)} minutes ${exercise.duration % 60} seconds`);
        } catch (error) {
          console.error('Error parsing exercise:', error);
          toast.error('Failed to load exercise');
          navigate('/exercises');
        }
      } else if (hasSelectedExercise === 'true') {
        setHasExercise(true);
        setShowDurationSelector(true);
      } else {
        navigate('/exercises');
      }
      setIsCheckingAuth(false);
    };
    
    checkExerciseSelection();
  }, [navigate]);
  
  // Auto-scroll to current character
  useEffect(() => {
    if (activeCharRef.current && contentRef.current) {
      activeCharRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }, [currentCharIndex]);
  
  const generateRandomText = () => {
    setText(thousandWordParagraph);
    setUserInput('');
    setRawInput('');
    setWpm(0);
    setAccuracy(0);
    setMistakes(0);
    setCorrectChars(0);
    setBackspaceCount(0);
    setLastInputLength(0);
    setCurrentCharIndex(0);
    setTotalPausedTime(0);
    setStartTime(null);
    setTimeLeft(selectedDuration);
    setIsHindi(false);
  };
  
  const startTest = () => {
    if (testActive) return;
    
    // Final check before starting test
    const hasSelectedExercise = localStorage.getItem('hasSelectedExercise');
    if (!hasExercise && !isExerciseMode && (!hasSelectedExercise || hasSelectedExercise !== 'true')) {
      toast.error('Please select an exercise first!');
      navigate('/exercises');
      return;
    }
    
    let finalText = text;
    
    if (showDurationSelector && !isExerciseMode) {
      finalText = thousandWordParagraph;
      setText(thousandWordParagraph);
      setTimeLeft(selectedDuration);
    }
    
    setShowDurationSelector(false);
    setTestActive(true);
    setTestPaused(false);
    setStartTime(Date.now());
    setTotalPausedTime(0);
    setPauseStartTime(null);
    
    // Reset all stats
    setUserInput('');
    setRawInput('');
    setWpm(0);
    setAccuracy(0);
    setMistakes(0);
    setCorrectChars(0);
    setBackspaceCount(0);
    setLastInputLength(0);
    setCurrentCharIndex(0);
    
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Focus on textarea
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    }, 100);
    
    toast.success('Test started! Best wishes! 🚀');
  };
  
  const pauseTest = () => {
    if (!testActive || testPaused) return;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setTestPaused(true);
    setPauseStartTime(Date.now());
    toast.success('⏸️ Test paused. Click Resume to continue.');
  };
  
  const resumeTest = () => {
    if (!testActive || !testPaused) return;
    
    if (pauseStartTime) {
      const pausedDuration = (Date.now() - pauseStartTime) / 1000;
      setTotalPausedTime(prev => prev + pausedDuration);
    }
    
    setTestPaused(false);
    setPauseStartTime(null);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    toast.success('▶️ Test resumed!');
    textAreaRef.current?.focus();
  };
  
  const stopTest = () => {
    if (!testActive) return;
    
    if (window.confirm('Are you sure you want to stop the test? Your progress will be saved.')) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      endTest();
    }
  };
  
  const changeExercise = () => {
    if (testActive) {
      if (window.confirm('Test is running. Are you sure you want to change the exercise? Your progress will be lost.')) {
        // Clear all exercise-related storage
        setIsExerciseMode(false);
        setCurrentExercise(null);
        setHasExercise(false);
        setTestActive(false);
        setTestPaused(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        localStorage.removeItem('hasSelectedExercise');
        localStorage.removeItem('currentExercise');
        navigate('/exercises');
        toast.success('Choose a new exercise from the list.');
      }
    } else {
      // Clear all exercise-related storage
      setIsExerciseMode(false);
      setCurrentExercise(null);
      setHasExercise(false);
      localStorage.removeItem('hasSelectedExercise');
      localStorage.removeItem('currentExercise');
      navigate('/exercises');
      toast.success('Choose a new exercise from the list.');
    }
  };
  
  const handleHindiInput = (e) => {
    if (!testActive || testPaused) return;
    
    const rawValue = e.target.value;
    const convertedValue = convertToKurtiDev(rawValue);
    
    setRawInput(rawValue);
    setUserInput(convertedValue);
    setCurrentCharIndex(convertedValue.length);
    
    if (rawValue.length < lastInputLength) {
      setBackspaceCount(prev => prev + (lastInputLength - rawValue.length));
    }
    setLastInputLength(rawValue.length);
    
    if (convertedValue.length >= text.length) {
      endTest();
    }
  };
  
  const handleEnglishInput = (e) => {
    if (!testActive || testPaused) return;
    
    const value = e.target.value;
    const newLength = value.length;
    
    if (newLength < lastInputLength) {
      setBackspaceCount(prev => prev + (lastInputLength - newLength));
    }
    
    setLastInputLength(newLength);
    setUserInput(value);
    setCurrentCharIndex(newLength);
    
    if (value.length >= text.length) {
      endTest();
    }
  };
  
  const handleKeyDown = (e) => {
    // Prevent Tab key from leaving textarea
    if (e.key === 'Tab') {
      e.preventDefault();
    }
    
    // Handle Alt codes for Hindi
    if (e.altKey && isHindi) {
      e.preventDefault();
      const altCode = `alt+${e.keyCode}`;
      if (altCodesMapping && altCodesMapping[altCode]) {
        const currentRaw = rawInput;
        const newRaw = currentRaw + altCodesMapping[altCode];
        const newConverted = convertToKurtiDev(newRaw);
        setRawInput(newRaw);
        setUserInput(newConverted);
        setCurrentCharIndex(newConverted.length);
      }
    }
    
    // Keyboard shortcuts
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      pauseTest();
    }
    
    if (e.ctrlKey && e.key === 'r') {
      e.preventDefault();
      resumeTest();
    }
    
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      stopTest();
    }
  };
  
  const endTest = useCallback(async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setTestActive(false);
    setTestPaused(false);
    
    // Calculate time spent
    let effectiveTime = 0;
    if (startTime) {
      const endTime = Date.now();
      const totalElapsed = (endTime - startTime) / 1000;
      effectiveTime = totalElapsed - totalPausedTime;
    }
    
    if (effectiveTime <= 0) {
      effectiveTime = selectedDuration - timeLeft;
    }
    if (effectiveTime <= 0) effectiveTime = 1;
    
    // Calculate correct characters
    let correct = 0;
    for (let i = 0; i < userInput.length && i < text.length; i++) {
      if (userInput[i] === text[i]) {
        correct++;
      }
    }
    
    const totalTyped = userInput.length;
    const mistakesCount = totalTyped - correct;
    
    // Calculate WPM (5 chars = 1 word)
    const minutes = effectiveTime / 60;
    const wordsTyped = correct / 5;
    const calculatedWPM = Math.round(wordsTyped / minutes);
    const calculatedAccuracy = totalTyped > 0 ? Math.round((correct / totalTyped) * 100) : 0;
    const grossWPM = Math.round((totalTyped / 5) / minutes);
    
    const results = {
      wpm: calculatedWPM,
      grossWPM: grossWPM,
      netWPM: calculatedWPM,
      accuracy: calculatedAccuracy,
      rawAccuracy: calculatedAccuracy,
      correctChars: correct,
      mistakes: mistakesCount,
      totalChars: text.length,
      backspaceCount: backspaceCount,
      totalTime: Math.round(effectiveTime),
    };
    
    setTestResults(results);
    setShowResultModal(true);
    
    setWpm(calculatedWPM);
    setAccuracy(calculatedAccuracy);
    setCorrectChars(correct);
    setMistakes(mistakesCount);
    
    // Save to backend
    try {
      const token = localStorage.getItem('token');
      if (token && (userInput.length > 0 || effectiveTime > 0)) {
        let textToSave = text;
        if (!textToSave || textToSave.length === 0) {
          textToSave = thousandWordParagraph.slice(0, 500);
        }
        
        await axios.post('https://nextype-backend.onrender.com/api/tests/submit', {
          wpm: calculatedWPM || 0,
          accuracy: calculatedAccuracy || 0,
          correctChars: correct,
          mistakes: mistakesCount,
          duration: Math.round(effectiveTime),
          difficulty: currentExercise?.difficulty || 'medium',
          testType: isExerciseMode ? 'exercise' : 'paragraph',
          text: textToSave.slice(0, 500)
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (isExerciseMode && currentExercise) {
          toast.success(`🎉 Exercise "${currentExercise.title}" completed! 🎉`);
        }
      }
    } catch (error) {
      console.error('Error saving test:', error);
    }
  }, [userInput, text, startTime, totalPausedTime, selectedDuration, timeLeft, backspaceCount, isExerciseMode, currentExercise, thousandWordParagraph]);
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Calculate stats during test
  useEffect(() => {
    if (!testActive || testPaused || !startTime) return;
    
    const calculateStats = () => {
      const currentTime = Date.now();
      const elapsedSeconds = (currentTime - startTime) / 1000 - totalPausedTime;
      if (elapsedSeconds <= 0) return;
      
      const elapsedMinutes = elapsedSeconds / 60;
      
      let correct = 0;
      for (let i = 0; i < userInput.length && i < text.length; i++) {
        if (userInput[i] === text[i]) correct++;
      }
      
      const totalTyped = userInput.length;
      const mistakesCount = totalTyped - correct;
      const wordsTyped = correct / 5;
      const currentWPM = Math.round(wordsTyped / elapsedMinutes);
      const currentAccuracy = totalTyped > 0 ? Math.round((correct / totalTyped) * 100) : 0;
      
      setWpm(currentWPM || 0);
      setAccuracy(currentAccuracy);
      setCorrectChars(correct);
      setMistakes(mistakesCount);
      setCurrentCharIndex(userInput.length);
    };
    
    const interval = setInterval(calculateStats, 100);
    return () => clearInterval(interval);
  }, [testActive, testPaused, userInput, text, startTime, totalPausedTime]);
  
  const renderText = () => {
    const characters = [...text];
    
    return characters.map((char, index) => {
      let className = 'char';
      if (index < userInput.length) {
        className += userInput[index] === char ? ' correct' : ' incorrect';
      } else if (index === userInput.length && testActive && !testPaused) {
        className += ' current';
      }
      
      return (
        <span 
          key={index} 
          className={className}
          ref={index === userInput.length ? activeCharRef : null}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Loading state while checking exercise selection
  if (isCheckingAuth) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  // No exercise selected - show message (should redirect, but just in case)
  if (!hasExercise && !isExerciseMode && !showDurationSelector) {
    return (
      <div className="no-exercise-container">
        <div className="no-exercise-card">
          <FiBookOpen className="icon" />
          <h2>No Exercise Selected</h2>
          <p>Please select an exercise from the Exercises page before starting the typing test.</p>
          <button onClick={() => navigate('/exercises')} className="btn-primary">
            Go to Exercises
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <motion.div className="typing-test" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Exercise Mode Banner */}
        {isExerciseMode && currentExercise && (
          <div className="exercise-banner">
            <FiBookOpen className="banner-icon" />
            <div className="banner-info">
              <h3>{currentExercise.title}</h3>
              <p>{currentExercise.description}</p>
              <div className="banner-meta">
                <span className="duration-badge">
                  <FiClock /> {Math.floor(currentExercise.duration / 60)} min {currentExercise.duration % 60} sec
                </span>
                <span className={`difficulty-badge ${currentExercise.difficulty}`}>
                  {currentExercise.difficulty === 'easy' ? 'Easy' : 
                   currentExercise.difficulty === 'medium' ? 'Medium' : 
                   currentExercise.difficulty === 'hard' ? 'Hard' : currentExercise.difficulty}
                </span>
              </div>
            </div>
            <button className="change-exercise-btn" onClick={changeExercise}>
              <FiRefreshCw /> Change Exercise
            </button>
          </div>
        )}
        
        {/* Language Indicator */}
        <div className="language-indicator">
          <FiGlobe />
          <span className={isHindi ? 'hindi' : 'english'}>
            {isHindi ? 'Hindi Mode (Kurti Dev)' : 'English Mode'}
          </span>
          <small>
            {isHindi ? 'Type on English keyboard, Hindi will convert' : 'Type directly in English'}
          </small>
        </div>
        
        {/* Hindi Keyboard Guide */}
        {isHindi && (
          <div className="hindi-guide">
            <button className="guide-toggle" onClick={() => setShowKeyboardGuide(!showKeyboardGuide)}>
              ⌨️ {showKeyboardGuide ? 'Hide Keyboard Guide' : 'Show Keyboard Guide'}
            </button>
            
            {showKeyboardGuide && (
              <div className="keyboard-guide">
                <h4>Kurti Dev Keyboard Layout</h4>
                <div className="keyboard-rows">
                  <div className="kb-row">
                    <span className="key">D</span><span>→</span><span className="hin">क</span>
                    <span className="key">S</span><span>→</span><span className="hin">ख</span>
                    <span className="key">A</span><span>→</span><span className="hin">ग</span>
                    <span className="key">F</span><span>→</span><span className="hin">घ</span>
                    <span className="key">G</span><span>→</span><span className="hin">ङ</span>
                  </div>
                  <div className="kb-row">
                    <span className="key">H</span><span>→</span><span className="hin">च</span>
                    <span className="key">J</span><span>→</span><span className="hin">छ</span>
                    <span className="key">K</span><span>→</span><span className="hin">ज</span>
                    <span className="key">L</span><span>→</span><span className="hin">झ</span>
                    <span className="key">;</span><span>→</span><span className="hin">ञ</span>
                  </div>
                  <div className="kb-row">
                    <span className="key">Z</span><span>→</span><span className="hin">ट</span>
                    <span className="key">X</span><span>→</span><span className="hin">ठ</span>
                    <span className="key">C</span><span>→</span><span className="hin">ड</span>
                    <span className="key">V</span><span>→</span><span className="hin">ढ</span>
                    <span className="key">B</span><span>→</span><span className="hin">ण</span>
                  </div>
                  <div className="kb-row">
                    <span className="key">N</span><span>→</span><span className="hin">त</span>
                    <span className="key">M</span><span>→</span><span className="hin">थ</span>
                    <span className="key">,</span><span>→</span><span className="hin">द</span>
                    <span className="key">.</span><span>→</span><span className="hin">ध</span>
                    <span className="key">/</span><span>→</span><span className="hin">न</span>
                  </div>
                  <div className="kb-row">
                    <span className="key">Q</span><span>→</span><span className="hin">ु</span>
                    <span className="key">W</span><span>→</span><span className="hin">ू</span>
                    <span className="key">E</span><span>→</span><span className="hin">े</span>
                    <span className="key">R</span><span>→</span><span className="hin">ो</span>
                    <span className="key">T</span><span>→</span><span className="hin">ौ</span>
                  </div>
                </div>
                <p className="guide-note">
                  💡 <strong>Tip:</strong> Shift + Key for capital letters / matras
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Duration Selector */}
        {showDurationSelector && !isExerciseMode && !testActive && (
          <div className="duration-selector">
            <FiSettings className="selector-icon" />
            <h3>Select the time for test</h3>
            <div className="duration-options">
              {[30, 60, 120, 180, 300].map(dur => (
                <button
                  key={dur}
                  className={`duration-btn ${selectedDuration === dur ? 'active' : ''}`}
                  onClick={() => setSelectedDuration(dur)}
                >
                  {dur >= 60 ? `${dur / 60} Minute${dur > 60 ? 's' : ''}` : `${dur} Seconds`}
                </button>
              ))}
            </div>
            <button className="start-random-btn" onClick={startTest}>
              Start random test
            </button>
          </div>
        )}
        
        {/* Test Interface */}
        {(!showDurationSelector || isExerciseMode) && (
          <>
            {/* Top Bar with Timer and Controls */}
            <div className="test-top-bar">
              <div className="timer-box">
                <FiClock className="timer-icon" />
                <div className="timer-value">{formatTime(timeLeft)}</div>
              </div>
              
              <div className="action-buttons">
                {!testActive && (
                  <button className="start-btn" onClick={startTest}>
                    <FiPlay /> Start
                  </button>
                )}
                
                {testActive && !testPaused && (
                  <button className="pause-btn" onClick={pauseTest}>
                    <FiPause /> Pause
                  </button>
                )}
                
                {testActive && testPaused && (
                  <button className="resume-btn" onClick={resumeTest}>
                    <FiPlay /> Resume
                  </button>
                )}
                
                {testActive && (
                  <button className="stop-btn" onClick={stopTest}>
                    <FiSquare /> Stop
                  </button>
                )}
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="stats-row">
              <div className="stat-item">
                <FiZap className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">WPM</span>
                  <span className="stat-value">{wpm}</span>
                </div>
              </div>
              <div className="stat-item">
                <FiTarget className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">Accuracy</span>
                  <span className="stat-value">{accuracy}%</span>
                </div>
              </div>
              <div className="stat-item">
                <FiAlertCircle className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">Mistakes</span>
                  <span className="stat-value">{mistakes}</span>
                </div>
              </div>
              <div className="stat-item">
                <FiClock className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">Progress</span>
                  <span className="stat-value">{text.length > 0 ? Math.round((userInput.length / text.length) * 100) : 0}%</span>
                </div>
              </div>
            </div>
            
            {/* Horizontal Split Screen */}
            <div className={`horizontal-split ${isHindi ? 'hindi-mode' : ''}`}>
              {/* Left Panel - Text to Type */}
              <div className="text-panel">
                <div className="panel-header">
                  <h3>📝 Text to Type</h3>
                  <span className="char-count">{text.length} characters</span>
                </div>
                <div className="text-content" ref={contentRef}>
                  <div className="reference-text">
                    {renderText()}
                  </div>
                </div>
              </div>
              
              {/* Right Panel - Typing Area */}
              <div className="typing-panel">
                <div className="panel-header">
                  <h3>⌨️ Your Input</h3>
                  <span className="input-stats">
                    {userInput.length} / {text.length} characters
                    {backspaceCount > 0 && <span className="backspace-count"> | ⌫ {backspaceCount}</span>}
                  </span>
                </div>
                
                {isHindi ? (
                  <div className="hindi-typing-container">
                    <div className="hindi-output-area">
                      <div className="hindi-text-display">
                        {userInput || <span className="placeholder">Type on English keyboard...</span>}
                        {testActive && !testPaused && <span className="cursor">|</span>}
                      </div>
                    </div>
                    <textarea
                      ref={textAreaRef}
                      className="hindi-input-hidden"
                      value={rawInput}
                      onChange={handleHindiInput}
                      onKeyDown={handleKeyDown}
                      disabled={!testActive || testPaused}
                      autoFocus
                      placeholder=""
                    />
                  </div>
                ) : (
                  <textarea
                    ref={textAreaRef}
                    className="typing-textarea"
                    value={userInput}
                    onChange={handleEnglishInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Type here..."
                    disabled={!testActive || testPaused}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>
      
      <ResultModal
        isOpen={showResultModal}
        onClose={() => {
          setShowResultModal(false);
          setUserInput('');
          setRawInput('');
          setWpm(0);
          setAccuracy(0);
          setMistakes(0);
          setCorrectChars(0);
          setBackspaceCount(0);
          setLastInputLength(0);
          setCurrentCharIndex(0);
          setTotalPausedTime(0);
          setStartTime(null);
          setTestActive(false);
          setTestPaused(false);
          setTimeLeft(currentExercise?.duration || selectedDuration);
          setShowDurationSelector(!isExerciseMode);
          
          if (!isExerciseMode && !currentExercise) {
            generateRandomText();
          }
        }}
        results={testResults}
      />
    </>
  );
};

export default TypingTest;