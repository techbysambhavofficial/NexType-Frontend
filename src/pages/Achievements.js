import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiLock, FiUnlock, FiAward } from 'react-icons/fi';
import './Achievements.scss';

const Achievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get('https://nextype-backend.onrender.com/api/users/achievements');
      setAchievements(response.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      // Fallback achievements
      setAchievements([
        { id: 'first_test', name: 'First Step', description: 'Complete your first typing test', icon: '🎯', requirement: 'Complete 1 test', unlocked: user?.achievements?.includes('first_test') || false },
        { id: 'speed_30', name: 'Getting There', description: 'Achieve 30 WPM', icon: '⚡', requirement: 'Reach 30 WPM', unlocked: user?.achievements?.includes('speed_30') || false },
        { id: 'speed_60', name: 'Speed Demon', description: 'Achieve 60 WPM', icon: '🚀', requirement: 'Reach 60 WPM', unlocked: user?.achievements?.includes('speed_60') || false },
        { id: 'speed_100', name: 'Elite Typist', description: 'Achieve 100 WPM', icon: '🏆', requirement: 'Reach 100 WPM', unlocked: user?.achievements?.includes('speed_100') || false },
        { id: 'accuracy_95', name: 'Precision Master', description: 'Achieve 95% accuracy', icon: '🎯', requirement: '95% accuracy', unlocked: user?.achievements?.includes('accuracy_95') || false },
        { id: 'accuracy_100', name: 'Perfect', description: 'Achieve 100% accuracy', icon: '⭐', requirement: 'Perfect accuracy', unlocked: user?.achievements?.includes('accuracy_100') || false },
        { id: 'marathon_10', name: 'Consistent', description: 'Complete 10 tests', icon: '📊', requirement: '10 tests completed', unlocked: user?.achievements?.includes('marathon_10') || false },
        { id: 'marathon_50', name: 'Dedicated', description: 'Complete 50 tests', icon: '🔥', requirement: '50 tests completed', unlocked: user?.achievements?.includes('marathon_50') || false },
        { id: 'marathon_100', name: 'Typing Legend', description: 'Complete 100 tests', icon: '👑', requirement: '100 tests completed', unlocked: user?.achievements?.includes('marathon_100') || false },
        { id: 'perfect_game', name: 'Flawless Victory', description: 'Complete a test with zero mistakes', icon: '💯', requirement: 'No mistakes in a test', unlocked: user?.achievements?.includes('perfect_game') || false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <motion.div className="achievements" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="achievements-header">
        <h1 className="page-title">
          <FiAward /> Achievements
        </h1>
        <div className="progress-summary">
          <div className="progress-stats">
            <span className="count">{unlockedCount}</span>
            <span className="total">/{totalCount}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
          <p>{Math.round((unlockedCount / totalCount) * 100)}% Complete</p>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading achievements...</div>
      ) : (
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <div className="achievement-icon">
                {achievement.icon}
                {!achievement.unlocked && <FiLock className="lock-icon" />}
              </div>
              <div className="achievement-info">
                <h3>{achievement.name}</h3>
                <p>{achievement.description}</p>
                <div className="requirement">
                  <span>Requirement: {achievement.requirement}</span>
                </div>
              </div>
              {achievement.unlocked && (
                <div className="unlocked-badge">
                  <FiUnlock />
                  <span>Unlocked</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Achievements;