import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from'./ingridientsItem.module.css';
import Modal from "../../../../modal/Modal";

export default function IngridientsItem(props){
  const [ isOpen, setIsOpen ] = React.useState(false);

  return (
    <li className={styles.ingridientsItem} onClick={() => setIsOpen(true)}>
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

      { isOpen && (
        <Modal type={'detail'} data={props} onClose={() => setIsOpen(false)}/>
        ) 
      }
    </li>
  )
}