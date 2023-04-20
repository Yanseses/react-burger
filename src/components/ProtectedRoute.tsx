import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../utils/cookie';
import { FC, PropsWithChildren } from 'react';

type TProtectedRoute = {
  onlyForAuth?: boolean
};

export const ProtectedRoute: FC<PropsWithChildren<TProtectedRoute>> = ({ onlyForAuth = false, children }) => {
  const isAuthorized = getCookie('refreshToken');
  const location = useLocation();

  if (!onlyForAuth && isAuthorized) {
    const from  = location.state || '/';
    return (
      <Navigate to={from} />
    );
  }

  if (onlyForAuth && !isAuthorized) {
    return (
      <Navigate to={'/login'} state={{from: location}}/>
    );
  }

  return (
    <>
      { children }
    </>
  );
};