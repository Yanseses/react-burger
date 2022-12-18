import styles from './constructorBuns.module.css';
import propTypes from 'prop-types';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_BUNS_CHANGE } from "../../../../services/actions";

export default function ConstructorBuns(props){
  const { type } = props;
  const dispatch = useDispatch();
  const buns = useSelector(state => state.main.order.buns)
  const [{ isHoverBuns } , bunsDrop] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHoverBuns: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: ORDER_BUNS_CHANGE,
        data: item
      })
    },
  });

  const defaultBuns = (
    <div className={`
      ${styles.buns__default} 
      ${ type == 'top' ? styles.buns__top : styles.buns__bottom }
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
          text={`${buns.name} ${type == 'top' ? '(верх)' : '(низ)'}`}
          price={buns.price}
          thumbnail={buns.image}
        />
        : defaultBuns
      }
    </div>
  )
}

ConstructorBuns.propTypes = {
  type: propTypes.string
}