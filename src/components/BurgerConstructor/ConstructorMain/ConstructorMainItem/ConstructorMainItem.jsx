import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { ORDER_MOVE_INGRIDIENT } from '../../../../services/actions';
import styles from './constructorMainItem.module.css';

export default function ConstructorMainItem(props){
  const { element, onClick, index } = props;
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ opacity }, constructorDragRef] = useDrag({
    type: 'main',
    item: { index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  const [spec, constructorDropRef] = useDrop({
    accept: 'main',
    hover: (item, monitor) => {
      if(item.index){
        const dragIndex = item.index;
        const hoverIndex = index;
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
        dispatch({
          type: ORDER_MOVE_INGRIDIENT,
          dragIndex,
          hoverIndex
        })
        item.index = hoverIndex;
      }
    }
  });
  const dragDropRef = constructorDragRef(constructorDropRef(ref));

  return (
    <li 
      id={element.id}
      key={element.id} 
      className={styles.main__item}
      ref={dragDropRef}
      style={{opacity}}
      >
    <button className={styles.main__drag}>
      <DragIcon type="primary" />
    </button>
    <ConstructorElement
      text={element.name}
      price={element.price}
      thumbnail={element.image}
      handleClose={onClick}
    />
  </li>
  )
}