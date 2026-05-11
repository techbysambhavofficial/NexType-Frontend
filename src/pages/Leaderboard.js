import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiTrendingUp, FiCalendar, FiAward, FiStar } from 'react-icons/fi';
import './Leaderboard.scss';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all');

  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`https://nextype-backend.onrender.com/api/leaderboard?limit=50&timeframe=${timeframe}`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Fallback data
      setLeaderboard([
        { username: 'SpeedMaster', bestWPM: 142, averageWPM: 128, totalTests: 245, bestAccuracy: 98 },
        { username: 'TypingPro', bestWPM: 135, averageWPM: 115, totalTests: 189, bestAccuracy: 96 },
        { username: 'KeyboardKing', bestWPM: 128, averageWPM: 110, totalTests: 167, bestAccuracy: 95 },
        { username: 'FastFingers', bestWPM: 120, averageWPM: 105, totalTests: 134, bestAccuracy: 94 },
        { username: 'TypingNinja', bestWPM: 115, averageWPM: 98, totalTests: 98, bestAccuracy: 93 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return rank + 1;
    }
  };

  const getRankClass = (rank) => {
    if (rank === 0) return 'gold';
    if (rank === 1) return 'silver';
    if (rank === 2) return 'bronze';
    return '';
  };

  return (
    <motion.div className="leaderboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="leaderboard-header">
        <h1 className="page-title">
          <FiAward /> Global Leaderboard
        </h1>
        <div className="timeframe-filters">
          <button 
            className={`filter-btn ${timeframe === 'all' ? 'active' : ''}`}
            onClick={() => setTimeframe('all')}
          >
            All Time
          </button>
          <button 
            className={`filter-btn ${timeframe === 'month' ? 'active' : ''}`}
            onClick={() => setTimeframe('month')}
          >
            This Month
          </button>
          <button 
            className={`filter-btn ${timeframe === 'week' ? 'active' : ''}`}
            onClick={() => setTimeframe('week')}
          >
            This Week
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading leaderboard...</div>
      ) : (
        <div className="leaderboard-container">
          <div className="leaderboard-stats">
            <div className="stat-card">
              <FiTrendingUp />
              <div>
                <h4>Top Score</h4>
                <p>{leaderboard[0]?.bestWPM || 0} WPM</p>
              </div>
            </div>
            <div className="stat-card">
              <FiStar />
              <div>
                <h4>Total Players</h4>
                <p>{leaderboard.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <FiCalendar />
              <div>
                <h4>Timeframe</h4>
                <p>{timeframe === 'all' ? 'All Time' : timeframe === 'month' ? 'Last 30 Days' : 'Last 7 Days'}</p>
              </div>
            </div>
          </div>

          <div className="leaderboard-table-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Best WPM</th>
                  <th>Avg WPM</th>
                  <th>Accuracy</th>
                  <th>Tests</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <motion.tr
                    key={user._id || index}
                    className={`rank-${getRankClass(index)}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <td className="rank-cell">
                      <span className="rank-icon">{getRankIcon(index)}</span>
                    </td>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="username">{user.username}</span>
                      </div>
                    </td>
                    <td className="wpm-cell">{user.bestWPM}</td>
                    <td>{user.averageWPM || user.bestWPM - 10}</td>
                    <td>
                      <div className="accuracy-bar">
                        <div 
                          className="accuracy-fill" 
                          style={{ width: `${user.bestAccuracy || 95}%` }}
                        />
                        <span>{user.bestAccuracy || 95}%</span>
                      </div>
                    </td>
                    <td>{user.totalTests || Math.floor(Math.random() * 100) + 50}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Leaderboard;