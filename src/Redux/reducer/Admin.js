
// =================== PROFESSION ======================

export const ProfessionGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "PROFESSION_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "PROFESSION_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                professionGetData: action.payload,
            };
        case "PROFESSION_GET_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const ProfessionCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "PROFESSION_CREATE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "PROFESSION_CREATE_SUCCESS":
            return {
                ...state,
                loading: false,
                professionCreateData: action.payload,
            };
        case "PROFESSION_CREATE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "PROFESSION_CREATE_RESET":
            return {
                ...state,
                professionCreateData: null,
                error: null
            };
        default:
            return state;
    }
}

export const ProfessionEditReducer = (state = {}, action) => {
    switch (action.type) {
        case "PROFESSION_EDIT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "PROFESSION_EDIT_SUCCESS":
            return {
                ...state,
                loading: false,
                professionEditData: action.payload,
            };
        case "PROFESSION_EDIT_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "PROFESSION_EDIT_RESET":
            return {
                ...state,
                professionEditData: null,
                error: null
            };
        default:
            return state;
    }
}

export const ProfessionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case "PROFESSION_DELETE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "PROFESSION_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                professionDeleteData: action.payload,
            };
        case "PROFESSION_DELETE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "PROFESSION_DELETE_RESET":
            return {
                ...state,
                professionDeleteData: null,
                error: null
            };
        default:
            return state;
    }
}

// =================== EXPERT ======================

export const ExpertGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "EXPERT_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "EXPERT_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                expertGetData: action.payload,
            };
        case "EXPERT_GET_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const ExpertCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "EXPERT_CREATE_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "EXPERT_CREATE_SUCCESS":
            return {
                ...state,
                loading: false,
                expertCreate: action.payload,
            };
        case "EXPERT_CREATE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "EXPERT_CREATE_RESET":
            return {
                ...state,
                expertCreate: null,
                error: null
            };
        default:
            return state;
    }
}

export const ExpertEditReducer = (state = {}, action) => {
    switch (action.type) {
        case "EXPERT_EDIT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "EXPERT_EDIT_SUCCESS":
            return {
                ...state,
                loading: false,
                expertEditData: action.payload,
            };
        case "EXPERT_EDIT_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "EXPERT_EDIT_RESET":
            return {
                ...state,
                expertEditData: null,
                error: null
            };
        default:
            return state;
    }
}

export const ExpertDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case "EXPERT_DELETE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "EXPERT_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                expertDeleteData: action.payload,
            };
        case "EXPERT_DELETE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "EXPERT_DELETE_RESET":
            return {
                ...state,
                expertDeleteData: null,
                error: null
            };
        default:
            return state;
    }
}

// ==================== COURSE =======================

export const CourseGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "COURSE_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "COURSE_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                courseGetData: action.payload,
            };
        case "COURSE_GET_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const CourseCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "COURSE_CREATE_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "COURSE_CREATE_SUCCESS":
            return {
                ...state,
                loading: false,
                courseCreateData: action.payload,
            };
        case "COURSE_CREATE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "COURSE_CREATE_RESET":
            return {
                ...state,
                courseCreateData: null,
                error: null
            };
        default:
            return state;
    }
}

export const CourseEditReducer = (state = {}, action) => {
    switch (action.type) {
        case "COURSE_EDIT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "COURSE_EDIT_SUCCESS":
            return {
                ...state,
                loading: false,
                courseEditData: action.payload,
            };
        case "COURSE_EDIT_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "COURSE_EDIT_RESET":
            return {
                ...state,
                courseEditData: null,
                error: null
            };
        default:
            return state;
    }
}

export const CourseDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case "COURSE_DELETE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "COURSE_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                courseDeleteData: action.payload,
            };
        case "COURSE_DELETE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "COURSE_DELETE_RESET":
            return {
                ...state,
                courseDeleteData: null,
                error: null
            };
        default:
            return state;
    }
}


// ==================== VIDEO ==================

export const VideoGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "VIDEO_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "VIDEO_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                videoGetData: action.payload,
            };
        case "VIDEO_GET_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "VIDEO_GET_RESET":
            return {
                ...state,
                videoGetData: null,
                error: null
            };
        default:
            return state;
    }
}

export const VideoCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "VIDEO_CREATE_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "VIDEO_CREATE_SUCCESS":
            return {
                ...state,
                loading: false,
                videoCreateData: action.payload,
            };
        case "VIDEO_CREATE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "VIDEO_CREATE_RESET":
            return {
                ...state,
                videoCreateData: null,
                error: null
            };
        default:
            return state;
    }
}

export const VideoDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case "VIDEO_DELETE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "VIDEO_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                videoDeleteData: action.payload,
            };
        case "VIDEO_DELETE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "VIDEO_DELETE_RESET":
            return {
                ...state,
                videoDeleteData: null,
                error: null
            };
        default:
            return state;
    }
}

export const VideoEditReducer = (state = {}, action) => {
    switch (action.type) {
        case "VIDEO_EDIT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "VIDEO_EDIT_SUCCESS":
            return {
                ...state,
                loading: false,
                videoEditData: action.payload,
            };
        case "VIDEO_EDIT_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "VIDEO_EDIT_RESET":
            return {
                ...state,
                videoEditData: null,
                error: null
            };
        default:
            return state;
    }
}

// ====================== MCQ ===================

export const McqCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "MCQ_CREATE_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "MCQ_CREATE_SUCCESS":
            return {
                ...state,
                loading: false,
                mcqCreateData: action.payload,
            };
        case "MCQ_CREATE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "MCQ_CREATE_RESET":
            return {
                ...state,
                mcqCreateData: null,
                error: null
            };
        default:
            return state;
    }
}

export const McqGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "MCQ_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "MCQ_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                mcqGetData: action.payload,
            };
        case "MCQ_GET_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "MCQ_GET_RESET":
            return {
                ...state,
                mcqGetData: null,
                error: null
            };
        default:
            return state;
    }
}

export const QuestionEditReducer = (state = {}, action) => {
    switch (action.type) {
        case "QUESTION_EDIT_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "QUESTION_EDIT_SUCCESS":
            return {
                ...state,
                loading: false,
                quesEditData: action.payload,
            };
        case "QUESTION_EDIT_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "QUESTION_EDIT_RESET":
            return {
                ...state,
                editLoading: null,
                quesEditData: {},
                error: null
            };
        default:
            return state;
    }
}

export const QuestionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case "QUESTION_DELETE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "QUESTION_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                quesDeleteData: action.payload,
            };
        case "QUESTION_DELETE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "QUESTION_DELETE_RESET":
            return {
                ...state,
                quesDeleteData: null,
                error: null
            };
        default:
            return state;
    }
}

// =================== ALL STUDENTS GET ======================

export const AllStudentGetReducer = (state = {}, action) => {
    switch (action.type) {
        case "ALL_STUDENT_GET_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "ALL_STUDENT_GET_SUCCESS":
            return {
                ...state,
                loading: false,
                allStudentGetData: action.payload,
            };
        case "ALL_STUDENT_GET_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const StudentGetByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case "STUDENT_GET_BY_ID_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "STUDENT_GET_BY_ID_SUCCESS":
            return {
                ...state,
                loading: false,
                studentGetIdData: action.payload,
            };
        case "STUDENT_GET_BY_ID_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}