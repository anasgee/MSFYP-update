import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStudentGrades } from '../../../Services/gradeService';
import "./viewGrades.css"

const ViewGrades = ({ rollNumber }) => {
  console.log(rollNumber)
  const [studentGrades, setStudentGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const data = await getStudentGrades(rollNumber); 
        console.log(data)
        // Assuming userId is the roll number
        setStudentGrades(data);
      } catch (error) {
        console.error('Error fetching grades:', error);
        toast.error('Error fetching grades');
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [rollNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="student-grades">
      <ToastContainer />
      <h1 className='mb-5'>My Grades</h1>
      <div className='grade'>
        <div className='gradeHeading'>
            <p>Name</p>
            <p>Roll No</p>
            <p>Session</p>
            <p>Deliverable 1</p>
            <p>Deliverable 2</p>
            <p>Final Marks</p>
            <p>Total Marks</p>
        </div>
   
      {studentGrades.length === 0 ? (
        <p>No grades available</p>
      ) : (
        <div className="grade-list">
          {studentGrades.map((grade) => (
            <div key={grade._id} className="grade-item">
              
              <p>{grade.name}</p>
              <p>{grade.rollNumber}</p>
              <p> {grade.session}</p>
              <p>{grade.del1}</p>
              <p>{grade.del2}</p>
              <p>{grade.del3}</p>
              <p> {Number(grade.del1) + Number(grade.del2) + Number(grade.del3)}</p>
            </div>
          ))}
        </div>
      )}
         </div>
    </div>
  );
};

export default ViewGrades;