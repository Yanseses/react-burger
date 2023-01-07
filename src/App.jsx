import AppHeader from './components/AppHeader/Header.jsx';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { 
  NotFound, 
  Register, 
  ResetPassword, 
  Profile, 
  ForgotPassword, 
  Login, 
  Constructor, 
  Ingridients } from './pages';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getIngridientsData } from './services/actions/index.js';
import { getCookie } from './utils/cookie.js';
import { getUserData } from './services/actions/auth.js';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(getCookie('accessToken')){
      dispatch(getUserData())
    }
    dispatch(getIngridientsData())
  }, []);

  return (
    <BrowserRouter>
      <AppHeader />
      <Switch>
        <ProtectedRoute path={'/login'} exact={true}>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute path={'/profile'} exact={true}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path={'/profile/orders'} exact={true}>
          <NotFound />
        </ProtectedRoute>
        <ProtectedRoute path={'/forgot-password'} exact={true}>
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute path={'/register'} exact={true}>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute path={'/reset-password'} exact={true}>
          <ResetPassword />
        </ProtectedRoute>
        <Route path={'/ingridients/:id'} exact>
          <Ingridients />
        </Route>
        <Route path={'/'} exact>
          <Constructor />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
