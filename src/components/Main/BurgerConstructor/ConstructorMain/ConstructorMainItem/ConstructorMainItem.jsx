import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import styles from './constructorMainItem.module.css';

export default function ConstructorMainItem(props){
  const { element, onClick, index } = props;
  const [{ opacity }, constructorRef] = useDrag({
    type: 'main',
    item: element,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <li 
      id={element.id}
      key={element.id} 
      className={styles.main__item}
      ref={constructorRef}
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