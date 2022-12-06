import React from "react";
import propTypes from 'prop-types';
import styles from './burgerConstructor.module.css';
import { ingredientType } from "../../../utils/types";
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/Modal";
import Price from "./Price/Price";
import OrderDetails from "../../modal/OrderDetails/OrderDetails";

export default function BurgerConstructor(props){
  const [ isModalOpen, setIsModalOpen ] = React.useState(false);
  const [ order, setOrder ] = React.useState({
    buns: null,
    main: null,
    price: 0
  });

  React.useEffect(() => {
    // Разбиваем массив данных
    if(props.data){
      const buns = props.data.find(el => el.type == 'bun');
      const main = props.data.filter(el => el.type !== 'bun');
      setOrder({...order, buns, main});
    }
  }, [props]);

  React.useEffect(() => {
    // Изменяем общую цену
    if(order.buns !== null && order.main !== null){
      let bunsPrice = order.buns ? order.buns.price * 2 : 0;
      let mainPrice = order.main.reduce((acc, num) => acc + num.price, 0)
      setOrder({...order, price: mainPrice + bunsPrice})
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
        <div className={styles.constructor__list}>
        { order.main !== null && 
          order.main.map(element => {
            return ( 
            <div 
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
            </div>
            )
          }) 
        }
        </div>
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
        <Price price={order.price} />
        <Button 
          htmlType="button" 
          type="primary" 
          size="large"
          onClick={() => setIsModalOpen(true)}
        >
          Оформить заказ
        </Button>
      </div>

      { isModalOpen && (
        <Modal title={''} onClose={() => setIsModalOpen(false)}>
          <OrderDetails order={'034536'}/>
        </Modal>
        ) 
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: propTypes.arrayOf(ingredientType)
}