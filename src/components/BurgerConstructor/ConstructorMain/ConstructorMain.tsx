import styles from './constructorMain.module.css';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addIngridientOrder, ORDER_MAIN_DELETE } from "../../../services/actions";
import { useCallback, FC } from 'react';
import ConstructorMainItem from './ConstructorMainItem/ConstructorMainItem';
import { IIngridient } from '../../../utils/types';

export const ConstructorMain: FC = () => {
  const dispatch = useDispatch();
  const main: any = useSelector<any>(state => state.main.order.main);
  const [{ isHoverMain } , mainDrop] = useDrop<
    IIngridient, 
    unknown, 
    { item: IIngridient, isHoverMain: boolean }
    >({
    accept: 'main',
    collect: (monitor) => ({
      item: monitor.getItem(),
      isHoverMain: monitor.isOver(),
    }),
    drop(item: IIngridient) {
      if(!item.hasOwnProperty('index')){
        dispatch(addIngridientOrder(item))
      }
    },
  });
  
  const handleRemove = useCallback((e: string | undefined) => {
    dispatch({
      type: ORDER_MAIN_DELETE,
      deleteIngridient: e
    })
  }, [dispatch]);
  
  const defaultIngridients = (
    <li className={`${styles.main__default} ${isHoverMain ? styles.main__hovered : ''}`}>
      Перетащите ингридиенты
    </li>
  )
  
  return (
    <ul className={styles.main} ref={mainDrop}>
      { main.length > 0
        ? main.map((element: IIngridient, i: number) => (
          <ConstructorMainItem 
            index={i}
            key={element.id}
            element={element}
            onClick={handleRemove}
          />
        )) 
        : defaultIngridients
      }
    </ul>
  )
}