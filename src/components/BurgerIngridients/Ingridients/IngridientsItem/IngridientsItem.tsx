import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import styles from'./ingridientsItem.module.css';
import { FC } from "react";
import { IIngridient } from "../../../../utils/types";

export const IngridientsItem: FC<IIngridient> = (props) => {
  const { image, _id, name, price, type, counter = 0 } = props;
  const [{ opacity }, ref] = useDrag({
    type: type === 'bun' ? 'bun' : 'main',
    item: props,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <li 
      className={styles.ingridientsItem} 
      style={{opacity}}
      ref={ref} 
      id={_id}>
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
      
      { counter > 0 && (
        <Counter count={counter} size="small" />
        ) 
      }
    </li>
  )
}