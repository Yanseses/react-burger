import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { ORDER_MOVE_INGRIDIENT } from '../../../../services/actions';
import styles from './constructorMainItem.module.css';
import { IIngridient } from "../../../BurgerIngridients/BurgerIngridients";

interface IConstructorMainItem {
  element: IIngridient,
  onClick: Function,
  index: number
}

export default function ConstructorMainItem({ element, onClick, index }: IConstructorMainItem): JSX.Element {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement | undefined>(null);
  const [{ opacity }, constructorDragRef] = useDrag({
    type: 'main',
    item: { index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  const [, constructorDropRef] = useDrop({
    accept: 'main',
    hover: (item: any, monitor) => {
      if(item.index){
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
  const dragDropRef = constructorDragRef(constructorDropRef(ref));

  return (
    <li 
      id={element.id}
      key={element.id} 
      className={styles.main__item}
      // @ts-ignore
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
      // @ts-ignore
      handleClose={onClick}
    />
  </li>
  )
}