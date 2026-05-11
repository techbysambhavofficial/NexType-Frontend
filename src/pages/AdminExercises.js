// frontend/src/pages/AdminExercises.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AdminExercises.scss';

const AdminExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [editingExercise, setEditingExercise] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'words',
    difficulty: 'intermediate',
    text: '',
    duration: 60,
    icon: '📖',
    order: 0
  });

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/exercises?limit=100');
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      toast.error('Failed to load exercises');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExercise) {
        await axios.put(`http://localhost:5000/api/exercises/${editingExercise._id}`, formData);
        toast.success('Exercise updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/exercises', formData);
        toast.success('Exercise created successfully');
      }
      fetchExercises();
      resetForm();
    } catch (error) {
      console.error('Error saving exercise:', error);
      toast.error('Failed to save exercise');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        await axios.delete(`http://localhost:5000/api/exercises/${id}`);
        toast.success('Exercise deleted successfully');
        fetchExercises();
      } catch (error) {
        console.error('Error deleting exercise:', error);
        toast.error('Failed to delete exercise');
      }
    }
  };

  const resetForm = () => {
    setEditingExercise(null);
    setFormData({
      name: '',
      description: '',
      category: 'words',
      difficulty: 'intermediate',
      text: '',
      duration: 60,
      icon: '📖',
      order: 0
    });
  };

  return (
    <div className="admin-exercises">
      <h1>Manage Exercises</h1>
      
      <form onSubmit={handleSubmit} className="exercise-form">
        <h2>{editingExercise ? 'Edit Exercise' : 'Add New Exercise'}</h2>
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="home_row">Home Row</option>
              <option value="top_row">Top Row</option>
              <option value="bottom_row">Bottom Row</option>
              <option value="numbers">Numbers</option>
              <option value="symbols">Symbols</option>
              <option value="words">Words</option>
              <option value="code">Code</option>
              <option value="quotes">Quotes</option>
              <option value="speed">Speed</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Duration (seconds)</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Exercise Text</label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData({...formData, text: e.target.value})}
            rows="4"
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingExercise ? 'Update' : 'Create'} Exercise
          </button>
          {editingExercise && (
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <div className="exercises-list">
        <h2>Existing Exercises ({exercises.length})</h2>
        <div className="exercises-table">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Name</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise, index) => (
                <tr key={exercise._id}>
                  <td>{exercise.order || index + 1}</td>
                  <td>{exercise.name}</td>
                  <td>{exercise.category}</td>
                  <td>{exercise.difficulty}</td>
                  <td>{exercise.duration}s</td>
                  <td>
                    <button onClick={() => {
                      setEditingExercise(exercise);
                      setFormData(exercise);
                    }}>Edit</button>
                    <button onClick={() => handleDelete(exercise._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminExercises;