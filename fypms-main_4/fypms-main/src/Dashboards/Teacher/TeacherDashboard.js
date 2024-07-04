import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Dashboard from "./pages/Dashboard";

import Sidebar from "../../Components/Navbar/Sidebar";
import SupervisionProjects from "./pages/SupervisionProjects";
import ExaminationProjects from "./pages/ExaminationProjects";
import PersonalNotes from "./pages/PersonalNotes";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import ScheduleForm from "../Admin/pages/ScheduleForm";
import ScheduleView from "../Admin/pages/ScheduleView";
import Plagiarism from "../../Components/Plagiarism/Plagiarism"
import Message from "../../Components/Chat/Message"

const TeacherDashboard = (props) => {
  const { input } = useSelector((state) => state.login);
  const user = {
    name: input.userName,
    id: input.user_id,
    userType:props.userType

  };

  return (
    <Sidebar user={user} links={props.links}>
      <Routes>
        <Route
          path="/"
          element={<Dashboard userId={user.id} userName={user.name} />}
        />
        <Route
          path="/supervision-projects"
          element={
            <SupervisionProjects userId={user.id} userName={user.name} />
          }
        />
        <Route
          path="/examination-projects"
          element={
            <ExaminationProjects userId={user.id} userName={user.name} />
          }
        />
        <Route
          path="/notifications"
          element={<Notifications userId={user.id} userName={user.name} />}
        />
         <Route
          path="/message"
          element={<Message userId={user.id} userName={user.name} />}
        />
        <Route
          path="/scheduleview"
          element={<ScheduleView userId={user.id} userName={user.name} />}
        />
        <Route
          path="/scheduleform"
          element={<ScheduleForm userId={user.id} userName={user.name} />}
        />
        <Route
          path="/plagiarism"
          element={<Plagiarism userId={user.id} userName={user.name} />}
        />
        <Route
          path="/personal-notes"
          element={<PersonalNotes userId={user.id} userName={user.name} />}
        />
        <Route
          path="/settings"
          element={<Settings userId={user.id} />}
          userName={user.name}
        />
      </Routes>
    </Sidebar>
  );
};

export default TeacherDashboard;
