import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addGrade, getGrades, updateGrade, deleteGrade } from '../services/gradeService'; // Adjust the path if needed
import './GradeList.css'; 

const GradingSystem = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
      name: '',
      rollNumber: '',
      session: '',
      del1: '',
      del2: '',
      del3: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentStudentId, setCurrentStudentId] = useState(null);
  
    useEffect(() => {
      const fetchGrades = async () => {
        try {
          const data = await getGrades();
          setStudents(data);
        } catch (error) {
          console.error('Error fetching grades:', error);
        }
      };
  
      fetchGrades();
    }, []);
  
    // Handle input changes for new student
    const handleNewStudentChange = (e) => {
      const { name, value } = e.target;
      setNewStudent({
        ...newStudent,
        [name]: value,
      });
    };
  
    // Add or Edit student
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      
      // Validate grade limits
      if (newStudent.del1 > 25 || newStudent.del2 > 25 || newStudent.del3 > 50) {
        alert('Invalid grades: Deliverable 1 and 2 should not exceed 25, Final should not exceed 50');
        return;
      }
  
      try {
        if (!isEditing) {
          const addedGrade = await addGrade(newStudent);
          setStudents([...students, addedGrade]);
          toast.success('Student successfully entered!');
        } else {
          const updatedGrade = await updateGrade(currentStudentId, newStudent);
          setStudents(students.map(student => 
            student._id === currentStudentId ? updatedGrade : student
          ));
          setIsEditing(false);  
          setCurrentStudentId(null);
        }
  
        // Reset the input fields
        setNewStudent({
          name: '',
          rollNumber: '',
          session: '',
          del1: '',
          del2: '',
          del3: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response && error.response.status === 400) {
          toast.error('Roll number already exists');
        } else {
          toast.error('Error submitting form');
        }
      }
    };
  
    // Edit student
    const editStudent = (id) => {
      const studentToEdit = students.find(student => student._id === id);
      setNewStudent({
        name: studentToEdit.name,
        rollNumber: studentToEdit.rollNumber,
        session: studentToEdit.session,
        del1: studentToEdit.del1,
        del2: studentToEdit.del2,
        del3: studentToEdit.del3,
      });
      setIsEditing(true);
      setCurrentStudentId(id);
    };
  
    // Remove student
    const removeStudent = async (id) => {
      try {
        await deleteGrade(id);
        setStudents(students.filter(student => student._id !== id));
        toast.success('Student successfully removed!');
      } catch (error) {
        console.error('Error deleting grade:', error);
        toast.error('Error deleting grade');
      }
    };
  
    // Calculate total grade for a student
    const calculateTotal = (student) => {
      const { del1, del2, del3 } = student;
      return Number(del1) + Number(del2) + Number(del3);
    };
  
    // Calculate letter grade based on total
    const calculateLetterGrade = (total) => {
      if (total < 50) return 'F';
      if (total <= 60) return 'C';
      if (total <= 70) return 'B';
      if (total <= 80) return 'A';
      if (total >= 90) return 'A+';
      return '';
    };
  
    return (
      <div className="grading-system">
        <ToastContainer />
        <h1>Grading System</h1>
        <form className='grading_form' onSubmit={handleFormSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter Student Name"
              value={newStudent.name}
              onChange={handleNewStudentChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="rollNumber"
              placeholder="Enter Roll Number"
              value={newStudent.rollNumber}
              onChange={handleNewStudentChange}
              required
              disabled={isEditing} // Disable roll number input when editing
            />
          </div>
          <div>
            <select
              name="session"
              value={newStudent.session}
              onChange={handleNewStudentChange}
              required
            >
              <option value="" disabled>Select Session</option>
              <option value="2020-2024">2020-2024</option>
              <option value="2021-2025">2021-2025</option>
              <option value="2022-2026">2022-2026</option>
              <option value="2023-2027">2023-2027</option>
            </select>
          </div>
          <div className='grading_input'>
            <input
              type="number"
              name="del1"
              placeholder="Enter Deliverable 1 Grades"
              value={newStudent.del1}
              onChange={handleNewStudentChange}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="del2"
              placeholder="Enter Deliverable 2 Grades"
              value={newStudent.del2}
              onChange={handleNewStudentChange}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="del3"
              placeholder="Enter Final Grades"
              value={newStudent.del3}
              onChange={handleNewStudentChange}
              required
            />
          </div>
          <button type="submit">{isEditing ? 'Update Student' : 'Add Student'}</button>
        </form>
  
        <h2>Student Grades</h2>
      
        <div className='student-item-main'>
          {students.map((student) => {
            const total = calculateTotal(student);
            const grade = calculateLetterGrade(total);
            return (
              <div key={student._id} className="student-item">
                <div className='grade list'>
                  <li>Name: {student.name}</li>
                  <li> Roll No: {student.rollNumber}</li>
                  <li> Session: {student.session}</li>
                  <li> Deliverable 1: {student.del1}</li>
                  <li>Deliverable 2: {student.del2}</li>
                  <li>Final: {student.del3}</li>
                  <li>Total: {total}</li>
                  <li>Grade: {grade}</li>
                </div>
                <button onClick={() => editStudent(student._id)}>Edit</button>
                <button onClick={() => removeStudent(student._id)}>Remove</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default GradingSystem;
