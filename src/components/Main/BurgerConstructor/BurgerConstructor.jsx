import styles from './burgerConstructor.module.css';
import { useState, useEffect, useCallback, useContext } from "react";
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngridientsContext } from "../../../context/ingridientsContext";
import Modal from "../../modal/Modal";
import Price from "./Price/Price";
import OrderDetails from "../../modal/OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { approveOrderNumber, ORDER_CHANGE_PRICE } from "../../../services/actions";

export default function BurgerConstructor(){
  const dispatch = useDispatch();
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const { ordere, orderNumber } = useSelector(store => ({
    ordere: store.main.order,
    orderNumber: store.main.orderNumber
  }));
  const { order, setOrder } = useContext(IngridientsContext);

  useEffect(() => {
    if(order.buns !== null && order.main !== null){
      let bunsPrice = order.buns ? order.buns.price * 2 : 0;
      let mainPrice = order.main.reduce((acc, num) => acc + num.price, 0)
      dispatch({
        type: ORDER_CHANGE_PRICE,
        price: bunsPrice + mainPrice
      })
    }
  }, [order.main, order.buns, ordere.main, ordere.buns]);

  const handleRemove = useCallback((e) => {
    const clickedElem = String(e.nativeEvent.path[5].id);
    const newOrder = order.main.filter(el => {
      if(el._id !== clickedElem){
        return el;
      }
    });
    setOrder({...order, main: newOrder})
  });

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
        { order.buns !== null && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${order.buns.name} (верх)`}
            price={order.buns.price}
            thumbnail={order.buns.image}
          />
          ) 
        }
        <ul className={styles.constructor__list}>
        { order.main.length && 
          order.main.map(element => {
            return ( 
            <li 
              id={element._id}
              key={element._id} 
              className={styles.constructor__listItem}
              >
              <DragIcon type="primary" />
              <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image}
                handleClose={handleRemove}
              />
            </li>
            )
          }) 
        }
        </ul>
        { order.buns !== null && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${order.buns.name} (низ)`}
            price={order.buns.price}
            thumbnail={order.buns.image}
          />  
          ) 
        }
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