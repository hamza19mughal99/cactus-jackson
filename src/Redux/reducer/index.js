import { combineReducers } from "redux";
import {
    ChangeDetailsReducer, ChangePassReducer, ExpertHomeGetReducer, LoginReducer, StudentRegisterReducer,
    UpdateUserDetailsReducer, UserProfileReducer
} from "./auth";

import {
    AllStudentGetReducer,
    CourseCreateReducer,
    CourseDeleteReducer,
    CourseEditReducer,
    CourseGetReducer, ExpertCreateReducer, ExpertDeleteReducer,
    ExpertEditReducer, ExpertGetReducer, McqCreateReducer, McqGetReducer, ProfessionCreateReducer, ProfessionDeleteReducer,
    ProfessionEditReducer, ProfessionGetReducer, QuestionDeleteReducer, QuestionEditReducer, StudentGetByIdReducer, VideoCreateReducer, VideoDeleteReducer, VideoEditReducer, VideoGetReducer
} from "./Admin";

import {
    CourseByIdReducer, CourseMcqReducer, CourseRetakeReducer, CoursesListReducer,
    ProjectSubmitReducer,
    SubmissionCreateReducer, SubmissionGetReducer, VideoPauseReducer, VideoWatchReducer
} from "./Student";

const rootReducer = combineReducers({

    LoginUser: LoginReducer,
    StudentRegister: StudentRegisterReducer,
    changePassword: ChangePassReducer,
    changeDetails: ChangeDetailsReducer,
    updateUser: UpdateUserDetailsReducer,
    getUserProfile: UserProfileReducer,

    getHomeExpert: ExpertHomeGetReducer,

    //PROFESSION
    createProfession: ProfessionCreateReducer,
    getProfession: ProfessionGetReducer,
    editProfession: ProfessionEditReducer,
    deleteProfession: ProfessionDeleteReducer,

    //EXPERT
    createExpert: ExpertCreateReducer,
    getExpert: ExpertGetReducer,
    editExpert: ExpertEditReducer,
    deleteExpert: ExpertDeleteReducer,

    //COURSE
    getCourse: CourseGetReducer,
    createCourse: CourseCreateReducer,
    editCourse: CourseEditReducer,
    deleteCourse: CourseDeleteReducer,

    //VIDEO
    getVideo: VideoGetReducer,
    createVideo: VideoCreateReducer,
    editVideo: VideoEditReducer,
    deleteVideo: VideoDeleteReducer,

    //MCQ
    createMcq: McqCreateReducer,
    getMcq: McqGetReducer,
    editQues: QuestionEditReducer,
    deleteQues: QuestionDeleteReducer,

    // STUDENTS
    getCourseList: CoursesListReducer,
    getCoursesById: CourseByIdReducer,

    // MCQ SUBMISSION
    createSubmission: SubmissionCreateReducer,
    getSubmission: SubmissionGetReducer,

    // VIDEO 
    createVideoPause: VideoPauseReducer,
    createVideoWatch: VideoWatchReducer,

    // COURSE MCQ SUBMIT 
    submitAllCoursesMcq: CourseMcqReducer,

    // COURSE 
    courseRetake: CourseRetakeReducer,

    // STUDENT
    allStudent: AllStudentGetReducer,
    studentGetId: StudentGetByIdReducer,

    postProjectSubmit: ProjectSubmitReducer

})
export default rootReducer;