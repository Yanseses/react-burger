import React from "react";
import styles from './burgerConstructor.module.css';
import { BURGER_API_URL } from "../../../utils/api";
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngridientsContext } from "../../../context/ingridientsContext";
import Modal from "../../modal/Modal";
import Price from "./Price/Price";
import OrderDetails from "../../modal/OrderDetails/OrderDetails";

export default function BurgerConstructor(){
  const { order, setOrder } = React.useContext(IngridientsContext);
  const [ isModalOpen, setIsModalOpen ] = React.useState(false);

  React.useEffect(() => {
    // Изменяем общую цену
    if(order.buns !== null && order.main !== null){
      let bunsPrice = order.buns ? order.buns.price * 2 : 0;
      let mainPrice = order.main.reduce((acc, num) => acc + num.price, 0)
      setOrder({...order, price: bunsPrice + mainPrice})
    }
  }, [order.main, order.buns]);

  const handleRemove = React.useCallback((e) => {
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
  
      fetch(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(ingredients)
      }).then(el => {
        if(el.ok){
          return el.json();
        } else {
          throw new Error(el.status)
        }
      }).then(el => {
        if(el.success){
          setOrder({price: 0, buns: null, main: null, number: el.order.number})
          setIsModalOpen(true);
        } else {
          throw new Error('Ошибка сборки бургера')
        }
      }).catch(err => {
        console.log('Error --> ' + err);
      })
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
        { order.main !== null && 
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

      { isModalOpen && (
        <Modal title={''} onClose={() => setIsModalOpen(false)}>
          <OrderDetails />
        </Modal>
        ) 
      }
    </section>
  )
}