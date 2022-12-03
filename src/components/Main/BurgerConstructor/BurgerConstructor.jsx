import React from "react";
import propTypes from 'prop-types';
import styles from './burgerConstructor.module.css';
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/Modal";

export default function BurgerConstructor({data}){
  const [ isModalOpen, setIsModalOpen ] = React.useState(false);
  const [ order, setOrder ] = React.useState({
    buns: [],
    main: []
  });

  // Сделать элемент общей цены

  React.useEffect(() => {
    const buns = data.find(el => el.type == 'bun');
    const main = data.filter(el => el.type !== 'bun');
    setOrder({buns, main});
  }, [data])

  const handleRemove = (e) => {
    const clickedElem = String(e.nativeEvent.path[5].id);
    const newOrder = order.main.filter(el => {
      if(el._id !== clickedElem){
        return el;
      }
    });
    setOrder({...order, main: newOrder})
  }

  return (
    <section className="pt-25 pl-8 pr-4">
      <div className={styles.constructor}>
        { order.buns && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={order.buns.name}
            price={order.buns.price}
            thumbnail={order.buns.image}
          />
          ) 
        }
        <div className={styles.constructor__list}>
        { order.main && 
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
        { order.buns && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={order.buns.name}
            price={order.buns.price}
            thumbnail={order.buns.image}
          />  
          ) 
        }
      </div>
      <div className={`mt-10 ${styles.constructor__checkout}`}>
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
        <Modal type={'order'} onClose={() => setIsModalOpen(false)}/>
        ) 
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: propTypes.arrayOf(propTypes.shape({
    calories: propTypes.number,
    carbohydrates: propTypes.number,
    fat: propTypes.number,
    image: propTypes.string.isRequired,
    image_large: propTypes.string,
    image_mobile: propTypes.string,
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    proteins: propTypes.number,
    type: propTypes.string.isRequired,
    _id: propTypes.string.isRequired
  })).isRequired
}