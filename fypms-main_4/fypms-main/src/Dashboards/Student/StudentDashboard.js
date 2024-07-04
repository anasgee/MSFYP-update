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
import Message from "../../Components/Chat/Message"

const StudentDashboard = (props) => {
  const state = useSelector((state) => state);
  const { input } = useSelector((state) => state.login);
  const user = {
    name: input.userName,
    id: input.user_id,
    userType:props.userType,
    rollNumber: input.userID, // Assuming rollNumber is part of the login state
  };

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
        <Route path="/see-grades" element={<ViewGrades rollNumber={user.rollNumber} userId={user.id}  />} />
        <Route
          path="/message"
          element={<Message userId={user.id} userName={user.name}/>}
        />
        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Routes>
    </Sidebar>
  );
};

export default StudentDashboard;
