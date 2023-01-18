import { Redirect, Route, useLocation } from 'react-router-dom';
import { getCookie } from '../utils/cookie';
import { FC, PropsWithChildren } from 'react';

type TProtectedRoute = {
  onlyForAuth: boolean
}

export const ProtectedRoute: FC<PropsWithChildren<TProtectedRoute>> = ({ onlyForAuth, children, ...rest }): JSX.Element => {
  const isAuthorized = getCookie('refreshToken');
  const location = useLocation();

  if (!onlyForAuth && isAuthorized) {
    const from  = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !isAuthorized) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return (
    <Route {...rest}>
      {children}
    </Route>
  );
};