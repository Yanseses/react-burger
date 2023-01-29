import styles from './burgerConstructor.module.css';
import { useState, useEffect, FC } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/Modal";
import { Price } from "./Price/Price";
import { OrderDetails } from "../modal/OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "../../services/hooks";
import { approveOrderNumber } from "../../services/actions/main";
import { ConstructorBuns } from './ConstructorBuns/ConstructorBuns';
import { ConstructorMain } from './ConstructorMain/ConstructorMain';
import { useHistory } from 'react-router-dom';
import { IIngridient } from '../../utils/types';
import { ORDER_CHANGE_PRICE } from '../../services/constants/main';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const { order, orderNumber, userAuthorized }: any = useSelector<any>(store => ({
    order: store.main.order,
    orderNumber: store.main.orderNumber,
    userAuthorized: store.auth.userAuthorized
  }));
  
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
  
        // @ts-ignore
        dispatch(approveOrderNumber({ ingredients: orderMain }));
        setIsModalOpen(true)
      }
    } else {
      history.push({
        pathname: '/login'
      })
    }
  }
  
  return (
    <section className={`${styles.main} pt-25 pl-8 pr-4`}>
      <div className={`${styles.constructor}`}>
        <ConstructorBuns type={'top'}/>
        <ConstructorMain />
        <ConstructorBuns type={'bottom'}/> 
      </div>
      <div className={styles.constructor__checkout}>
        <Price />
        <Button 
          htmlType="button" 
          type='primary' 
          size="large"
          onClick={approveOrder}
        >
          Оформить заказ
        </Button>
      </div>
  
      { isModalOpen && orderNumber && (
        <Modal title={''} onClose={() => setIsModalOpen(false)}>
          <OrderDetails />
        </Modal>
        ) 
      }
    </section>
  )
}