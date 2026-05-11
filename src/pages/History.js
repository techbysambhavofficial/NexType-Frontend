import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiCalendar, FiActivity, FiTarget, FiClock, FiDownload } from 'react-icons/fi';
import './History.scss';

const History = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    averageWPM: 0,
    averageAccuracy: 0,
    bestWPM: 0
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('https://nextype-backend.onrender.com/api/tests/history?limit=50');
      setTests(response.data.tests);
      calculateStats(response.data.tests);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (testData) => {
    if (testData.length === 0) return;
    
    const total = testData.length;
    const totalWPM = testData.reduce((sum, test) => sum + test.wpm, 0);
    const totalAccuracy = testData.reduce((sum, test) => sum + test.accuracy, 0);
    const bestWPM = Math.max(...testData.map(test => test.wpm));
    
    setStats({
      total,
      averageWPM: Math.round(totalWPM / total),
      averageAccuracy: Math.round(totalAccuracy / total),
      bestWPM
    });
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(tests, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nextype_history_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPerformanceColor = (wpm) => {
    if (wpm >= 100) return '#10b981';
    if (wpm >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <motion.div className="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="history-header">
        <h1 className="page-title">Test History</h1>
        <button className="export-btn" onClick={exportHistory}>
          <FiDownload /> Export Data
        </button>
      </div>

      <div className="stats-summary">
        <div className="stat-card">
          <FiActivity />
          <div className="stat-info">
            <span className="stat-label">Total Tests</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>
        <div className="stat-card">
          <FiTarget />
          <div className="stat-info">
            <span className="stat-label">Avg WPM</span>
            <span className="stat-value">{stats.averageWPM}</span>
          </div>
        </div>
        <div className="stat-card">
          <FiTarget />
          <div className="stat-info">
            <span className="stat-label">Avg Accuracy</span>
            <span className="stat-value">{stats.averageAccuracy}%</span>
          </div>
        </div>
        <div className="stat-card">
          <FiActivity />
          <div className="stat-info">
            <span className="stat-label">Best WPM</span>
            <span className="stat-value">{stats.bestWPM}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading history...</div>
      ) : tests.length === 0 ? (
        <div className="empty-state">
          <p>No tests taken yet</p>
          <button onClick={() => window.location.href = '/test'}>Take your first test</button>
        </div>
      ) : (
        <div className="tests-table-container">
          <table className="tests-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>WPM</th>
                <th>Accuracy</th>
                <th>Duration</th>
                <th>Mistakes</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <motion.tr
                  key={test._id || index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <td>
                    <FiCalendar />
                    {new Date(test.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <span className="wpm-value" style={{ color: getPerformanceColor(test.wpm) }}>
                      {test.wpm}
                    </span>
                  </td>
                  <td>
                    <div className="accuracy-bar">
                      <div className="accuracy-fill" style={{ width: `${test.accuracy}%` }} />
                      <span>{test.accuracy}%</span>
                    </div>
                  </td>
                  <td>
                    <FiClock />
                    {test.duration}s
                  </td>
                  <td>{test.mistakes}</td>
                  <td>
                    <span className={`difficulty-badge ${test.difficulty}`}>
                      {test.difficulty}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default History;
