import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { request } from "../api";
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
import { AppDispatch } from "../types";

type TErrorStatus = {
  statusText?: string
}

type TUserData = {
  name: string,
  email: string,
  password?: string
}

type TAuthResponse = {
  accessToken: string,
  refreshToken: string,
  user: TUserData,
} & TErrorStatus;

type TUserResponse = {
  user: TUserData,
} & TErrorStatus;

type TResponseWithMessage = {
  message: string
} & TErrorStatus;

type TResetPassword = {
  password: string,
  token: string,
} & TErrorStatus;

export interface IChangeUserRequest {
  readonly type: typeof CHANGE_USER_REQUEST
}

export interface IChangeUserSuccess {
  readonly type: typeof CHANGE_USER_SUCCESS
  user: TUserData
}

export interface IChangeUserFailed {
  readonly type: typeof CHANGE_USER_FAILED
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS
  user: TUserData
}

export interface IUserAuthRequest {
  readonly type: typeof USER_AUTH_REQUEST
}

export interface IUserAuthFailed {
  readonly type: typeof USER_AUTH_FAILED
}

export interface IUserAuthSuccess {
  readonly type: typeof USER_AUTH_SUCCESS
  user: TUserData
}

export interface IUserLogoutRequest {
  readonly type: typeof USER_LOGOUT_REQUEST
}

export interface IUserLogoutFailed {
  readonly type: typeof USER_LOGOUT_FAILED
}

export interface IUserLogoutSuccess {
  readonly type: typeof USER_LOGOUT_SUCCESS
}

export interface IUserRegisterRequest {
  readonly type: typeof USER_REGISTER_REQUEST
}

export interface IUserRegisterFailed {
  readonly type: typeof USER_REGISTER_FAILED
}

export interface IUserRegisterSuccess {
  readonly type: typeof USER_REGISTER_SUCCESS
  user: TUserData
}

export interface IUserPatchPassword {
  readonly type: typeof USER_PASSWORD_PATCH
}

export interface IUserPasswordResetRequest {
  readonly type: typeof USER_RESET_PASSWORD_REQUEST
}

export interface IUserPasswordResetFailed {
  readonly type: typeof USER_RESET_PASSWORD_FAILED
}

export interface IUserPasswordResetSuccess {
  readonly type: typeof USER_RESET_PASSWORD_SUCCESS
}

export type TAuthActions = IUserPasswordResetSuccess
  | IUserPasswordResetFailed
  | IUserPasswordResetRequest
  | IUserPatchPassword
  | IUserRegisterSuccess
  | IUserRegisterFailed
  | IUserRegisterRequest
  | IUserLogoutSuccess
  | IUserLogoutFailed
  | IUserLogoutRequest 
  | IUserAuthSuccess
  | IUserAuthFailed
  | IUserAuthRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IGetUserRequest
  | IChangeUserFailed
  | IChangeUserSuccess
  | IChangeUserRequest

export function userRegister(registerData: TUserData) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: USER_REGISTER_REQUEST
    });
    request<TAuthResponse>('/auth/register', {
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
      console.log(res)
      if(res && res.success){ 
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        dispatch({
          type: USER_REGISTER_SUCCESS,
          user: res.user
        });
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      console.log(err)
      dispatch({
        type: USER_REGISTER_FAILED
      });
    })
  }
}

export function userAuth(authData: TUserData) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: USER_AUTH_REQUEST
    });
    request<TAuthResponse>('/auth/login', {
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
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        dispatch({
          type: USER_AUTH_SUCCESS,
          user: res.user
        });
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      console.log(err)
      dispatch({
        type: USER_AUTH_FAILED
      });
    })
  }
}

export function getUserData() {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    request<TUserResponse>('/auth/user', {
      method: 'GET',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
    }).then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user
          });
        } else {
          return Promise.reject(`Ошибка ${res.statusText}`)
        }
    }).catch(err => {
      console.log(err)
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      dispatch({
        type: GET_USER_FAILED
      });
      // @ts-ignore
      dispatch(userRefreshToken());
    })
  }
}

export function userRefreshToken(){
  return function(dispatch: AppDispatch){
    request<TAuthResponse>('/auth/token', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token: getCookie('refreshToken')})
    }).then(res => {
      if(res && res.success){
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        // @ts-ignore
        dispatch(getUserData())
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => console.log(err))
  }
}

export function changeUserData(userData: TUserData) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: CHANGE_USER_REQUEST
    });
    request<TUserResponse>('/auth/user', {
      method: 'PATCH',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify(userData)
    }).then(res => {
      if (res && res.success) {
        dispatch({
          type: CHANGE_USER_SUCCESS,
          user: res.user
        });
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      console.log(err)
      dispatch({
        type: CHANGE_USER_FAILED
      });
    })
  }
}

export function userLogout() {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST
    });
    request<TResponseWithMessage>('/auth/logout', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token: getCookie('refreshToken')})
    }).then(res => {
      console.log(res)
      if (res && res.success) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch({
          type: USER_LOGOUT_SUCCESS
        });
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      console.log(err)
      dispatch({
        type: USER_LOGOUT_FAILED
      });
    })
  }
}

export function userForgotPassword(email: string) {
  return function(dispatch: AppDispatch) {
    request<TResponseWithMessage>('/password-reset', {
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
      console.log(res)
      if (res && res.success) {
        dispatch({
          type: USER_PASSWORD_PATCH
        });
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => console.log(err))
  }
}

export function userResetPassword(resetData: TResetPassword) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: USER_RESET_PASSWORD_REQUEST
    });
    request<TResponseWithMessage>('/password-reset/reset', {
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
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      console.log(err)
      dispatch({
        type: USER_RESET_PASSWORD_FAILED
      });
    })
  }
}