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
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { AuthProvider } from './utils/authProvider.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppHeader />
        <Switch>
          <Route path={'/login'} exact>
            <Login />
          </Route>
          <ProtectedRoute path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/history" exact={true}>
            <NotFound />
          </ProtectedRoute>
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
    </AuthProvider>
  );
}
