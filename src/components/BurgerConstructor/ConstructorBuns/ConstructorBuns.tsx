import { FC, memo } from 'react';
import styles from './constructorBuns.module.css';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "../../../services/hooks";
import { IIngridient } from '../../../utils/types';
import { orderBunsChange } from '../../../services/actions/main';
import { Text } from '../../Text/Text';

type TBunsType = {
  type: 'top' | 'bottom' | undefined
}

export const ConstructorBuns: FC<TBunsType> = memo(({ type }) => {
  const dispatch = useDispatch();
  const buns = useSelector(state => state.main.order.data.buns)
  const [{ isHoverBuns } , bunsDrop] = useDrop<
    IIngridient, 
    unknown,
    { isHoverBuns: boolean }
  >({
    accept: 'bun',
    collect: monitor => ({
      isHoverBuns: monitor.isOver(),
    }),
    drop(item: IIngridient) {
      dispatch(orderBunsChange(item))
    },
  });

  const defaultBuns = (
    <div className={`
      ${styles.buns__default} 
      ${ type === 'top' ? styles.buns__top : styles.buns__bottom }
      ${ isHoverBuns ? styles.buns__hovered : '' }
      `}
      id={type}>
        <Text As='p' textSize='small'>
          Перетащите булку
        </Text>
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
})