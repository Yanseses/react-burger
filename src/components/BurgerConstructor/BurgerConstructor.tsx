import styles from './burgerConstructor.module.css';
import { useState, useEffect, FC, memo, useCallback } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/Modal";
import { Price } from "./Price/Price";
import { useDispatch, useSelector } from "../../services/hooks";
import { approveOrderNumber } from "../../services/thunks/main";
import { ConstructorBuns } from './ConstructorBuns/ConstructorBuns';
import { ConstructorMain } from './ConstructorMain/ConstructorMain';
import { useNavigate } from 'react-router-dom';
import { IIngridient } from '../../utils/types';
import { OrderSuccess } from '../modal/OrderSuccess/OrderSuccess';
import { useMediaQuery } from 'react-responsive';
import { orderChangePrice } from '../../services/actions/main';

export const BurgerConstructor: FC = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' });
  const [ isSuccessModal, setSuccessModal ] = useState<boolean>(false);
  const [ isOrderModal, setOrderModal ] = useState<boolean>(false);
  const order = useSelector(store => store.main.order.data);
  const orderNumber = useSelector(store => store.main.order.successNumber);
  const userAuthorized = useSelector(store => store.auth.user.authorized);
  const price = useSelector(store => store.main.order.price);
  
  useEffect(() => {
    if(order.buns !== null || order.main.length > 0){
      dispatch(orderChangePrice())
    }
  }, [order.main, order.buns, dispatch]);
  
  const handleApproveOrder = useCallback(() => {
    if(userAuthorized){
      if(order.buns !== null && order.main.length){
        const orderMain = order.main
          ? [order.buns._id, ...order.main.map((el: IIngridient) => el._id), order.buns._id]
          : [order.buns._id, order.buns._id];
  
        dispatch(approveOrderNumber({ ingredients: orderMain }));
        setSuccessModal(true)
      }
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, order.buns, order.main, userAuthorized]);

  const handleOpenOrder = useCallback(() => {
    setOrderModal(true)
  }, []);
  
  return (
    <>
      <section className={`${styles.constructor}`}>
        { isMobile ? (
          <div className={styles.constructor__controls_mobile}>
            <Price textSize={'medium'} price={price}/>
            <Button 
              htmlType="button" 
              type='primary' 
              size={'small'}
              onClick={handleOpenOrder}
              >
              { 'Cмотреть заказ' }
            </Button>
          </div>  
          ) : ( 
            <>          
              <div className={styles.constructor__order}>
                <ConstructorBuns type={'top'}/>
                <ConstructorMain />
                <ConstructorBuns type={'bottom'}/> 
              </div>
              <div className={styles.constructor__controls}>
                <Price textSize={'medium'} price={price}/>
                <Button 
                  htmlType="button" 
                  type='primary' 
                  size={'large'}
                  onClick={handleApproveOrder}
                  disabled={ order.main.length > 0 && order.buns !== null ? false : true }
                  >
                  { 'Оформить заказ' }
                </Button>
              </div>
            </>
          )
        }
      </section>

      { isMobile && isOrderModal && (
        <Modal title={'Заказ'} onClose={() => setOrderModal(false)}>
         <section className={`${styles.constructor}`}>
            <div className={`${styles.constructor__order}`}>
              <ConstructorBuns type={'top'}/>
              <ConstructorMain />
              <ConstructorBuns type={'bottom'}/> 
            </div>
            <div className={styles.constructor__controls_mobile}>
              <Price textSize={'medium'} price={price}/>
              <Button 
                htmlType="button" 
                type='primary' 
                size={'small'}
                onClick={handleApproveOrder}
                disabled={ order.main.length > 0 && order.buns !== null ? false : true }
                >
                { 'Оформить заказ' }
              </Button>
            </div>
         </section>
        </Modal>
        )
      }

      { isSuccessModal && orderNumber !== 0 && (
        <Modal title={''} onClose={() => setSuccessModal(false)}>
          <OrderSuccess />
        </Modal>
        ) 
      }
    </>
  )
})