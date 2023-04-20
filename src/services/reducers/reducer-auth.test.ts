import { authStore, initialState } from "../../services/reducers/auth";
import * as actions from '../actions/auth';

describe('Auth reducer', () => {
  const state = initialState;

  test('Should return initial state', () => {
    // @ts-ignore
    expect(authStore(undefined, {})).toEqual(state)
  });

  test('User auth Request', () => {
    const userAuthState = {
      ...state,
      authRequest: true
    }

    expect(authStore(state, actions.userAuthRequest())).toEqual(userAuthState)
  })
  
  test('User auth Success', () => {
    const payload = {
      name: 'user',
      email: 'user@user.ru'
    }
    const userAuthState = {
      ...state,
      user: {
        name: 'user',
        email: 'user@user.ru',
        password: ''
      },
      userAuthorized: true,
      authRequest: false,
      authFailed: false
    }

    expect(authStore(state, actions.userAuthSucces(payload))).toEqual(userAuthState)
  })
  
  test('User auth Failed', () => {
    const userAuthState = {
      ...state,
      authRequest: false,
      authFailed: true
    }

    expect(authStore(state, actions.userAuthFailed(''))).toEqual(userAuthState)
  })

  test('User logout request', () => {
    const userLogout = {
      ...state,
      logoutRequest: true
    }

    expect(authStore(state, actions.userLogoutRequest())).toEqual(userLogout)
  })

  test('User logout success', () => {
    const userLogout = {
      ...state,
      user: {
        name: '',
        email: '',
        password: ''
      },
      userAuthorized: false,
      logoutRequest: false,
      logoutFailed: false
    }

    expect(authStore(state, actions.userLogoutSuccess())).toEqual(userLogout)
  })

  test('User logout failed', () => {
    const userLogout = {
      ...state,
      logoutRequest: false,
      logoutFailed: true
    }

    expect(authStore(state, actions.userLogoutFailed(''))).toEqual(userLogout)
  })

  test('Get user request', () => {
    const getUser = {
      ...state,
      userRequest: true
    }

    expect(authStore(state, actions.getUserRequest())).toEqual(getUser)
  })

  test('Get user success', () => {
    const payload = {
      email: 'user@user.ru',
      name: 'user'
    }
    const getUser = {
      ...state,
      userRequest: false,
      user: {
        name: 'user',
        email: 'user@user.ru',
        password: ''
      },
      userAuthorized: true
    }

    expect(authStore(state, actions.getUserSuccess(payload))).toEqual(getUser)
  })

  test('Get user failed', () => {
    const getUser = {
      ...state,
      userFailed: true,
      userRequest: false
    }

    expect(authStore(state, actions.getUserFailed(''))).toEqual(getUser)
  })

  test('User register request', () => {
    const userRegister = {
      ...state,
      registerRequest: true
    }

    expect(authStore(state, actions.userRegisterRequest())).toEqual(userRegister)
  })

  test('User register success', () => {
    const payload = {
      email: 'user@user.ru',
      name: 'user'
    }
    const userRegister = {
      ...state,
      registerRequest: false,
      user: {
        name: 'user',
        email: 'user@user.ru',
        password: ''
      },
      userAuthorized: true
    }

    expect(authStore(state, actions.userRegisterSuccess(payload))).toEqual(userRegister)
  })

  test('User register failed', () => {
    const userRegister = {
      ...state,
      registerRequest: false,
      registerFailed: true
    }

    expect(authStore(state, actions.userRegisterFailed(''))).toEqual(userRegister)
  })

  test('Change user request', () => {
    const changeUserSuccess = {
      ...state,
      changeUserRequest: true
    }

    expect(authStore(state, actions.changeUserRequest())).toEqual(changeUserSuccess)
  })

  test('Change user success', () => {
    const payload = {
      email: 'user1@user.ru',
      name: 'user1'
    }
    const changeUserSuccess = {
      ...state,
      user: {
        name: 'user1',
        email: 'user1@user.ru',
        password: ''
      }
    }

    expect(authStore(state, actions.changeUserSuccess(payload))).toEqual(changeUserSuccess)
  })

  test('Change user failed', () => {
    const changeUserSuccess = {
      ...state,
      changeUserRequest: false,
      changeUserFailed: true
    }

    expect(authStore(state, actions.changeUserFailed(''))).toEqual(changeUserSuccess)
  })

  test('User reset password', () => {
    expect(authStore(state, actions.userPasswordResetSuccess())).toEqual(initialState)
  })
})