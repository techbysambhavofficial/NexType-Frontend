import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FiActivity, FiZap, FiTarget, FiClock, FiTrendingUp, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentTests, setRecentTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentTests();
  }, []);

  const fetchRecentTests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tests/history?limit=5');
      setRecentTests(response.data.tests);
    } catch (error) {
      console.error('Error fetching recent tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: FiActivity, label: 'Total Tests', value: user?.stats?.totalTests || 0, color: '#667eea', change: '+12%' },
    { icon: FiZap, label: 'Best WPM', value: user?.stats?.bestWPM || 0, color: '#f59e0b', change: '+5%' },
    { icon: FiTarget, label: 'Avg Accuracy', value: `${user?.stats?.averageAccuracy || 0}%`, color: '#10b981', change: '+2%' },
    { icon: FiClock, label: 'Practice Time', value: `${Math.floor((user?.stats?.totalTime || 0) / 3600)}h`, color: '#ef4444', change: '+8h' },
  ];

  const achievementCount = user?.achievements?.length || 0;

  return (
    <motion.div className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Welcome back, {user?.username}!</h1>
          <p className="page-subtitle">Ready to improve your typing skills today?</p>
        </div>
        <motion.button 
          className="quick-test-btn"
          onClick={() => navigate('/test')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiZap /> Start Quick Test
        </motion.button>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <stat.icon className="stat-icon" style={{ color: stat.color }} />
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
              <span className="stat-change" style={{ color: stat.color }}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="recent-section">
          <h2>
            <FiTrendingUp />
            Recent Tests
          </h2>
          <div className="tests-list">
            {loading ? (
              <div className="loading">Loading...</div>
            ) : recentTests.length === 0 ? (
              <div className="empty-state">
                <p>No tests taken yet</p>
                <button onClick={() => navigate('/test')}>Take your first test</button>
              </div>
            ) : (
              recentTests.map((test, index) => (
                <motion.div
                  key={test._id}
                  className="test-item"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="test-info">
                    <div className="test-wpm">{test.wpm} WPM</div>
                    <div className="test-accuracy">{test.accuracy}% accuracy</div>
                  </div>
                  <div className="test-meta">
                    <span>{new Date(test.createdAt).toLocaleDateString()}</span>
                    <span>{test.duration}s</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className="achievements-preview">
          <h2>
            <FiAward />
            Achievements
          </h2>
          <div className="achievements-stats">
            <div className="achievement-count">
              <span className="count">{achievementCount}</span>
              <span className="total">/12</span>
              <span className="label">Achievements Unlocked</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(achievementCount / 12) * 100}%` }}
              />
            </div>
            <button 
              className="view-all-btn"
              onClick={() => navigate('/achievements')}
            >
              View All Achievements
            </button>
          </div>
        </div>
      </div>

      <div className="tips-section">
        <h3>💡 Pro Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">👆</span>
            <p>Keep your fingers on the home row keys (ASDF JKL;)</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🎯</span>
            <p>Focus on accuracy first, speed will follow naturally</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">⏱️</span>
            <p>Practice for at least 15 minutes daily for best results</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;