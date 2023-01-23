import Header from '../AppHeader/Header';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { 
  NotFound, 
  Register, 
  ResetPassword, 
  Profile, 
  ForgotPassword, 
  Login, 
  Constructor, 
  Ingridients } from '../../pages/index';
import { ProtectedRoute } from '../ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getIngridientsData } from '../../services/actions/index';
import { getCookie } from '../../utils/cookie';
import { getUserData } from '../../services/actions/auth';
import { Modal } from '../modal/Modal';
import { IngridientDetails } from '../modal/IngredientDetails/IngredientDetails';

export default function App() {
  const history = useHistory();
  const location = useLocation<{modal: Location}>()
  const dispatch = useDispatch();
  const modal = location.state?.modal;

  useEffect(() => {
    if(getCookie('accessToken')){
      // @ts-ignore
      dispatch(getUserData())
    }
    // @ts-ignore
    dispatch(getIngridientsData())
  }, [dispatch]);

  return (
    <>
      <Header />
      <Switch 
      // @ts-ignore
      location={modal || location}>
        <ProtectedRoute path={'/login'} exact>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute path={'/profile'} onlyForAuth exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path={'/profile/orders'} onlyForAuth exact>
          <NotFound />
        </ProtectedRoute>
        <ProtectedRoute path={'/forgot-password'} exact>
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute path={'/register'} exact>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute path={'/reset-password'} exact>
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

      { modal && (
        <Route path={'/ingridients/:id'}>
          <Modal title={'Детали ингридиента'} onClose={() => history.goBack()}>
            <IngridientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}
