import { getCookie, setCookie } from "../../utils/cookie";
import { request } from "../api";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const USER_AUTH_REQUEST = 'USER_AUTH_REQUEST';
export const USER_AUTH_FAILED = 'USER_AUTH_FAILED';
export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_PASSWORD_PATCH = 'USER_PASSWORD_PATCH';
export const USER_RESET_PASSWORD_REQUEST = 'USER_RESET_PASSWORD_REQUEST';
export const USER_RESET_PASSWORD_FAILED = 'USER_RESET_PASSWORD_FAILED';
export const USER_RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS';

export function userForgotPassword(email) {
  return function(dispatch) {
    request('/password-reset', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({email})
    }).then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_PASSWORD_PATCH
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`)
        }
      }).catch(err => console.log(err))
    }
  }

export function userResetPassword(resetData) {
  return function(dispatch) {
    dispatch({
      type: USER_RESET_PASSWORD_REQUEST
    });
    request('/password-reset/reset', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(resetData)
    }).then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_RESET_PASSWORD_SUCCESS
          });
        } else {
          dispatch({
            type: USER_RESET_PASSWORD_FAILED
          });
          return Promise.reject(`Ошибка ${res.status}`)
        }
      }).catch(err => console.log(err))
    }
  }

export function userAuth(authData) {
  return function(dispatch) {
    dispatch({
      type: USER_AUTH_REQUEST
    });
    request('/auth/login', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(authData)
    }).then(res => {
        if (res && res.success) {
          setCookie('token', res.refreshToken);
          dispatch({
            type: USER_AUTH_SUCCESS,
            data: {
              token: res.accessToken.split('Bearer ')[1],
              user: res.user
            }
          });
        } else {
          dispatch({
            type: USER_AUTH_FAILED
          });
          return Promise.reject(`Ошибка ${res.status}`)
        }
      }).catch(err => console.log(err))
    }
  }

export function userRefreshToken(){
  return function(dispatch){
    request('/auth/token', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token: getCookie('token')})
    }).then(res => {
      if(res && res.success){
        setCookie('token', res.refreshToken);
        dispatch(getUserData(res.accessToken.split('Bearer ')[1]))
      } else {
        return Promise.reject(`Ошибка ${res.status}`)
      }
    }).catch(err => console.log(err))
  }
}

export function userRegister(registerData) {
  return function(dispatch) {
    dispatch({
      type: USER_REGISTER_REQUEST
    });
    request('/auth/register', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(registerData)
    }).then(res => {
        if (res && res.success) { 
          setCookie('token', res.refreshToken);
          dispatch({
            type: USER_REGISTER_SUCCESS,
            data: {
              token: res.accessToken.split('Bearer ')[1],
              user: res.user
            }
          });
        } else {
          dispatch({
            type: USER_REGISTER_FAILED
          });
          return Promise.reject(`Ошибка ${res.status}`)
        }
      })
      .catch(err => console.log(err))
    }
  }

export function getUserData(token) {
  return function(dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    request('/auth/user', {
      method: 'GET',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + token
      },
    }).then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user
          });
        } else {
          dispatch({
            type: GET_USER_FAILED
          });
          return Promise.reject(`Ошибка ${res.status}`)
        }
      }).catch(err => console.log(err))
    }
  }

export function changeUserData({userData, token}) {
  return function(dispatch) {
    // dispatch();
    request('/auth/user', {
      method: 'PATCH',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(userData)
    }).then(res => {
        if (res && res.success) {
          // dispatch();
        } else {
          // dispatch();
          return Promise.reject(`Ошибка ${res.status}`)
        }
      }).catch(err => console.log(err))
    }
  }

export function userLogout() {
  return function(dispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST
    });
    request('/auth/logout', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token: getCookie('token')})
    }).then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_LOGOUT_SUCCESS
          });
        } else {
          dispatch({
            type: USER_LOGOUT_FAILED
          });
          return Promise.reject(`Ошибка ${res.status}`)
        }
      })
      .catch(err => console.log(err))
    }
  }