// import React, { useState, useEffect, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { Form, ListGroup } from "react-bootstrap";

// import { ApiCall } from "../../../api/apiCall";

// import CustomCard from "../../../Components/UI/CustomCard";
// import SpinnerModal from "../../../Components/UI/SpinnerModal";
// import Button from "../../../Components/UI/Button";
// import  "./GradeForm.css";
// import classes from "./PersonalNotes.module.css";
// import { toast } from "react-toastify";

// const GradeForm = () => {
//   const { input } = useSelector((state) => state.login);
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [grades, setGrades] = useState({
//     del1:"",
//     del2:"",
//     del3:""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setGrades({
//       ...grades,
//       [name]: value,
      
//     });
//     console.log(value)
//   };
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   console.log('Grades:', grades);
//   // };



//   const loadPage = useCallback(async () => {
//     const response = await ApiCall({
//       params: {
//         role: input.loginAs,
//       },
//       route: `admin/personal-notes`,
//       verb: "get",
//       token: input.token,
//       baseurl: true,
//     });

//     if (response && response.status === 200) {
//       setNotes(response.response.notes);
//       setIsLoading(false);
//     } else {
//       console.log(response);
//       setIsLoading(false);
//     }
//   }, [input.loginAs, input.token]);

//   useEffect(() => {
//     loadPage();
//   }, [loadPage]);

//   // console.log(notes);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await ApiCall({
//       params: {
//         role: input.loginAs,
//         note: newNote,
//       },
//       route: `admin/personal-notes/new-note`,
//       verb: "post",
//       token: input.token,
//       baseurl: true,
//     });
//     setIsLoading(true);
//     if (response.status === 200) {
//       toast.success(response.response.message);
//     } else {
//       toast.error(response.response.message);
//     }
//     loadPage();
//     setNewNote("");

//     console.log("grades",grades)
//     console.log(response);
//   };

//   const handleDelete = async (id) => {
//     console.log(input.loginAs);

//     const response = await ApiCall({
//       params: {},
//       route: `admin/personal-notes/${id}/delete`,
//       verb: "delete",
//       token: input.token,
//       baseurl: true,
//     });
//     if (response.status === 200) {
//       toast.success(response.response.message);
//     } else {
//       toast.error(response.response.message);
//     }
//     loadPage();
//     setIsLoading(true);
//     console.log(response);
//   };



//   return (
//     <div className={classes["main-container"]}>
      
//           <Form onSubmit={handleSubmit} className={classes.form}>
//             <Form.Group controlId="notes">
//               {/* <Form.Control
//                 type="text"
//                 placeholder="Enter Roll Number"
//                 value={newNote}
//                 onChange={(event) => setNewNote(event.target.value)}
//                 required
//               /> */}
//               <select className="options">
//                 <option>Select Program</option>
//                 <option>Bs IT</option>
//                 <option>Bs CS
//                 </option>
//                 <option>Post ADP</option>
//               </select>
//               <select className="session">
//                 <option>Select Session</option>
//                 <option>2023</option>
//                 <option>2024
//                 </option>
//                 <option>2025</option>
//               </select>
//               <div>
//         <input
//           type="number"
//           name="del1"
//           placeholder="Enter Deliverable 1 Grades"
//           value={grades.del1}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <input
//           type="number"
//           name="del2"
//           placeholder="Enter Deliverable 2 Grades"
//           value={grades.del2}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <input
//           type="number"
//           name="del3"
//           placeholder="Enter Final Grades"
//           value={grades.del3}
//           onChange={handleChange}
//         />
//       </div>
//             {/* <div className="total-grades">

//             </div> */}
//             </Form.Group>
//             <Button type="submit">Add</Button>
//           </Form>
          
//     </div>
//   );
// };






// export default GradeForm;





// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Form } from "react-bootstrap";
// import { toast } from "react-toastify";

// import { ApiCall } from "../../../api/apiCall";
// import Button from "../../../Components/UI/Button";
// import classes from "./GradeForm.module.css";

// const GradeForm = () => {
//   const { input } = useSelector((state) => state.login);
//   const [studentInfo, setStudentInfo] = useState({
//     name: "",
//     rollNumber: "",
//     classId: "",
//     image: "",
//     cgpa: "",
//     del1: "",
//     del2: "",
//     del3: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudentInfo({
//       ...studentInfo,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await ApiCall({
//       params: studentInfo,
//       route: `admin/students/grades`,
//       verb: "post",
//       token: input.token,
//       baseurl: true,
//     });

//     if (response.status === 200) {
//       toast.success(response.message);
//     } else {
//       toast.error(response.message);
//     }
//   };

//   return (
//     <div className={classes["main-container"]}>
//       <Form onSubmit={handleSubmit} className={classes.form}>
//         <Form.Group controlId="studentInfo">
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter Student Name"
//             value={studentInfo.name}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="rollNumber"
//             placeholder="Enter Roll Number"
//             value={studentInfo.rollNumber}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="classId"
//             placeholder="Enter Class ID"
//             value={studentInfo.classId}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="image"
//             placeholder="Enter Image URL"
//             value={studentInfo.image}
//             onChange={handleChange}
//           />
//           <input
//             type="number"
//             name="cgpa"
//             placeholder="Enter CGPA"
//             value={studentInfo.cgpa}
//             onChange={handleChange}
//           />
//           <input
//             type="number"
//             name="del1"
//             placeholder="Enter Deliverable 1 Grades"
//             value={studentInfo.del1}
//             onChange={handleChange}
//           />
//           <input
//             type="number"
//             name="del2"
//             placeholder="Enter Deliverable 2 Grades"
//             value={studentInfo.del2}
//             onChange={handleChange}
//           />
//           <input
//             type="number"
//             name="del3"
//             placeholder="Enter Final Grades"
//             value={studentInfo.del3}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Button type="submit">Add</Button>
//       </Form>
//     </div>
//   );
// };

// export default GradeForm;


// src/components/StudentList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentList = ({ onSelectStudent }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map(student => (
          <li key={student._id} onClick={() => onSelectStudent(student)}>
            {student.name} - {student.rollNo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
