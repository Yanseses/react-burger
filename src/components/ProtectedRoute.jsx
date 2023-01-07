import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../utils/cookie';

export function ProtectedRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        getCookie('refreshToken')
        ? location.pathname == '/login'
          || location.pathname == '/register' 
          || location.pathname == '/forgot-password' 
          || location.pathname == '/reset-password' 
            ? ( <Redirect to={{
                  pathname: '/profile',
                  state: { from: location }
                  }} 
                /> 
              )
            : ( children )
        : location.pathname == '/login'
          || location.pathname == '/register' 
          || location.pathname == '/forgot-password' 
          || location.pathname == '/reset-password'
          ? ( children )
          : ( 
            <Redirect to={{
              pathname: '/login',
              state: { from: location }
            }}/>
          )
      }
    />
  );
}