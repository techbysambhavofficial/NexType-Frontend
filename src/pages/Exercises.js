import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiClock, FiChevronRight, FiBookOpen, FiFlag, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { loadExercises, getTotalExercises } from '../utils/exerciseLoader';
import './Exercises.scss';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedFont, setSelectedFont] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();

  // Check if coming back from test
  useEffect(() => {
    const hasSelectedExercise = localStorage.getItem('hasSelectedExercise');
    const lastLanguage = localStorage.getItem('lastSelectedLanguage');
    const lastFont = localStorage.getItem('lastSelectedFont');
    
    if (hasSelectedExercise === 'true' && lastLanguage) {
      setSelectedLanguage(lastLanguage);
      if (lastLanguage === 'hindi' && lastFont) {
        setSelectedFont(lastFont);
        loadExercisesData(lastLanguage, lastFont);
      } else if (lastLanguage === 'english') {
        loadExercisesData(lastLanguage);
      }
      // Don't clear the flags immediately, keep them for session
    }
  }, []);

  const loadExercisesData = (language, font = null) => {
    setLoading(true);
    setTimeout(() => {
      const exercisesData = loadExercises(language, font);
      setExercises(exercisesData);
      setFilteredExercises(exercisesData);
      setLoading(false);
      toast.success(`Loaded ${exercisesData.length} ${language} exercises${font ? ` (${font})` : ''}`);
    }, 300);
  };

 const handleLanguageSelect = (language) => {

  // TEMPORARY DISABLE HINDI
  if (language === 'hindi') {
    toast.error('🚧 Hindi Typing Coming Soon...');
    return;
  }

  setSelectedLanguage(language);
  setSelectedFont(null);
  setSearchTerm('');
  setSelectedDifficulty('all');
  
  // Save to localStorage
  localStorage.setItem('lastSelectedLanguage', language);
  localStorage.removeItem('lastSelectedFont');
  
  if (language === 'english') {
    loadExercisesData('english');
  }
};

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    localStorage.setItem('lastSelectedFont', font);
    loadExercisesData('hindi', font);
  };

  const handleBackToLanguages = () => {
    setSelectedLanguage(null);
    setSelectedFont(null);
    setExercises([]);
    setFilteredExercises([]);
    localStorage.removeItem('lastSelectedLanguage');
    localStorage.removeItem('lastSelectedFont');
    localStorage.removeItem('hasSelectedExercise');
  };

  const handleBackToFonts = () => {
    setSelectedFont(null);
    setExercises([]);
    setFilteredExercises([]);
    localStorage.removeItem('lastSelectedFont');
  };

  const filterExercises = () => {
    let filtered = [...exercises];
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(ex => ex.difficulty === selectedDifficulty);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(ex => 
        ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredExercises(filtered);
  };

  useEffect(() => {
    filterExercises();
  }, [searchTerm, selectedDifficulty, exercises]);

  const startExercise = (exercise) => {
    console.log('Starting exercise:', exercise);
    
    const exerciseData = {
      id: exercise.id,
      title: exercise.title,
      description: exercise.description,
      content: exercise.content,
      duration: exercise.duration,
      difficulty: exercise.difficulty,
      language: selectedLanguage,
      font: selectedFont,
      type: 'exercise'
    };
    
    localStorage.setItem('currentExercise', JSON.stringify(exerciseData));
    localStorage.setItem('hasSelectedExercise', 'true');
    
    navigate('/test');
    toast.success(`Loading: ${exercise.title}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      case 'advanced': return '#8b5cf6';
      case 'expert': return '#ec4899';
      default: return '#6b7280';
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const languages = [
    { id: 'english', name: 'English', icon: '🇬🇧', description: 'Practice English typing with 350+ exercises', color: '#3b82f6' },
    { id: 'hindi', name: 'Hindi', icon: '🇮🇳', description: 'Practice Hindi typing with 350+ exercises', color: '#f59e0b' }
  ];

  const hindiFonts = [
    { id: 'kurti-dev', name: 'Kurti Dev', icon: '📝', description: 'Practice with Kurti Dev font (Popular)', color: '#10b981' },
    { id: 'mangal', name: 'Mangal', icon: '✍️', description: 'Practice with Mangal font (Standard)', color: '#8b5cf6' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Difficulties' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'expert', name: 'Expert' },
  ];

  // Language Selection Screen
  if (!selectedLanguage) {
    return (
      <motion.div className="exercises-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="language-selection">
          <h1 className="page-title">Choose Your Language</h1>
          <p className="page-subtitle">Select your preferred language for typing practice</p>
          
          <div className="languages-grid">
            {languages.map(lang => (
              <motion.div
                key={lang.id}
                className="language-card"
                onClick={() => handleLanguageSelect(lang.id)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                style={{ borderColor: lang.color }}
              >
                <div className="language-icon">{lang.icon}</div>
                <h3>{lang.name}</h3>
                <p>{lang.description}</p>
                <div className="exercise-count">{getTotalExercises(lang.id)}+ Exercises</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // Hindi Font Selection Screen
  if (selectedLanguage === 'hindi' && !selectedFont) {
    return (
      <motion.div className="exercises-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="font-selection">
          <button className="back-btn" onClick={handleBackToLanguages}>
            <FiArrowLeft /> Back to Languages
          </button>
          
          <h1 className="page-title">Choose Font Style</h1>
          <p className="page-subtitle">Select Hindi font for typing practice</p>
          
          <div className="fonts-grid">
            {hindiFonts.map(font => (
              <motion.div
                key={font.id}
                className="font-card"
                onClick={() => handleFontSelect(font.id)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                style={{ borderColor: font.color }}
              >
                <div className="font-icon">{font.icon}</div>
                <h3>{font.name}</h3>
                <p>{font.description}</p>
                <div className="exercise-count">{getTotalExercises('hindi', font.id)}+ Exercises</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // Exercises List Screen
  return (
    <motion.div className="exercises-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="exercises-header">
        <div className="header-left">
          <button className="back-btn" onClick={selectedFont ? handleBackToFonts : handleBackToLanguages}>
            <FiArrowLeft /> Back
          </button>
          <div>
            <h1 className="page-title">
              {selectedLanguage === 'english' ? '🇬🇧 English' : `🇮🇳 Hindi (${selectedFont === 'kurti-dev' ? 'Kurti Dev' : 'Mangal'})`} Exercises
            </h1>
            <p className="page-subtitle">
              {filteredExercises.length} of {exercises.length} exercises available
            </p>
          </div>
        </div>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="difficulty-filter">
        {difficulties.map(diff => (
          <button
            key={diff.id}
            className={`difficulty-btn ${selectedDifficulty === diff.id ? 'active' : ''}`}
            onClick={() => setSelectedDifficulty(diff.id)}
          >
            {diff.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          Loading exercises...
        </div>
      ) : filteredExercises.length === 0 ? (
        <div className="empty-state">
          <FiBookOpen className="empty-icon" />
          <h3>No exercises found</h3>
          <p>Try changing your search or filter criteria</p>
        </div>
      ) : (
        <div className="exercises-grid">
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              className="exercise-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: (index % 20) * 0.02 }}
              whileHover={{ y: -5 }}
              onClick={() => startExercise(exercise)}
            >
              <div className="exercise-number">#{exercise.id}</div>
              <div className="exercise-icon">
                {selectedLanguage === 'english' ? '🇬🇧' : '🇮🇳'}
              </div>
              <div className="exercise-info">
                <h3>{exercise.title}</h3>
                <p>{exercise.description}</p>
                <div className="exercise-meta">
                  <span className="difficulty" style={{ color: getDifficultyColor(exercise.difficulty) }}>
                    {exercise.difficulty}
                  </span>
                  <span className="duration">
                    <FiClock /> {formatDuration(exercise.duration)}
                  </span>
                  <span className="type-badge">
                    {exercise.difficulty === 'easy' ? 'Beginner' : 
                     exercise.difficulty === 'medium' ? 'Intermediate' : 
                     exercise.difficulty === 'hard' ? 'Advanced' : 'Expert'}
                  </span>
                </div>
              </div>
              <FiChevronRight className="arrow-icon" />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Exercises;