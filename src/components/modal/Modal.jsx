import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import propTypes from 'prop-types';
import { ingredientType } from "../../utils/types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById('modal-root');

export default function Modal({title, onClose, children}){
  const modalRef = React.useRef(null);
  
  useEffect(() => {
    const handleClick = (e) => {
      if(e.target == modalRef.current){
        onClose();
      }
    }
    const handleClickByEscape = (e) => {
      if(e.key == 'Escape'){
        onClose();
      }
    }

    document.addEventListener('keydown', handleClickByEscape);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleClickByEscape);
      document.removeEventListener('click', handleClick)
    }
  }, [modalRef])

  return ReactDOM.createPortal(
    <ModalOverlay modalRef={modalRef}>
      <section className={`${styles.modal} p-10`}>
        <div className={styles.modal__head}>
          <h2 className={`${styles.modal__title} text text_type_main-large`}>
            {title}
          </h2>
          <button className={styles.modal__cross} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
          {children}
      </section>
    </ModalOverlay>
    , modalRoot
  );
}

Modal.propTypes = {
  title: propTypes.string,
  data: ingredientType,
  onClose: propTypes.func.isRequired
}