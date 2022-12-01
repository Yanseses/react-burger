import React from "react";
import propTypes from 'prop-types';
import styles from './burgerConstructor.module.css';
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor(props){
  const handleClose = () => {
    console.log(`ingridient removed`)
  }

  return (
    <section className="pt-25 pl-8 pr-4">
      <div className={styles.constructor}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`Флюоресцентная булка R2-D3 (верх)`}
          price={988}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
          />
        <div className={styles.constructor__list}>
        { props.data && props.data.map((element, index) => {
          if(element.type !== 'bun'){
            return (
              <div key={element._id} className={styles.constructor__listItem}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                  handleClose={handleClose}
                />
              </div>
              )
            }
          })
        }
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`Флюоресцентная булка R2-D3 (низ)`}
          price={988}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
          />
      </div>
      <div className={`mt-10 ${styles.constructor__checkout}`}>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
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