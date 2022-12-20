import styles from './constructorMain.module.css';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addIngridientOrder, ORDER_MAIN_DELETE } from "../../../../services/actions";
import { useCallback } from 'react';
import ConstructorMainItem from './ConstructorMainItem/ConstructorMainItem';

export default function ConstructorMain(){
  const dispatch = useDispatch();
  const main = useSelector(state => state.main.order.main);
  const [{ isHoverMain } , mainDrop] = useDrop({
    accept: 'main',
    collect: monitor => ({
      isHoverMain: monitor.isOver(),
    }),
    drop(item) {
      if(!item.hasOwnProperty('index')){
        dispatch(addIngridientOrder(item))
      }
    },
  });

  const handleRemove = useCallback((e) => {
    const clickedElem = String(e.nativeEvent.path[5].id);
    dispatch({
      type: ORDER_MAIN_DELETE,
      deleteIngridient: clickedElem
    })
  });

  const defaultIngridients = (
    <li className={`${styles.main__default} ${isHoverMain ? styles.main__hovered : ''}`}>
      Перетащите ингридиенты
    </li>
  )

  return (
    <ul className={styles.main} ref={mainDrop}>
      { main.length > 0
        ? main.map((element, i) => (
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