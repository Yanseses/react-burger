import { request } from "../api";

export function userForgotPassword(email) {
  return function(dispatch) {
    // dispatch();
    request('/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({email})
    })
      .then(res => {
        if (res && res.success) {
          // dispatch();
        } else {
          // dispatch();
          return Promise.reject(`Ошибка ${res.status}`)
        }
      })
      .catch(err => console.log(err))
    }
  }

export function userResetPassword(resetData) {
  return function(dispatch) {
    // dispatch();
    request('/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(resetData)
    })
      .then(res => {
        if (res && res.success) {
          // dispatch();
        } else {
          // dispatch();
          return Promise.reject(`Ошибка ${res.status}`)
        }
      })
      .catch(err => console.log(err))
    }
  }

export function userAuth(authData) {
  return function(dispatch) {
    // dispatch();
    request('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(authData)
    })
      .then(res => {
        if (res && res.success) {
          console.log(res)
          // dispatch();
        } else {
          // dispatch();
          return Promise.reject(`Ошибка ${res.status}`)
        }
      })
      .catch(err => console.log(err))
    }
  }

export function userRegister(registerData) {
  return function(dispatch) {
    // dispatch();
    request('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(registerData)
    })
      .then(res => {
        if (res && res.success) {
          // dispatch();
        } else {
          // dispatch();
          return Promise.reject(`Ошибка ${res.status}`)
        }
      })
      .catch(err => console.log(err))
    }
  }