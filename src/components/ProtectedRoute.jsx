import { Redirect, Route, useLocation } from 'react-router-dom';
import { getCookie } from '../utils/cookie';

export const ProtectedRoute = ({ onlyForAuth, children, ...rest }) => {
  const isAuthorized = getCookie('refreshToken');
  const location = useLocation();

  if (!onlyForAuth && isAuthorized) {
    const { from } = location.state || { from: { pathname: "/" } };
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