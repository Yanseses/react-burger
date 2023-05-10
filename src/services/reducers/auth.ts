import { TAuthActions } from '../actions/auth';
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
} from '../actionTypes/auth';

type TUser = {
  name: string,
  email: string,
  password?: string
}

type TRequest = {
  request: boolean,
  failed: boolean,
  error: string
}

type TAuthState = {
  changeUser: TRequest,
  registerUser: TRequest,
  logoutUser: TRequest,
  authUser: TRequest,
  user: {
    request: boolean,
    failed: boolean,
    error: string,
    data: TUser,
    authorized: boolean,
    writeEmail: boolean,
    passwordPatch: boolean
  },
  dropPassword: TRequest
}

export const initialState = {
  changeUser: {
    request: false,
    failed: false,
    error: ''
  },
  registerUser: {
    request: false,
    failed: false,
    error: ''
  },
  logoutUser: {
    request: false,
    failed: false,
    error: ''
  },
  authUser: {
    request: false,
    failed: false,
    error: ''
  },
  user: {
    request: false,
    failed: false,
    error: '',
    data: {
      name: '',
      email: '',
      password: ''
    },
    authorized: false,
    writeEmail: false,
    passwordPatch: false
  },
  dropPassword: {
    request: false,
    failed: false,
    error: ''
  }
};

export const authStore = (state: TAuthState = initialState, action: TAuthActions) => {
  switch (action.type) {
    case USER_AUTH_REQUEST: {
      return {
        ...state,
        authUser: {
          ...state.authUser,
          request: true
        }
      }
    }
    case USER_AUTH_FAILED: {
      return {
        ...state,
        authUser: {
          request: false,
          failed: true,
          error: action.payload
        }
      }
    }
    case USER_AUTH_SUCCESS: {
      return {
        ...state,
        authUser: {
          error: '',
          request: false,
          failed: false,
        },
        user: {
          ...state.user,
          authorized: true,
          data: {
            ...state.user.data,
            name: action.payload.name,
            email: action.payload.email
          }
        }
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        user: {
          ...state.user,
          request: true
        }
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        user: {
          ...state.user,
          request: false,
          failed: true,
          error: action.payload
        }
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          request: false,
          failed: false,
          error: '',
          authorized: true,
          data: {
            ...state.user.data,
            name: action.payload.name,
            email: action.payload.email
          }
        }
      }
    }
    case USER_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutUser: {
          ...state.logoutUser,
          request: true
        }
      }
    }
    case USER_LOGOUT_FAILED: {
      return {
        ...state,
        logoutUser: {
          request: false,
          failed: true,
          error: action.payload
        }
      }
    }
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutUser: {
          request: false,
          failed: false,
          error: ''
        },
        user: {
          ...state.user,
          authorized: false,
          data: {
            name: '',
            email: '',
            password: ''
          }
        }
      }
    }
    case USER_REGISTER_REQUEST: {
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          request: true
        }
      }
    }
    case USER_REGISTER_FAILED: {
      return {
        ...state,
        registerUser: {
          request: false,
          failed: true,
          error: action.payload
        }
      }
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        registerUser: {
          failed: false,
          request: false,
          error: ''
        },
        user: {
          ...state.user,
          authorized: true,
          data: {
            ...state.user.data,
            name: action.payload.name,
            email: action.payload.email
          }
        }
      }
    }
    case USER_PASSWORD_PATCH: {
      return {
        ...state,
        user: {
          ...state.user,
          passwordPatch: true
        }
      }
    }
    case USER_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        dropPassword: {
          ...state.dropPassword,
          request: true
        }
      }
    }
    case USER_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        dropPassword: {
          request: false,
          failed: true,
          error: action.payload
        }
      }
    }
    case USER_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          passwordPatch: false
        },
        dropPassword: {
          ...state.dropPassword,
          request: false
        }
      }
    }
    case CHANGE_USER_REQUEST: {
      return {
        ...state,
        changeUser: {
          ...state.changeUser,
          request: true
        }
      }
    }
    case CHANGE_USER_FAILED: {
      return {
        ...state,
        changeUser: {
          request: false,
          failed: true,
          error: action.payload
        }
      }
    }
    case CHANGE_USER_SUCCESS: {
      return {
        ...state,
        changeUser: {
          request: false,
          failed: false,
          error: ''
        },
        user: {
          ...state.user,
          data: {
            ...state.user.data,
            email: action.payload.email,
            name: action.payload.name
          }
        }
      }
    }
    default: {
      return state;
    }
  }
};