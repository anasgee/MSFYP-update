import React, { useState } from 'react';
import axios from 'axios';

const SearchGrades = ({ onGradesFound }) => {
  const [searchRollNumber, setSearchRollNumber] = useState('');
  const [searchPassword, setSearchPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/student/grades/search', {
        rollNumber: searchRollNumber,
        password: searchPassword,
      });
      onGradesFound(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Grades</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={searchRollNumber}
          onChange={(e) => setSearchRollNumber(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={searchPassword}
          onChange={(e) => setSearchPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default SearchGrades;
