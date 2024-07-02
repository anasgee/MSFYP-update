// src/components/UpdateGrades.js
import React, { useState } from "react";
import axios from "axios";

const UpdateGrades = ({ student }) => {
  const [grades, setGrades] = useState(student.grades);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrades({ ...grades, [name]: parseInt(value, 10) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/students/${student._id}/grades`, grades);
    alert("Grades updated!");
  };

  return (
    <div>
      <h2>Update Grades for {student.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Grade 1 (del1): </label>
          <input type="number" name="del1" value={grades.del1} onChange={handleInputChange} />
        </div>
        <div>
          <label>Grade 2 (del2): </label>
          <input type="number" name="del2" value={grades.del2} onChange={handleInputChange} />
        </div>
        <div>
          <label>Grade 3 (del3): </label>
          <input type="number" name="del3" value={grades.del3} onChange={handleInputChange} />
        </div>
        <button type="submit">Update Grades</button>
      </form>
    </div>
  );
};

export default UpdateGrades;
