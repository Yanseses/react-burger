import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from 'prop-types';
import { ingredientType } from "../../../../../utils/types";
import styles from'./ingridientsItem.module.css';

export default function IngridientsItem(props){
  return (
      <li className={styles.ingridientsItem} id={props._id} onClick={props.onClick}>
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
  )
}

IngridientsItem.propTypes = {
  props: ingredientType
}