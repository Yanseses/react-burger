import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from 'prop-types';
import styles from'./ingridientsItem.module.css';
import Modal from "../../../../modal/Modal";

export default function IngridientsItem(props){
  const [ isModalOpen, setIsModalOpen ] = React.useState(false);

  return (
    <>
      <li className={styles.ingridientsItem} onClick={() => setIsModalOpen(true)}>
        <div className={styles.ingridientsItem__head}>
          <img src={props.image} alt={props.name} />
          <div className={styles.ingridientsItem__price}>
            <p className={styles.ingridientsItem__text}>
              {props.price} 
            </p>
            <CurrencyIcon type='primary' />
          </div>

        </div>
        <p className={styles.ingridientsItem__text}>
          {props.name}
        </p>
      </li>
      
      { isModalOpen && (
        <Modal type={'detail'} data={props} onClose={() => setIsModalOpen(false)}/>
        ) 
      } 
    </>
  )
}

IngridientsItem.propTypes = {
  props: propTypes.shape({
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
  })
}