import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import IngridientDetails from "./IngredientDetails/IngredientDetails";
import OrderDetails from "./OrderDetails/OrderDetails";

const modalRoot = document.getElementById('modal-root');

export default function Modal({type, data, onClose}){
  const modalRef = React.useRef(null);
  
  useEffect(() => {
    const handleClick = (e) => {
      if(e.target == modalRef.current){
        onClose();
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.addEventListener('click', handleClick)
    }
  }, [modalRef])

  return ReactDOM.createPortal(
    <ModalOverlay modalRef={modalRef}>
      <section className={`${styles.modal} p-10`}>
        <div className={styles.modal__head}>
          <h2 className={`${styles.modal__title} text text_type_main-large`}>
            { type == 'order'
              ? ''
              : 'Детали ингредиента'
            }
          </h2>
          <button className={styles.modal__cross} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        { type == 'order' 
          ? <OrderDetails {...data}/>
          : <IngridientDetails {...data}/>
        }
      </section>
    </ModalOverlay>
    , modalRoot
  );
}