import api from "../../Util/interceptors"

// ================ PROFESSION =====================

export const ProfessionGet = () => async (dispatch) => {
    try {
        dispatch({
            type: "PROFESSION_GET_REQUEST",
        });

        const { data } = await api.get("admin/profession");

        dispatch({
            type: "PROFESSION_GET_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "PROFESSION_GET_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const ProfessionCreate = (inputData) => async (dispatch) => {
    try {
        dispatch({
            type: "PROFESSION_CREATE_REQUEST",
        });

        const { data } = await api.post("admin/profession", inputData);

        dispatch({
            type: "PROFESSION_CREATE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "PROFESSION_CREATE_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};

export const ProfessionEdit = (inputData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "PROFESSION_EDIT_REQUEST",
        });

        const { data } = await api.put(`admin/profession/${id}`, inputData);

        dispatch({
            type: "PROFESSION_EDIT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "PROFESSION_EDIT_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};

export const ProfessionDelete = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "PROFESSION_DELETE_REQUEST",
        });

        const { data } = await api.delete(`admin/profession/${id}`);

        dispatch({
            type: "PROFESSION_DELETE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "PROFESSION_DELETE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// ================ EXPERT =====================

export const ExpertGet = () => async (dispatch) => {
    try {
        dispatch({
            type: "EXPERT_GET_REQUEST",
        });

        const { data } = await api.get("admin/user/expert/list");

        dispatch({
            type: "EXPERT_GET_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "EXPERT_GET_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const ExpertCreate = (inputData) => async (dispatch) => {
    try {
        dispatch({
            type: "EXPERT_CREATE_REQUEST",
        });

        const { data } = await api.post("admin/user/expert", inputData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        dispatch({
            type: "EXPERT_CREATE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "EXPERT_CREATE_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};

export const ExpertEdit = (inputData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "EXPERT_EDIT_REQUEST",
        });

        const { data } = await api.put(`admin/expert/${id}`, inputData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        dispatch({
            type: "EXPERT_EDIT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "EXPERT_EDIT_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};

export const ExpertDelete = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "EXPERT_DELETE_REQUEST",
        });

        const { data } = await api.delete(`admin/user/${id}?permanent=1`);

        dispatch({
            type: "EXPERT_DELETE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "EXPERT_DELETE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// =================== COURSES =====================

export const CourseGet = () => async (dispatch) => {
    try {
        dispatch({
            type: "COURSE_GET_REQUEST",
        });

        const { data } = await api.get("admin/course");

        dispatch({
            type: "COURSE_GET_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "COURSE_GET_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const CourseCreate = (inputData) => async (dispatch) => {
    try {
        dispatch({
            type: "COURSE_CREATE_REQUEST",
        });

        const { data } = await api.post("admin/course", inputData);

        dispatch({
            type: "COURSE_CREATE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "COURSE_CREATE_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};

export const CourseEdit = (inputData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "COURSE_EDIT_REQUEST",
        });

        const { data } = await api.put(`admin/course/${id}`, inputData);

        dispatch({
            type: "COURSE_EDIT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "COURSE_EDIT_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};

export const CourseDelete = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "COURSE_DELETE_REQUEST",
        });

        const { data } = await api.delete(`admin/course/${id}?permanent=1`);

        dispatch({
            type: "COURSE_DELETE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "COURSE_DELETE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// ===================== VIDEO =========================

export const VideoGet = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "VIDEO_GET_REQUEST",
        });

        const { data } = await api.get(`admin/course/lesson/${id}`);

        dispatch({
            type: "VIDEO_GET_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "VIDEO_GET_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const VideoCreate = (inputData) => async (dispatch) => {
    try {
        dispatch({
            type: "VIDEO_CREATE_REQUEST",
        });

        const { data } = await api.post("admin/lesson", inputData);

        dispatch({
            type: "VIDEO_CREATE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "VIDEO_CREATE_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};

export const VideoDelete = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "VIDEO_DELETE_REQUEST",
        });

        const { data } = await api.delete(`admin/lesson/${id}?permanent=1`);

        dispatch({
            type: "VIDEO_DELETE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "VIDEO_DELETE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const VideoEdit = (inputData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "VIDEO_EDIT_REQUEST",
        });

        const { data } = await api.put(`admin/lesson/${id}`, inputData);

        dispatch({
            type: "VIDEO_EDIT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "VIDEO_EDIT_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};

// ====================== MCQS ============================

export const McqGet = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "MCQ_GET_REQUEST",
        });

        const { data } = await api.get(`admin/question/${id}`);

        dispatch({
            type: "MCQ_GET_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "MCQ_GET_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const McqCreate = (inputData) => async (dispatch) => {
    try {
        dispatch({
            type: "MCQ_CREATE_REQUEST",
        });

        const { data } = await api.post("admin/question", inputData);

        dispatch({
            type: "MCQ_CREATE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "MCQ_CREATE_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};

export const QuestionEdit = (inputData, id) => async (dispatch) => {
    try {
        dispatch({
            type: "QUESTION_EDIT_REQUEST",
        });

        const { data } = await api.put(`admin/question/${id}`, inputData);

        dispatch({
            type: "QUESTION_EDIT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "QUESTION_EDIT_FAILED",
            payload: e.response.data.message,
            success: false,
        });
    }
};

export const QuestionDelete = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "QUESTION_DELETE_REQUEST",
        });

        const { data } = await api.delete(`admin/question/${id}?permanent=1`);

        dispatch({
            type: "QUESTION_DELETE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "QUESTION_DELETE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// ==================== ALL STUDENTS =======================

export const AllStudentGet = () => async (dispatch) => {
    try {
        dispatch({
            type: "ALL_STUDENT_GET_REQUEST",
        });

        const { data } = await api.get(`admin/user/student/list`);

        dispatch({
            type: "ALL_STUDENT_GET_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "ALL_STUDENT_GET_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const StudentGetById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "STUDENT_GET_BY_ID_REQUEST",
        });

        const { data } = await api.get(`admin/student/profile/${id}`);

        dispatch({
            type: "STUDENT_GET_BY_ID_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "STUDENT_GET_BY_ID_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};