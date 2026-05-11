import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { FiTrendingUp, FiTarget, FiCalendar, FiActivity } from 'react-icons/fi';
import './Statistics.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Statistics = () => {
  const [stats, setStats] = useState({
    totalTests: 0,
    bestWPM: 0,
    averageWPM: 0,
    bestAccuracy: 0,
    averageAccuracy: 0,
    totalCharacters: 0,
    totalTime: 0,
    wpmData: [],
    weeklyData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('https://nextype-backend.onrender.com/api/tests/statistics');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      // Fallback data
      setStats({
        totalTests: 24,
        bestWPM: 85,
        averageWPM: 62,
        bestAccuracy: 98,
        averageAccuracy: 91,
        totalCharacters: 12500,
        totalTime: 7200,
        wpmData: [
          { date: '2024-01-01', wpm: 45 },
          { date: '2024-01-08', wpm: 52 },
          { date: '2024-01-15', wpm: 58 },
          { date: '2024-01-22', wpm: 65 },
          { date: '2024-01-29', wpm: 72 }
        ],
        weeklyData: [
          { week: 'Week 1', averageWPM: 48, averageAccuracy: 85 },
          { week: 'Week 2', averageWPM: 55, averageAccuracy: 88 },
          { week: 'Week 3', averageWPM: 62, averageAccuracy: 91 },
          { week: 'Week 4', averageWPM: 68, averageAccuracy: 93 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const wpmChartData = {
    labels: stats.wpmData.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'WPM Progress',
        data: stats.wpmData.map(d => d.wpm),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const weeklyChartData = {
    labels: stats.weeklyData.map(d => d.week),
    datasets: [
      {
        label: 'Average WPM',
        data: stats.weeklyData.map(d => d.averageWPM),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: '#667eea',
        borderWidth: 2,
      },
      {
        label: 'Average Accuracy (%)',
        data: stats.weeklyData.map(d => d.averageAccuracy),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#10b981',
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          usePointStyle: true,
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(203, 213, 225, 0.1)',
        },
        ticks: {
          color: '#cbd5e1',
        }
      },
      x: {
        grid: {
          color: 'rgba(203, 213, 225, 0.1)',
        },
        ticks: {
          color: '#cbd5e1',
        }
      }
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <motion.div className="statistics" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="statistics-header">
        <h1 className="page-title">
          <FiTrendingUp /> Statistics
        </h1>
        <p className="subtitle">Track your typing progress and performance</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <FiActivity />
          <div className="stat-info">
            <span className="stat-label">Total Tests</span>
            <span className="stat-value">{stats.totalTests}</span>
          </div>
        </div>
        <div className="stat-card">
          <FiTrendingUp />
          <div className="stat-info">
            <span className="stat-label">Best WPM</span>
            <span className="stat-value">{stats.bestWPM}</span>
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
          <FiCalendar />
          <div className="stat-info">
            <span className="stat-label">Total Practice</span>
            <span className="stat-value">{formatTime(stats.totalTime)}</span>
          </div>
        </div>
        <div className="stat-card">
          <FiActivity />
          <div className="stat-info">
            <span className="stat-label">Characters Typed</span>
            <span className="stat-value">{(stats.totalCharacters / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>WPM Progress Over Time</h3>
          {loading ? (
            <div className="loading">Loading charts...</div>
          ) : (
            <Line data={wpmChartData} options={chartOptions} />
          )}
        </div>

        <div className="chart-card">
          <h3>Weekly Performance</h3>
          {loading ? (
            <div className="loading">Loading charts...</div>
          ) : (
            <Bar data={weeklyChartData} options={chartOptions} />
          )}
        </div>
      </div>

      <div className="insights-section">
        <h3>Performance Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <span className="insight-icon">📈</span>
            <div>
              <h4>Improvement Rate</h4>
              <p>
                {stats.wpmData.length > 1 && 
                  `+${stats.wpmData[stats.wpmData.length - 1].wpm - stats.wpmData[0].wpm} WPM overall`
                }
              </p>
            </div>
          </div>
          <div className="insight-card">
            <span className="insight-icon">🎯</span>
            <div>
              <h4>Consistency Score</h4>
              <p>
                {stats.averageAccuracy > 90 ? 'Excellent' : stats.averageAccuracy > 80 ? 'Good' : 'Needs Improvement'}
              </p>
            </div>
          </div>
          <div className="insight-card">
            <span className="insight-icon">⚡</span>
            <div>
              <h4>Peak Performance</h4>
              <p>{stats.bestWPM} WPM best score</p>
            </div>
          </div>
          <div className="insight-card">
            <span className="insight-icon">📊</span>
            <div>
              <h4>Practice Streak</h4>
              <p>{Math.ceil(stats.totalTime / 3600)}+ hours practiced</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Statistics;