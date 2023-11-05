// =================== COURSES ======================

export const CoursesListReducer = (state = {}, action) => {
    switch (action.type) {
        case "COURSES_LIST_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "COURSES_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                coursesListData: action.payload,
            };
        case "COURSES_LIST_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const CourseByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case "COURSE_BY_ID_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "COURSE_BY_ID_SUCCESS":
            return {
                ...state,
                loading: false,
                courseIdData: action.payload,
            };
        case "COURSE_BY_ID_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "COURSE_BY_ID_RESET":
            return {
                ...state,
                loading: false,
                error: null,
                courseIdData: null
            };
        default:
            return state;
    }
}


// ================ SUBMISSION ======================

export const SubmissionCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "SUBMISSION_CREATE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "SUBMISSION_CREATE_SUCCESS":
            return {
                ...state,
                loading: false,
                subCreateData: action.payload,
            };
        case "SUBMISSION_CREATE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "SUBMISSION_CREATE_RESET":
            return {
                ...state,
                loading: null,
                subCreateData: null,
                error: null
            };
        default:
            return state;
    }
}

export const SubmissionGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "SUBMISSION_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "SUBMISSION_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                subGetData: action.payload,
            };
        case "SUBMISSION_GET_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "SUBMISSION_GET_RESET":
            return {
                ...state,
                loading: null,
                subGetData: null,
                error: null
            };
        default:
            return state;
    }
}

// ======================= VIDEO =======================

export const VideoPauseReducer = (state = {}, action) => {
    switch (action.type) {
        case "VIDEO_PAUSE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "VIDEO_PAUSE_SUCCESS":
            return {
                ...state,
                loading: false,
                videoPauseData: action.payload,
            };
        case "VIDEO_PAUSE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "VIDEO_PAUSE_RESET":
            return {
                ...state,
                loading: null,
                videoPauseData: null,
                error: null
            };
        default:
            return state;
    }
}

export const VideoWatchReducer = (state = {}, action) => {
    switch (action.type) {
        case "VIDEO_WATCH_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "VIDEO_WATCH_SUCCESS":
            return {
                ...state,
                loading: false,
                videoWatchData: action.payload,
            };
        case "VIDEO_WATCH_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "VIDEO_WATCH_RESET":
            return {
                ...state,
                loading: null,
                videoWatchData: null,
                error: null
            };
        default:
            return state;
    }
}

// ====================== COURSE MCQ SUBMIT ======================

export const CourseMcqReducer = (state = {}, action) => {
    switch (action.type) {
        case "COURSE_MCQ_SUBMIT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "COURSE_MCQ_SUBMIT_SUCCESS":
            return {
                ...state,
                loading: false,
                courseMcqData: action.payload,
            };
        case "COURSE_MCQ_SUBMIT_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "COURSE_MCQ_SUBMIT_RESET":
            return {
                ...state,
                loading: null,
                courseMcqData: null,
                error: null
            };
        default:
            return state;
    }
}

// ==================== COURSE RETAKE ======================

export const CourseRetakeReducer = (state = {}, action) => {
    switch (action.type) {
        case "COURSE_RETAKE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "COURSE_RETAKE_SUCCESS":
            return {
                ...state,
                loading: false,
                courseRetakeData: action.payload,
            };
        case "COURSE_RETAKE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "COURSE_RETAKE_RESET":
            return {
                ...state,
                loading: null,
                courseRetakeData: null,
                error: null
            };
        default:
            return state;
    }
}

// ==================== PROJECT SUBMISSION ======================

export const ProjectSubmitReducer = (state = {}, action) => {
    switch (action.type) {
        case "PROJECT_SUBMIT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "PROJECT_SUBMIT_SUCCESS":
            return {
                ...state,
                loading: false,
                projectSubmitData: action.payload,
            };
        case "PROJECT_SUBMIT_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "PROJECT_SUBMIT_RESET":
            return {
                ...state,
                loading: null,
                projectSubmitData: null,
                error: null
            };
        default:
            return state;
    }
}