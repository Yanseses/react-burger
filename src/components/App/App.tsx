import Header from '../AppHeader/Header';
import { Route, useLocation, Routes, useNavigate } from 'react-router-dom';
import { 
  NotFound, 
  Register, 
  ResetPassword, 
  Profile, 
  ForgotPassword, 
  Login, 
  Constructor, 
  Ingridients,
  Feed } from '../../pages/index';
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
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
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
      <Routes location={modal || location}>
        <Route path={'/login'} element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        } />
        <Route path={'/forgot-password'} element={
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        } />
        <Route path={'/register'} element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        } />
        <Route path={'/reset-password'} element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        } />
        <Route path='/profile/orders/:id' element={ 
          <ProtectedRoute onlyForAuth>
            <DetailOrder />
          </ProtectedRoute>
        } />
        <Route path={'/profile/*'} element={ 
          <ProtectedRoute onlyForAuth>
           <Profile /> 
          </ProtectedRoute>
        } />
        <Route path={'/feed'} element={ <Feed /> } />
        <Route path={'/feed/:id'} element={ <DetailOrder /> } />
        <Route path={'/ingridients/:id'} element={ <Ingridients /> } />   
        <Route path={'/'} element={<Constructor />} />
        <Route element={ <NotFound /> } />
      </Routes>

      { modal && (
        <>
        <Routes>
          <Route path={'/ingridients/:id'} element={
            <Modal 
              title={'Детали ингридиента'} 
              onClose={() => navigate('/')}
              >
              <IngridientDetails />
            </Modal>
          } />
          <Route path={'/feed/:id'} element={
            <Modal 
              title={`#${location.pathname.split('/', 3)[2]}`} 
              onClose={() => navigate('/feed/')}
              titleStyle={'text_type_digits-default'}
              >
              <OrderDetails />
            </Modal>
          }/>
          <Route path={'/profile/orders/:id'} element={
            <Modal 
              title={`#${location.pathname.split('/', 4)[3]}`} 
              onClose={() => navigate('/profile/orders/')}
              titleStyle={'text_type_digits-default'}
              >
              <OrderDetails />
            </Modal>
          } />
        </Routes>
        </>
      )}
    </>
  );
}
