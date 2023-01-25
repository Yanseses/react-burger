import {
  CHANGE_USER_REQUEST,
  CHANGE_USER_SUCCESS,
  CHANGE_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  USER_AUTH_REQUEST,
  USER_AUTH_FAILED,
  USER_AUTH_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAILED,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,
  USER_PASSWORD_PATCH,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_FAILED,
  USER_RESET_PASSWORD_SUCCESS
} from '../constants/auth';

const initialState = {
  changeUserRequest: false,
  changeUserFailed: false,
  registerRequest: false,
  registerFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  authRequest: false,
  authFailed: false,
  userRequest: false,
  userFailed: false,
  user: {
    name: '',
    email: '',
    password: ''
  },
  userAuthorized: false,
  userPasswordPatch: false,
  userWriteEmail: false,
  dropPasswordRequest: false,
  dropPasswordFailed: false,
};

export const authStore = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true
      }
    }
    case USER_AUTH_FAILED: {
      return {
        ...state,
        authFailed: true,
        authRequest: false
      }
    }
    case USER_AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFailed: false,
        userAuthorized: true,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email
        }
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        userFailed: false,
        userAuthorized: true,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email
        }
      }
    }
    case USER_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      }
    }
    case USER_LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true
      }
    }
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        userAuthorized: false,
        user: {
          name: '',
          email: '',
          password: ''
        }
      }
    }
    case USER_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true
      }
    }
    case USER_REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false
      }
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        userAuthorized: true,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email
        }
      }
    }
    case USER_PASSWORD_PATCH: {
      return {
        ...state,
        userPasswordPatch: true
      }
    }
    case USER_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        dropPasswordRequest: true
      }
    }
    case USER_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        dropPasswordRequest: false,
        dropPasswordFailed: true
      }
    }
    case USER_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        userPasswordPatch: false,
        dropPasswordRequest: false
      }
    }
    case CHANGE_USER_REQUEST: {
      return {
        ...state,
        changeUserRequest: true
      }
    }
    case CHANGE_USER_SUCCESS: {
      return {
        ...state,
        changeUserRequest: false,
        changeUserFailed: false,
        user: {
          ...state.user,
          email: action.user.email,
          name: action.user.name
        }
      }
    }
    case CHANGE_USER_FAILED: {
      return {
        ...state,
        changeUserRequest: false,
        changeUserFailed: true
      }
    }
    default: {
      return state;
    }
  }
};