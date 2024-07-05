import {
  MdDashboard,
  MdOutlineSettingsSuggest,
  MdOutlineEventNote,
  MdOutlineAssessment,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { AiOutlineSchedule } from "react-icons/ai";
import { ImUpload2 } from "react-icons/im";
import { TbNotebook } from "react-icons/tb";
import { BsPersonSquare } from "react-icons/bs";
import { GiSpaceShuttle } from "react-icons/gi";
import { FaBullseye } from "react-icons/fa";
import { MdOutlineSchedule } from "react-icons/md";
import { MdOutlinePlagiarism } from "react-icons/md";
import { MdGrading } from "react-icons/md";

import { CiChat1 } from "react-icons/ci";






export const ADMIN_ROUTES = [
  {
    path: "/",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    path: "/classes",
    name: "Classes",
    icon: <SiGoogleclassroom />,
  },
  {
    path: "/teachers",
    name: "Teachers",
    icon: <BsPersonSquare />,
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <GiSpaceShuttle />,
  },
  {
    path: "/notice-board",
    name: "Notice Board",
    icon: <MdOutlineEventNote />,
  },

  // {
  //   path: "/generate-list",
  //   name: "Generate List",
  //   icon: <MdOutlineManageSearch />,
  // },
  {
    path: "/personal-notes",
    name: "Personal Notes",
    icon: <TbNotebook />,
  },
  // {
  //   path: "/miscellaneous",
  //   name: "Miscellaneous",
  //   icon: <MdApps />,
  // },
  {
    path:"/gradelist",
    name:"Mange Grades",
    icon:<MdGrading />
  },
  // {
  //   path:"/maincomponent",
  //   name:"Grades",
  //   icon:<MdGrade />
  // },
 { path:"/scheduleform",
  name:"Set Schedule",
  icon:<MdOutlineSchedule />
  
},

 { path:"/scheduleview",
  name:"see Schedule",
  icon:<FaBullseye />

},
{ path:"/plagiarism",
  name:"Check Plagiarism",
  icon:<MdOutlinePlagiarism />

},

  {
    path: "/settings",
    name: "Settings",
    icon: <MdOutlineSettingsSuggest />,
  },
  // {
  //   path:"/gradeForm",
  //   name:"Enter Grades"
  // },
 

];

export const TEACHER_ROUTES = [
  {
    path: "/",
    name: "Dashboard",
    icon: <MdDashboard />
  },
  {
    path: "/supervision-projects",
    name: "Supervision Projects",
    icon: <GiSpaceShuttle />,
  },
  {
    path: "/examination-projects",
    name: "Examination Projects",
    icon: <MdOutlineAssessment />,
  },
  // {
  //   path: "/invitations",
  //   name: "Invitations/Requests",
  //   icon: <HiUserAdd />,
  // },
  // {
  //   path: "/chat-meetings",
  //   name: "Chat & Meetings",
  //   icon: <MdOutlineVoiceChat />,
  // },
  {
    path: "/notifications",
    name: "Notify PMO",
    icon: <MdOutlineEventNote />,
  },
  {
    path: "/personal-notes",
    name: "Personal Notes",
    icon: <TbNotebook />,
  },
  { path:"/scheduleform",
  name:"Set Schedule",
  icon:<MdOutlineSchedule />},
  { path:"/scheduleview",
  name:"See Schedule",
  icon:<FaBullseye />},
  { path:"/plagiarism",
  name:"Check Plagiarism",
  icon:<MdOutlinePlagiarism />

},
{ path:"/message",
  name:"chat",
  icon:<CiChat1 />

},
  {
    path: "/settings",
    name: "Settings",
    icon: <MdOutlineSettingsSuggest />,
  },
];

export const STUDENT_ROUTES = [
  {
    path: "/",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    path: "/my-project",
    name: "My Project",
    icon: <GiSpaceShuttle />,
  },
  {
    path: "/project-management",
    name: "Project Management",
    icon: <AiOutlineSchedule />,
  },
  {
    path: "/submissions",
    name: "Submissions",
    icon: <ImUpload2 />,
  },
  // {
  //   path: "/invitations",
  //   name: "Invitations/Requests",
  //   icon: <HiUserAdd />,
  // },
  // {
  //   path: "/chat-meetings",
  //   name: "Chat & Meetings",
  //   icon: <MdOutlineVoiceChat />,
  // },
  {
    path: "/personal-notes",
    name: "Personal Notes",
    icon: <TbNotebook />,
  },
  {
    path: "/See-grades",
    name: "See Grades",
    icon: <MdGrading />,
  },
  { path:"/scheduleview",
  name:"See Teacher Schedule",
  icon:<FaBullseye />},
  { path:"/plagiarism",
  name:"Check Plagiarism",
  icon:<MdOutlinePlagiarism />

},
{ path:"/message",
  name:"chat",
  icon:<CiChat1 />

},
  {
    path: "/settings",
    name: "Settings",
    icon: <MdOutlineSettingsSuggest />,
  },
];
