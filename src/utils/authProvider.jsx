import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from './cookie';
import { getUserData, userRefreshToken } from '../services/actions/auth';

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if(getCookie('token')){
      if(!token){
        dispatch(userRefreshToken())
      } else {
        dispatch(getUserData(token))
      }
    }
  }, [])

  return ( 
    children 
  )
}