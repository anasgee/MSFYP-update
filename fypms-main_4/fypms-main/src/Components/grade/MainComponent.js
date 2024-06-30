// src/App.js
import React, { useState } from "react";
import StudentList from "./StudentsList";
import UpdateGrades from "./UpdateGrades";
import ViewGrades from "./ViewGrades";

const MainComponent = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div>
      <StudentList onSelectStudent={handleSelectStudent} />
      {selectedStudent && (
        <div>
          <UpdateGrades student={selectedStudent} />
          <ViewGrades student={selectedStudent} />
        </div>
      )}
    </div>
  );
};

export default MainComponent;
