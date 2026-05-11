export const calculateWPM = (correctChars, timeInSeconds) => {
  const words = correctChars / 5;
  const minutes = timeInSeconds / 60;
  return Math.round(words / minutes);
};

export const calculateAccuracy = (correctChars, totalChars) => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }
  
  return 'just now';
};

export const generateRandomText = (difficulty = 'medium') => {
  const texts = {
    easy: [
      "The quick brown fox jumps over the lazy dog.",
      "Practice makes perfect when learning to type.",
      "A simple sentence for beginners to practice.",
    ],
    medium: [
      "Technology has transformed every aspect of modern life. From communication to transportation, digital innovation continues to reshape our world.",
      "Learning to type efficiently is one of the most valuable skills you can develop in the digital age.",
    ],
    hard: [
      "Artificial intelligence and machine learning are revolutionizing how we interact with computers. These technologies are becoming increasingly integrated into everyday applications.",
    ],
    expert: [
      "The integration of blockchain technology into supply chain management has created unprecedented levels of transparency and traceability in modern commerce.",
    ]
  };
  
  const level = texts[difficulty] || texts.medium;
  return level[Math.floor(Math.random() * level.length)];
};

export const getAchievementDetails = (achievementId) => {
  const achievements = {
    first_test: { name: 'First Step', icon: '🎯', description: 'Complete your first typing test' },
    speed_30: { name: 'Getting There', icon: '⚡', description: 'Achieve 30 WPM' },
    speed_60: { name: 'Speed Demon', icon: '🚀', description: 'Achieve 60 WPM' },
    speed_100: { name: 'Elite Typist', icon: '🏆', description: 'Achieve 100 WPM' },
    accuracy_95: { name: 'Precision Master', icon: '🎯', description: 'Achieve 95% accuracy' },
    accuracy_100: { name: 'Perfect', icon: '⭐', description: 'Achieve 100% accuracy' },
    marathon_10: { name: 'Consistent', icon: '📊', description: 'Complete 10 tests' },
    marathon_50: { name: 'Dedicated', icon: '🔥', description: 'Complete 50 tests' },
    marathon_100: { name: 'Typing Legend', icon: '👑', description: 'Complete 100 tests' },
    perfect_game: { name: 'Flawless Victory', icon: '💯', description: 'Complete a test with zero mistakes' },
    code_master: { name: 'Code Warrior', icon: '💻', description: 'Complete 10 code typing tests' },
    legendary: { name: 'Legendary', icon: '🌟', description: 'Achieve 150+ WPM' }
  };
  
  return achievements[achievementId] || { name: 'Unknown', icon: '🏅', description: '' };
};