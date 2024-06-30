import React, { useState } from 'react';
import axios from 'axios';

const AddGrade = ({ onGradeAdded }) => {
  const [newGrade, setNewGrade] = useState({
    rollNumber: '',
    name: '',
    grade: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGrade({ ...newGrade, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/student/grades', newGrade);
      onGradeAdded(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Grade</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={newGrade.rollNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newGrade.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={newGrade.grade}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>Add Grade</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default AddGrade;
