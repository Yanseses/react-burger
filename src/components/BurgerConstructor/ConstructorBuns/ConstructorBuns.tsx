import { FC } from 'react';
import styles from './constructorBuns.module.css';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { IIngridient } from '../../../utils/types';
import { ORDER_BUNS_CHANGE } from '../../../services/constants/ingridients';

type TBunsType = {
  type: 'top' | 'bottom' | undefined
}

export const ConstructorBuns: FC<TBunsType> = ({ type }) => {
  const dispatch = useDispatch();
  const buns: any = useSelector<any>(state => state.main.order.buns)
  const [{ isHoverBuns } , bunsDrop] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHoverBuns: monitor.isOver(),
    }),
    drop(item: IIngridient | unknown) {
      dispatch({
        type: ORDER_BUNS_CHANGE,
        data: item
      })
    },
  });

  const defaultBuns = (
    <div className={`
      ${styles.buns__default} 
      ${ type === 'top' ? styles.buns__top : styles.buns__bottom }
      ${ isHoverBuns ? styles.buns__hovered : '' }
      `}>
        Перетащите булку
    </div>
  )

  return (
    <div className={styles.buns} ref={bunsDrop}>
      { buns !== null 
        ? <ConstructorElement
            type={type}
            isLocked={true}
            text={`${buns.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
            price={buns.price}
            thumbnail={buns.image}
          />
        : defaultBuns
      }
    </div>
  )
}