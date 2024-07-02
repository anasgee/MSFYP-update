import React ,{useEffect,useState}from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Sidebar from "../../Components/Navbar/Sidebar";
import ProjectManagement from "./pages/ProjectManagement";
import Submissions from "./pages/Submissions";
import Settings from "./pages/Settings";
import ChatMeetings from "./pages/ChatMeetings";
import PersonalNotes from "./pages/PersonalNotes";
import ScheduleView from "../Admin/pages/ScheduleView";
import PlagiarismDetector from "../../Components/Plagiarism/Plagiarism";
import ViewGrades from "../Student/pages/Viewgrade";

const StudentDashboard = (props) => {
  console.log(props)

  // const [rollNumber, setRollNumber] = useState([]); 
  const { input } = useSelector((state) => state.login);
  const user = {
    name: input.userName,
    id: input.user_id,
    rollNumber: input.rollNumber,
    userType: props.userType
    // Assuming rollNumber is part of the login state
  };

  // const API = async()=>{
  //   try{

    
  //   const response = await fetch("http://localhost:5000/api/grades")
  //   const data = await response.json();

    
  //  console.log(data[0].rollNumber)
  //   }catch(error){
  //     console.log("Error fetching grades:", error);
  //   }
  // }


  // useEffect(()=>{
  //   API()
    
  // },[])

  return (
    <Sidebar user={user}  links={props.links}>
      <Routes>
        <Route path="/" element={<Dashboard userId={user.id} />} />
        <Route path="/my-project" element={<Project userId={user.id} />} />
        <Route path="/project-management" element={<ProjectManagement userId={user.id} />} />
        <Route path="/submissions" element={<Submissions userId={user.id} />} />
        <Route path="/personal-notes" element={<PersonalNotes userId={user.id} />} />
        <Route path="/settings" element={<Settings userId={user.id} />} />
        <Route path="/scheduleview" element={<ScheduleView userId={user.id} />} />
        <Route path="/plagiarism" element={<PlagiarismDetector userId={user.id} />} />
        <Route path="/chat-meetings" element={<ChatMeetings userId={user.id} />} />
        <Route path="/see-grades" element={<ViewGrades userId={user.id}  />} />
        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Routes>
    </Sidebar>
  );
};

export default StudentDashboard;
