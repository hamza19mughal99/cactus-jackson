import axios from "axios";
import api from "../../Util/interceptors"
import { getToken } from "../../Util/helper";

export const AuthLogin = (inputData) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    const { data } = await axios.post("auth/login", inputData);

    localStorage.setItem("user", JSON.stringify(data?.data));

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data,
      success: true,
    });

  } catch (e) {
    dispatch({
      type: "LOGIN_FAILED",
      payload: e.response.data.message,
      success: false,
    });
  }
};

export const StudentRegister = (registerData) => async (dispatch) => {
  try {
    dispatch({
      type: "STUDENT_REGISTER_REQUEST",
    });

    const { data } = await axios.post("/auth/register", registerData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    dispatch({
      type: "STUDENT_REGISTER_SUCCESS",
      payload: data,
      success: true,
    });
  } catch (e) {
    dispatch({
      type: "STUDENT_REGISTER_FAILED",
      payload: e.response.data.message,
      success: false,
    });
  }
};

export const changePassword = (passwordData) => async (dispatch) => {
  try {
    dispatch({
      type: "CHANGE_PASSWORD_REQUEST",
    });
    const { data } = await api.put(`account/change_password`, passwordData);
    dispatch({
      type: "CHANGE_PASSWORD_SUCCESS",
      payload: data,
      success: true,
    });
  } catch (e) {
    dispatch({
      type: "CHANGE_PASSWORD_FAILED",
      payload: e.response.data.message,
      success: false,
    });
  }
};

export const updateUserDetails = (userDetail) => async (dispatch) => {
  try {
    dispatch({
      type: "UPDATE_USER_DETAILS_REQUEST",
    });

    const { data } = await api.put("/account/profile", userDetail, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: getToken()
      }
    });

    dispatch({
      type: "UPDATE_USER_DETAILS_SUCCESS",
      payload: data,
      success: true,
    });

  }
  catch (e) {
    dispatch({
      type: "UPDATE_USER_DETAILS_FAILED",
      payload: e.response.data.message,
      success: false,
    });
  }
};

export const userProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "USER_PROFILE_REQUEST",
    });

    const { data } = await api.get("account/profile");

    dispatch({
      type: "USER_PROFILE_SUCCESS",
      payload: data,
      success: true,
    });

  } catch (e) {
    dispatch({
      type: "USER_PROFILE_FAILED",
      payload: e.response.data.message,
      success: false,
    });
  }
};

export const expertGet = () => async (dispatch) => {
  try {
    dispatch({
      type: "EXPERT_GET_REQUEST",
    });

    const { data } = await axios.get("/expert/list");

    dispatch({
      type: "EXPERT_GET_SUCCESS",
      payload: data,
      success: true,
    });
  } catch (e) {
    dispatch({
      type: "EXPERT_GET_FAILED",
      payload: e.response.data.message,
      success: false,
    });
  }
};
