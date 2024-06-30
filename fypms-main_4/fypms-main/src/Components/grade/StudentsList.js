import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentList = ({ onSelectStudent }) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/students");
        setStudents(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchStudents();
  }, []);


// useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/students");
//         if (Array.isArray(response.data)) {
//           setStudents(response.data);
//           console.log(students)
//         } else {
//           throw new Error("Invalid response from server");
//         }
//       } catch (error) {
//         setError(error.message);
//       }
//     };
//     fetchStudents();
//   }, []);
  

//   console.log(students);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Student List</h1>
      <ul>
            <tr key={students.id} onClick={() => onSelectStudent(students)}>
        <td>{students.name}</td>
        <td >{students.rollNo}</td>
        <td >{students.marks}</td>
      </tr>


      </ul>
    </div>
  );
};

export default StudentList;
