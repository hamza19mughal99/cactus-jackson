import api from "../../Util/interceptors"

// ================ COURSES =====================

export const CoursesList = () => async (dispatch) => {
    try {
        dispatch({
            type: "COURSES_LIST_REQUEST",
        });

        const { data } = await api.get("course");

        dispatch({
            type: "COURSES_LIST_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "COURSES_LIST_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const CourseGetById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "COURSE_BY_ID_REQUEST",
        });

        const { data } = await api.get(`course/${id}`);

        dispatch({
            type: "COURSE_BY_ID_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "COURSE_BY_ID_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// ================= SUBMISSION =====================

export const SubmissionCreate = (courseId, lessonId, d) => async (dispatch) => {
    try {
        dispatch({
            type: "SUBMISSION_CREATE_REQUEST",
        });

        const { data } = await api.post(`course/${courseId}/lesson/${lessonId}/submission/`, d);

        dispatch({
            type: "SUBMISSION_CREATE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "SUBMISSION_CREATE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const SubmissionGet = (courseId) => async (dispatch) => {
    try {
        dispatch({
            type: "SUBMISSION_GET_REQUEST",
        });

        const { data } = await api.get(`course/${courseId}/submission/`);

        dispatch({
            type: "SUBMISSION_GET_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "SUBMISSION_GET_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// ======================= VIDEO =======================

export const VideoPause = (lessonId, d) => async (dispatch) => {
    try {
        dispatch({
            type: "VIDEO_PAUSE_REQUEST",
        });

        const { data } = await api.patch(`student/watched/lesson/${lessonId}/`, d);

        dispatch({
            type: "VIDEO_PAUSE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "VIDEO_PAUSE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

export const VideoWatchSec = (lesson) => async (dispatch) => {
    try {
        dispatch({
            type: "VIDEO_WATCH_REQUEST",
        });

        const { data } = await api.get(`student/watched/lesson/${lesson}`);

        dispatch({
            type: "VIDEO_WATCH_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "VIDEO_WATCH_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// ====================== COURSE SUBMIT ======================

export const CourseMcqSubmit = (courseId, d) => async (dispatch) => {
    try {
        dispatch({
            type: "COURSE_MCQ_SUBMIT_REQUEST",
        });

        const { data } = await api.post(`course/${courseId}/submission`, d);

        dispatch({
            type: "COURSE_MCQ_SUBMIT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "COURSE_MCQ_SUBMIT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// =================== COURSE RETAKE ========================

export const CourseRetake = (courseId) => async (dispatch) => {
    try {
        dispatch({
            type: "COURSE_RETAKE_REQUEST",
        });

        const { data } = await api.delete(`course/${courseId}/retake`);

        dispatch({
            type: "COURSE_RETAKE_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "COURSE_RETAKE_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};

// ================= PROJECT SUBMISSION =====================

export const ProjectSubmit = (d) => async (dispatch) => {
    try {
        dispatch({
            type: "PROJECT_SUBMIT_REQUEST",
        });

        const { data } = await api.post(`student/project`, d, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        dispatch({
            type: "PROJECT_SUBMIT_SUCCESS",
            payload: data,
            success: true,
        });

    } catch (e) {
        dispatch({
            type: "PROJECT_SUBMIT_FAILED",
            payload: e?.response?.data?.message,
            success: false,
        });
    }
};