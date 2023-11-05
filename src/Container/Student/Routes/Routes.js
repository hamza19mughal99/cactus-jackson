import CourseDetail from "../Pages/CourseDetail/CourseDetail";
import Courses from "../Pages/Courses/Courses";
import Faqs from "../Pages/Faqs/Faqs";
import Profile from "../Pages/Profile/Profile";

export const studentRoutes = [
    {
        path: '/student/courses',
        component: <Courses />
    },
    {
        path: '/student/course-detail/:id',
        component: <CourseDetail />
    },
    {
        path: '/student/faqs',
        component: <Faqs />
    },
    {
        path: '/student/profile',
        component: <Profile />
    }
]