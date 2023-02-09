import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { request } from "../api";
import { AppDispatch } from "../types";
import { 
  changeUserFailed, 
  changeUserRequest, 
  changeUserSuccess, 
  getUserFailed, 
  getUserRequest, 
  getUserSuccess, 
  userAuthFailed, 
  userAuthRequest, 
  userAuthSucces, 
  userLogoutFailed, 
  userLogoutRequest, 
  userLogoutSuccess, 
  userPasswordResetFailed, 
  userPasswordResetRequest, 
  userPasswordResetSuccess, 
  userPatchPassword, 
  userRegisterFailed, 
  userRegisterRequest, 
  userRegisterSuccess 
} from "../actions/auth";

export type TUserData = {
  [n: string]: string
}

type TErrorStatus = {
  statusText?: string
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

export function userRegister(registerData: TUserData) {
  return function(dispatch: AppDispatch) {
    dispatch(userRegisterRequest());
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
      if(res && res.success){ 
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        dispatch(userRegisterSuccess(res.user));
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      console.log(err)
      dispatch(userRegisterFailed());
    })
  }
}

export function userAuth(authData: TUserData) {
  return function(dispatch: AppDispatch) {
    dispatch(userAuthRequest());
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
        dispatch(userAuthSucces(res.user));
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      console.log(err)
      dispatch(userAuthFailed());
    })
  }
}

export function getUserData() {
  return function(dispatch: AppDispatch) {
    dispatch(getUserRequest());
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
        dispatch(getUserSuccess(res.user));
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      console.log(err)
      deleteCookie('accessToken');
      dispatch(getUserFailed());
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
        dispatch(getUserData())
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      deleteCookie('refreshToken')
      console.log(err)
    })
  }
}

export function changeUserData(userData: TUserData) {
  return function(dispatch: AppDispatch) {
    dispatch(changeUserRequest());
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
        dispatch(changeUserSuccess(res.user));
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      console.log(err)
      dispatch(changeUserFailed());
    })
  }
}

export function userLogout() {
  return function(dispatch: AppDispatch) {
    dispatch(userLogoutRequest());
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
      if (res && res.success) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(userLogoutSuccess());
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      console.log(err)
      dispatch(userLogoutFailed());
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
      if (res && res.success) {
        dispatch(userPatchPassword());
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => console.log(err))
  }
}

export function userResetPassword(resetData: TUserData) {
  return function(dispatch: AppDispatch) {
    dispatch(userPasswordResetRequest());
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
        dispatch(userPasswordResetSuccess());
      } else {
        return Promise.reject(`Ошибка ${res.statusText}`)
      }
    }).catch(err => {
      console.log(err)
      dispatch(userPasswordResetFailed());
    })
  }
}