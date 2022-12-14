import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { ingredientType } from "../../../../utils/types";
import styles from'./ingridientsItem.module.css';

export default function IngridientsItem(props){
  const { image, _id, name, price, onClick, type, __v = 0 } = props;
  const [{ opacity }, ref] = useDrag({
    type: type == 'bun' ? 'bun' : 'main',
    item: props ,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
      <li 
        className={styles.ingridientsItem} 
        style={{opacity}}
        ref={ref} 
        id={_id} 
        onClick={onClick}>
        <div className={styles.ingridientsItem__head}>
          <img src={image} alt={name} />
          <div className={styles.ingridientsItem__price}>
            <p className={styles.ingridientsItem__text}>
              {price}
            </p>
            <CurrencyIcon type='primary' />
          </div>

        </div>
        <p className={styles.ingridientsItem__text}>
          {name}
        </p>
        { __v > 0 && (
          <Counter count={__v} size="small" />
          ) 
        }
      </li>
  )
}

IngridientsItem.propTypes = {
  props: ingredientType
}