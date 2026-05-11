import englishExercises from '../data/english-exercises.json';
import hindiKurtiDevExercises from '../data/hindi-kurtidev-exercises.json';
import hindiMangalExercises from '../data/hindi-mangal-exercises.json';

// Cache for loaded exercises
const exerciseCache = {
  english: null,
  hindi: {
    kurtiDev: null,
    mangal: null
  }
};

export const loadExercises = (language, font = null) => {
  if (language === 'english') {
    if (!exerciseCache.english) {
      // Generate 350 exercises from template
      exerciseCache.english = generateExercises(englishExercises, 350);
    }
    return exerciseCache.english;
  } else if (language === 'hindi') {
    if (font === 'kurti-dev') {
      if (!exerciseCache.hindi.kurtiDev) {
        exerciseCache.hindi.kurtiDev = generateExercises(hindiKurtiDevExercises, 350);
      }
      return exerciseCache.hindi.kurtiDev;
    } else if (font === 'mangal') {
      if (!exerciseCache.hindi.mangal) {
        exerciseCache.hindi.mangal = generateExercises(hindiMangalExercises, 350);
      }
      return exerciseCache.hindi.mangal;
    }
  }
  return [];
};

// Generate multiple exercises from templates
const generateExercises = (templateData, totalCount) => {
  const exercises = [];
  const templates = templateData.exercises;
  
  for (let i = 1; i <= totalCount; i++) {
    const template = templates[i % templates.length];
    const newExercise = {
      ...template,
      id: i,
      title: `${template.title.split(' ')[0]} ${i}`,
      content: template.content + `\n\n`
    };
    exercises.push(newExercise);
  }
  
  return exercises;
};

// Get exercise by ID
export const getExerciseById = (language, font, exerciseId) => {
  const exercises = loadExercises(language, font);
  return exercises.find(ex => ex.id === parseInt(exerciseId));
};

// Get total count
export const getTotalExercises = (language, font = null) => {
  const exercises = loadExercises(language, font);
  return exercises.length;
};