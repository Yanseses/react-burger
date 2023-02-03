import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "../../../../services/hooks";
import styles from './constructorMainItem.module.css';
import { IIngridient } from "../../../../utils/types";
import { orderMoveIngridient } from "../../../../services/actions/main";

interface IConstructorMainItem {
  element: IIngridient,
  onClick: (e: string | undefined) => void,
  index: number
}

export const ConstructorMainItem: FC<IConstructorMainItem> = ({ element, onClick, index }) => {
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

        dispatch(orderMoveIngridient(dragIndex, hoverIndex))
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