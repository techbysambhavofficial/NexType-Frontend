export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  EXPERT: 'expert'
};

export const TEST_TYPES = {
  PARAGRAPH: 'paragraph',
  WORDS: 'words',
  CODE: 'code',
  EXERCISE: 'exercise'
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  NEON: 'neon',
  RETRO: 'retro'
};

export const DEFAULT_SETTINGS = {
  soundEnabled: true,
  theme: 'dark',
  difficulty: 'medium',
  testDuration: 60
};

export const ACHIEVEMENTS_LIST = [
  { id: 'first_test', name: 'First Step', icon: '🎯', requirement: 'Complete 1 test' },
  { id: 'speed_30', name: 'Getting There', icon: '⚡', requirement: 'Reach 30 WPM' },
  { id: 'speed_60', name: 'Speed Demon', icon: '🚀', requirement: 'Reach 60 WPM' },
  { id: 'speed_100', name: 'Elite Typist', icon: '🏆', requirement: 'Reach 100 WPM' },
  { id: 'accuracy_95', name: 'Precision Master', icon: '🎯', requirement: '95% accuracy' },
  { id: 'accuracy_100', name: 'Perfect', icon: '⭐', requirement: 'Perfect accuracy' },
  { id: 'marathon_10', name: 'Consistent', icon: '📊', requirement: '10 tests' },
  { id: 'marathon_50', name: 'Dedicated', icon: '🔥', requirement: '50 tests' },
  { id: 'marathon_100', name: 'Legend', icon: '👑', requirement: '100 tests' },
  { id: 'perfect_game', name: 'Flawless', icon: '💯', requirement: 'Zero mistakes' },
  { id: 'code_master', name: 'Code Warrior', icon: '💻', requirement: '10 code tests' },
  { id: 'legendary', name: 'Legendary', icon: '🌟', requirement: '150+ WPM' }
];