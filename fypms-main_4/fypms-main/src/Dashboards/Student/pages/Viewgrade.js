import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStudentGrades } from '../../../Services/gradeService';

const ViewGrades = ({ rollNumber }) => {
  const [studentGrades, setStudentGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const data = await getStudentGrades(rollNumber);
        setStudentGrades(data);
      } catch (error) {
        console.error('Error fetching grades:', error);
        toast.error('Error fetching grades');
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="student-grades">
      <ToastContainer />
      <h1>My Grades</h1>
      {studentGrades.length === 0 ? (
        <p>No grades available</p>
      ) : (
        <div className='grade-list'>
          {studentGrades.map((grade) => (
            <div key={grade._id} className="grade-item">
              <p>Name: {grade.name}</p>
              <p>Roll No: {grade.rollNumber}</p>
              <p>Session: {grade.session}</p>
              <p>Deliverable 1: {grade.del1}</p>
              <p>Deliverable 2: {grade.del2}</p>
              <p>Final: {grade.del3}</p>
              <p>Total: {Number(grade.del1) + Number(grade.del2) + Number(grade.del3)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewGrades;
