import React, { useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [newGrade, setNewGrade] = useState({
    rollNumber: '',
    name: '',
    grade: '',
  });
  const [searchRollNumber, setSearchRollNumber] = useState('');
  const [searchPassword, setSearchPassword] = useState('');
  const [studentGrades, setStudentGrades] = useState([]);
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
      setStudentGrades([...studentGrades, response.data]);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/student/grades/search', {
        rollNumber: searchRollNumber,
        password: searchPassword,
      });
      setStudentGrades(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <div>
        <h2>Add Grade</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="rollNumber" placeholder="Roll Number" value={newGrade.rollNumber} onChange={handleChange} required />
          <input type="text" name="name" placeholder="Name" value={newGrade.name} onChange={handleChange} required />
          <input type="text" name="grade" placeholder="Grade" value={newGrade.grade} onChange={handleChange} required />
          <button type="submit" disabled={loading}>Add Grade</button>
        </form>
      </div>
      <div>
        <h2>Search Grades</h2>
        <form onSubmit={handleSearch}>
          <input type="text" name="rollNumber" placeholder="Roll Number" value={searchRollNumber} onChange={(e) => setSearchRollNumber(e.target.value)} required />
          <input type="password" name="password" placeholder="Password" value={searchPassword} onChange={(e) => setSearchPassword(e.target.value)} required />
          <button type="submit" disabled={loading}>Search</button>
        </form>
      </div>
      {error && <div>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {studentGrades.map((grade) => (
            <div key={grade._id}>
              <p>Name: {grade.name}</p>
              <p>Roll Number: {grade.rollNumber}</p>
              <p>Grade: {grade.grade}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
