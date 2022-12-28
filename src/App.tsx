import AppHeader from './components/AppHeader/Header.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { 
  NotFound, 
  Register, 
  ResetPassword, 
  Profile, 
  ForgotPassword, 
  Login, 
  Constructor, 
  Ingridients } from './pages';

export default function App() {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path={'/login'} exact>
          <Login />
        </Route>
        <Route path={'/profile'} exact>
          <Profile />
        </Route>
        <Route path={'/forgot-password'} exact>
          <ForgotPassword />
        </Route>
        <Route path={'/register'} exact>
          <Register />
        </Route>
        <Route path={'/reset-password'} exact>
          <ResetPassword />
        </Route>
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
    </Router>
  );
}
