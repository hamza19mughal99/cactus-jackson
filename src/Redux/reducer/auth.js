const initialState = {
    user: {}
}

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                loading: true,
                isAuthenticated: false,
                error: false
            }

        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                error: false
            }

        case "LOGIN_RESET":
            return {
                ...state,
                user: {}
            }

        case "LOGIN_FAILED":
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case "CLEAR_ERRORS":
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const StudentRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case "STUDENT_REGISTER_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "STUDENT_REGISTER_SUCCESS":
            return {
                ...state,
                loading: false,
                isRegistered: action.payload,
            };
        case "STUDENT_REGISTER_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "STUDENT_REGISTER_RESET":
            return {
                ...state,
                isRegistered: null,
            };
        case "CLEAR_ERRORS":
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const ChangePassReducer = (state = {}, action) => {
    switch (action.type) {
        case "CHANGE_PASSWORD_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "CHANGE_PASSWORD_SUCCESS":
            return {
                ...state,
                loading: false,
                updated: action.payload,
            };
        case "CHANGE_PASSWORD_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "CHANGE_PASSWORD_RESET":
            return {
                ...state,
                updated: {},
            };
        case "CLEAR_ERRORS":
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const ChangeDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case "CHANGE_DETAILS_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "CHANGE_DETAILS_SUCCESS":
            return {
                ...state,
                loading: false,
                updated: action.payload,
            };
        case "CHANGE_DETAILS_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "CHANGE_DETAILS_RESET":
            return {
                ...state,
                updated: {},
            };
        case "CLEAR_ERRORS":
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const UpdateUserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case "UPDATE_USER_DETAILS_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "UPDATE_USER_DETAILS_SUCCESS":
            return {
                ...state,
                loading: false,
                updateUserDetail: action.payload,
            };
        case "UPDATE_USER_DETAILS_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "UPDATE_USER_DETAILS_RESET":
            return {
                ...state,
                updateUserDetail: null,
            };
        case "CLEAR_ERRORS":
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const UserProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_PROFILE_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "USER_PROFILE_SUCCESS":
            return {
                ...state,
                loading: false,
                UserDetail: action.payload,
            };
        case "USER_PROFILE_FAILED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const ExpertHomeGetReducer = (state = {}, action) => {
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