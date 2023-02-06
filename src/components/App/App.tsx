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
  Ingridients,
  Feed,
  History } from '../../pages/index';
import { ProtectedRoute } from '../ProtectedRoute';
import { useDispatch } from '../../services/hooks';
import { useEffect } from 'react';
import { getIngridientsData } from '../../services/thunks/main';
import { getCookie } from '../../utils/cookie';
import { getUserData } from '../../services/thunks/auth';
import { Modal } from '../modal/Modal';
import { IngridientDetails } from '../modal/IngredientDetails/IngredientDetails';
import DetailOrder from '../../pages/DetailOrder/DetailOrder';
import { OrderDetails } from '../modal/OrderDetails/OrderDetails';

export default function App() {
  const history = useHistory();
  const location = useLocation<{modal: Location}>()
  const dispatch = useDispatch();
  const modal = location.state?.modal;

  useEffect(() => {
    if(getCookie('refreshToken')){

      dispatch(getUserData())
    }

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
          <History />
        </ProtectedRoute>
        <ProtectedRoute path={'/profile/orders/:id'} onlyForAuth exact>
          <DetailOrder />
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
        <Route path={'/feed'} exact>
          <Feed />
        </Route>
        <Route path={'/feed/:id'} exact>
          <DetailOrder />
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

      { modal && (
        <>
          <Route path={'/ingridients/:id'}>
            <Modal 
              title={'Детали ингридиента'} 
              onClose={() => history.goBack()}
              >
              <IngridientDetails />
            </Modal>
          </Route>
          <Route path={'/feed/:id'}>
            <Modal 
              title={'#034533'} 
              onClose={() => history.goBack()}
              titleStyle={'text_type_digits-default'}
              >
              <OrderDetails />
            </Modal>
          </Route>
          <Route path={'/profile/orders/:id'}>
            <Modal 
              title={'#034533'} 
              onClose={() => history.goBack()}
              titleStyle={'text_type_digits-default'}
              >
              <OrderDetails />
            </Modal>
          </Route>
        </>
      )}
    </>
  );
}
