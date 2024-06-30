// src/components/ViewGrades.js
import React from "react";

const ViewGrades = ({ student }) => {
  return (
    <div>
      <h2>Grades for {student.name}</h2>
      <p>Grade 1 (del1): {student.grades.del1}</p>
      <p>Grade 2 (del2): {student.grades.del2}</p>
      <p>Grade 3 (del3): {student.grades.del3}</p>
      <p>Total Marks: {student.marks}</p>
    </div>
  );
};

export default ViewGrades;
