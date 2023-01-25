import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import styles from './constructorMainItem.module.css';
import { IIngridient } from "../../../../utils/types";
import { ORDER_MOVE_INGRIDIENT } from "../../../../services/constants/ingridients";

interface IConstructorMainItem {
  element: IIngridient,
  onClick: (e: string | undefined) => void,
  index: number
}

export default function ConstructorMainItem({ element, onClick, index }: IConstructorMainItem): JSX.Element {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const [{ opacity }, constructorDragRef] = useDrag({
    type: 'main',
    item: { index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  const [, constructorDropRef] = useDrop({
    accept: 'main',
    hover: (item: IIngridient & { index: number }, monitor) => {
      if(item.hasOwnProperty('index')){
        const dragIndex = item.index;
        const hoverIndex = index;
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        if(!hoverBoundingRect) return
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

        dispatch({
          type: ORDER_MOVE_INGRIDIENT,
          dragIndex,
          hoverIndex
        })
        item.index = hoverIndex;
      }
    }
  });
  constructorDragRef(constructorDropRef(ref));

  return (
    <li 
      id={element.id}
      key={element.id} 
      className={styles.main__item}
      ref={ref}
      style={{opacity}}
      >
    <button className={styles.main__drag}>
      <DragIcon type="primary" />
    </button>
    <ConstructorElement
      text={element.name}
      price={element.price}
      thumbnail={element.image}
      handleClose={() => onClick(element.id)}
    />
  </li>
  )
}