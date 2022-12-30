import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
  const userAuthorized = useSelector(state => state.auth.userAuthorized);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userAuthorized 
        ? ( children )
        : ( <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}