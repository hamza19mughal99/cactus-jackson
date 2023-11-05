import AddMcqs from "../Pages/Courses/AddMcqs/AddMcqs";
import AddVideo from "../Pages/Courses/AddVideo/AddVideo";
import CourseDetail from "../Pages/Courses/CourseDetail/CourseDetail";
import Courses from "../Pages/Courses/Courses";
import CreateCourse from "../Pages/Courses/CreateCourse/CreateCourse";
import EditCourse from "../Pages/Courses/EditCourse/EditCourse";
import EditVideo from "../Pages/Courses/EditVideo/EditVideo";
import CreateExpert from "../Pages/Expert/CreateExpert/CreateExpert";
import EditExpert from "../Pages/Expert/EditExpert/EditExpert";
import Expert from "../Pages/Expert/Expert";
import CreateProfession from "../Pages/Profession/CreateProfession/CreateProfession";
import EditProfession from "../Pages/Profession/EditProfession/EditProfession";
import Profession from "../Pages/Profession/Profession";
import Profile from "../Pages/Profile";
import StudentDetail from "../Pages/Students/StudentDetail/StudentDetail";
import Students from "../Pages/Students/Students";

export const adminRoutes = [
  {
    path: "/admin/profile",
    component: <Profile />,
  },
  {
    path: "/admin/profession",
    component: <Profession />,
  },
  {
    path: "/admin/profession/create-profession",
    component: <CreateProfession />,
  },
  {
    path: "/admin/profession/edit-profession/:id",
    component: <EditProfession />,
  },

  {
    path: "/admin/experts",
    component: <Expert />,
  },
  {
    path: "/admin/experts/create-expert",
    component: <CreateExpert />,
  },
  {
    path: "/admin/experts/edit-expert/:id",
    component: <EditExpert />,
  },

  {
    path: "/admin/courses",
    component: <Courses />,
  },
  {
    path: "/admin/courses/create-course",
    component: <CreateCourse />,
  },
  {
    path: "/admin/courses/edit-course/:id",
    component: <EditCourse />,
  },

  {
    path: "/admin/courses/courses-detail/:id",
    component: <CourseDetail />,
  },
  {
    path: "/admin/courses/add-video",
    component: <AddVideo />,
  },
  {
    path: "/admin/courses/edit-video/:id",
    component: <EditVideo />,
  },
  {
    path: "/admin/courses/add-mcqs/:id",
    component: <AddMcqs />,
  },
  {
    path: "/admin/students",
    component: <Students />,
  },
  {
    path: "/admin/students/:id",
    component: <StudentDetail />,
  },
];

export const adminSideBarItems = [
  {
    path: "/admin/profile",
    icon: "/images/profile-icon.png",
    title: "Profile",
    isSubNav: false,
  },
  {
    path: "/admin/profession",
    icon: "/images/profile-icon.png",
    title: "Profession",
    isSubNav: false,
  },
  {
    path: "/admin/experts",
    icon: "/images/profile-icon.png",
    title: "Experts",
    isSubNav: false,
  },
  {
    path: "/admin/courses",
    icon: "/images/profile-icon.png",
    title: "Courses",
    isSubNav: false,
  },
  {
    path: "/admin/students",
    icon: "/images/profile-icon.png",
    title: "All Students",
    isSubNav: false,
  },
];