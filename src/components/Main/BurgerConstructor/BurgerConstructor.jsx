import styles from './burgerConstructor.module.css';
import { useState, useEffect } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/Modal";
import Price from "./Price/Price";
import OrderDetails from "../../modal/OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { approveOrderNumber, ORDER_CHANGE_PRICE } from "../../../services/actions";
import ConstructorBuns from './ConstructorBuns/ConstructorBuns';
import ConstructorMain from './ConstructorMain/ConstructorMain';

export default function BurgerConstructor(){
  const dispatch = useDispatch();
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const { order, orderNumber } = useSelector(store => ({
    order: store.main.order,
    orderNumber: store.main.orderNumber
  }));

  useEffect(() => {
    if(order.buns != null || order.main.length > 0){
      dispatch({
        type: ORDER_CHANGE_PRICE
      })
    }
  }, [order.main, order.buns]);

  const approveOrder = () => {
    if(order.buns !== null){
      const orderMain = order.main
        ? [order.buns._id, ...order.main.map(el => el._id), order.buns._id]
        : [order.buns._id, order.buns._id];
      const ingredients = { ingredients: orderMain };

      dispatch(approveOrderNumber(ingredients));
      setIsModalOpen(true)
    }
  }

  return (
    <section className={`${styles.main} pt-25 pl-8 pr-4`}>
      <div className={styles.constructor}>
        <ConstructorBuns type={'top'}/>
        <ConstructorMain />
        <ConstructorBuns type={'bottom'}/> 
      </div>
      <div className={styles.constructor__checkout}>
        <Price />
        <Button 
          htmlType="button" 
          type="primary" 
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