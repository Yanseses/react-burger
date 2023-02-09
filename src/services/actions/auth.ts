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
import { TUserData } from '../thunks/auth';


export interface IChangeUserRequest {
  readonly type: typeof CHANGE_USER_REQUEST
}

export interface IChangeUserSuccess {
  readonly type: typeof CHANGE_USER_SUCCESS
  payload: TUserData
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
  payload: TUserData
}

export interface IUserAuthRequest {
  readonly type: typeof USER_AUTH_REQUEST
}

export interface IUserAuthFailed {
  readonly type: typeof USER_AUTH_FAILED
}

export interface IUserAuthSuccess {
  readonly type: typeof USER_AUTH_SUCCESS
  payload: TUserData
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
  payload: TUserData
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

export const changeUserRequest = (): IChangeUserRequest => {
  return {
    type: CHANGE_USER_REQUEST
  }
}

export const changeUserSuccess = (user: TUserData): IChangeUserSuccess => {
  return {
    type: CHANGE_USER_SUCCESS,
    payload: user
  }
}

export const changeUserFailed = (): IChangeUserFailed => {
  return {
    type: CHANGE_USER_FAILED
  }
}

export const getUserRequest = (): IGetUserRequest => {
  return {
    type: GET_USER_REQUEST
  }
}

export const getUserFailed = (): IGetUserFailed => {
  return {
    type: GET_USER_FAILED
  }
}

export const getUserSuccess = (user: TUserData): IGetUserSuccess => {
  return {
    type: GET_USER_SUCCESS,
    payload: user
  }
}

export const userAuthRequest = (): IUserAuthRequest => {
  return {
    type: USER_AUTH_REQUEST
  }
}

export const userAuthFailed = (): IUserAuthFailed => {
  return {
    type: USER_AUTH_FAILED
  }
}

export const userAuthSucces = (user: TUserData): IUserAuthSuccess => {
  return {
    type: USER_AUTH_SUCCESS,
    payload: user
  }
}

export const userLogoutRequest = (): IUserLogoutRequest => {
  return {
    type: USER_LOGOUT_REQUEST
  }
}

export const userLogoutFailed = (): IUserLogoutFailed => {
  return {
    type: USER_LOGOUT_FAILED
  }
}

export const userLogoutSuccess = (): IUserLogoutSuccess => {
  return {
    type: USER_LOGOUT_SUCCESS
  }
}

export const userRegisterRequest = (): IUserRegisterRequest => {
  return {
    type: USER_REGISTER_REQUEST
  }
}

export const userRegisterFailed = (): IUserRegisterFailed => {
  return {
    type: USER_REGISTER_FAILED
  }
}

export const userRegisterSuccess = (user: TUserData): IUserRegisterSuccess => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: user
  }
}

export const userPatchPassword = (): IUserPatchPassword => {
  return {
    type: USER_PASSWORD_PATCH
  }
}

export const userPasswordResetRequest = (): IUserPasswordResetRequest => {
  return {
    type: USER_RESET_PASSWORD_REQUEST
  }
}

export const userPasswordResetFailed = (): IUserPasswordResetFailed => {
  return {
    type: USER_RESET_PASSWORD_FAILED
  }
}

export const userPasswordResetSuccess = (): IUserPasswordResetSuccess => {
  return {
    type: USER_RESET_PASSWORD_SUCCESS
  }
}