import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiSave, FiVolume2, FiVolumeX, FiMonitor, FiSun, FiMoon, FiTrash2, FiDownload } from 'react-icons/fi';
import './Settings.scss';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState({
    soundEnabled: true,
    theme: 'dark',
    difficulty: 'medium',
    testDuration: 60
  });
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setSettings(user.settings || settings);
      setUsername(user.username || '');
    }
  }, [user]);

  const updateSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.put('https://nextype-backend.onrender.com/api/users/settings', { settings });
      updateUser({ settings: response.data.settings });
      toast.success('Settings saved successfully!');
      applyTheme(settings.theme);
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (username === user?.username) return;
    
    setLoading(true);
    try {
      const response = await axios.put('https://nextype-backend.onrender.com/api/users/profile', { username });
      updateUser({ username: response.data.username });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  const exportData = async () => {
    try {
      const response = await axios.get('https://nextype-backend.onrender.com/api/users/export-data');
      const dataStr = JSON.stringify(response.data, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nextype_data_${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    }
  };

  const clearData = async () => {
    if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone!')) {
      try {
        await axios.delete('https://nextype-backend.onrender.com/api/users/clear-data');
        toast.success('All data cleared successfully');
        setTimeout(() => window.location.reload(), 1500);
      } catch (error) {
        console.error('Error clearing data:', error);
        toast.error('Failed to clear data');
      }
    }
  };

  return (
    <motion.div className="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="settings-header">
        <h1 className="page-title">Settings</h1>
        <p className="subtitle">Customize your typing experience</p>
      </div>

      <div className="settings-container">
        <div className="settings-section">
          <h2>Profile Settings</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                placeholder="Email address"
              />
              <small>Email cannot be changed</small>
            </div>
            <button 
              className="save-btn" 
              onClick={updateProfile}
              disabled={loading || username === user?.username}
            >
              <FiSave /> Update Profile
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>Sound Effects</label>
              <button 
                className={`toggle-btn ${settings.soundEnabled ? 'active' : ''}`}
                onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
              >
                {settings.soundEnabled ? <FiVolume2 /> : <FiVolumeX />}
                {settings.soundEnabled ? 'Sound On' : 'Sound Off'}
              </button>
            </div>

            <div className="form-group">
              <label>Theme</label>
              <div className="theme-options">
                <button 
                  className={`theme-btn ${settings.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => setSettings({ ...settings, theme: 'dark' })}
                >
                  <FiMoon /> Dark
                </button>
                <button 
                  className={`theme-btn ${settings.theme === 'light' ? 'active' : ''}`}
                  onClick={() => setSettings({ ...settings, theme: 'light' })}
                >
                  <FiSun /> Light
                </button>
                <button 
                  className={`theme-btn ${settings.theme === 'neon' ? 'active' : ''}`}
                  onClick={() => setSettings({ ...settings, theme: 'neon' })}
                >
                  <FiMonitor /> Neon
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Default Difficulty</label>
              <select 
                value={settings.difficulty}
                onChange={(e) => setSettings({ ...settings, difficulty: e.target.value })}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div className="form-group">
              <label>Test Duration (seconds)</label>
              <select 
                value={settings.testDuration}
                onChange={(e) => setSettings({ ...settings, testDuration: parseInt(e.target.value) })}
              >
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={120}>2 minutes</option>
                <option value={180}>3 minutes</option>
                <option value={300}>5 minutes</option>
              </select>
            </div>

            <button 
              className="save-btn" 
              onClick={updateSettings}
              disabled={loading}
            >
              <FiSave /> Save Preferences
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h2>Data Management</h2>
          <div className="settings-form">
            <div className="action-buttons">
              <button className="export-btn" onClick={exportData}>
                <FiDownload /> Export All Data
              </button>
              <button className="clear-btn" onClick={clearData}>
                <FiTrash2 /> Clear All Data
              </button>
            </div>
            <div className="warning-message">
              <strong>⚠️ Warning:</strong> Clearing your data will permanently delete all your test history and statistics.
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>About NexType</h2>
          <div className="about-content">
            <p>Version 1.0.0</p>
            <p>Made with ❤️ by Tech@Sambhav</p>
            <p>NexType - The Future of Typing</p>
            <div className="stats-badge">
              <span>Total Users: 1,000+</span>
              <span>Tests Completed: 10,000+</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;