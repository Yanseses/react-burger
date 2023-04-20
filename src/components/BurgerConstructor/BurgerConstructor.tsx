import styles from './burgerConstructor.module.css';
import { useState, useEffect, FC } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/Modal";
import { Price } from "./Price/Price";
import { useDispatch, useSelector } from "../../services/hooks";
import { approveOrderNumber } from "../../services/thunks/main";
import { ConstructorBuns } from './ConstructorBuns/ConstructorBuns';
import { ConstructorMain } from './ConstructorMain/ConstructorMain';
import { useNavigate } from 'react-router-dom';
import { IIngridient } from '../../utils/types';
import { ORDER_CHANGE_PRICE } from '../../services/actionTypes/main';
import { OrderSuccess } from '../modal/OrderSuccess/OrderSuccess';
import { Loader } from '../Loader/Loader';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const request = useSelector(store => store.main.order.request);
  const order = useSelector(store => store.main.order.data);
  const orderNumber = useSelector(store => store.main.order.successNumber);
  const userAuthorized = useSelector(store => store.auth.user.authorized);
  const price = useSelector(store => store.main.order.price)
  
  useEffect(() => {
    if(order.buns !== null || order.main.length > 0){
      dispatch({
        type: ORDER_CHANGE_PRICE
      })
    }
  }, [order.main, order.buns, dispatch]);
  
  const approveOrder = () => {
    if(userAuthorized){
      if(order.buns !== null && order.main.length){
        const orderMain = order.main
          ? [order.buns._id, ...order.main.map((el: IIngridient) => el._id), order.buns._id]
          : [order.buns._id, order.buns._id];
  
        dispatch(approveOrderNumber({ ingredients: orderMain }));
        setIsModalOpen(true)
      }
    } else {
      navigate('/login')
    }
  }

  
  return (
    <section className={`${styles.constructor} pt-25 pl-8 pr-4`}>
      <div className={`${styles.constructor__order}`}>
        <ConstructorBuns type={'top'}/>
        <ConstructorMain />
        <ConstructorBuns type={'bottom'}/> 
      </div>
      <div className={styles.constructor__controls}>
        <Price textSize={'medium'} price={price}/>
        <Button 
          htmlType="button" 
          type='primary' 
          size="large"
          onClick={approveOrder}
          disabled={ order.main.length > 0 && order.buns !== null ? false : true }
        >
          Оформить заказ
        </Button>
      </div>
  
      { isModalOpen && orderNumber !== 0 && (
        <Modal title={''} onClose={() => setIsModalOpen(false)}>
          <OrderSuccess />
        </Modal>
        ) 
      }

      { request && (
        <Loader />  
        ) 
      }
    </section>
  )
}