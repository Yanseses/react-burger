import React, { useEffect, FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "./ModalOverlay/ModalOverlay";

type TModal = {
  title: string,
  titleStyle?: string,
  onClose: () => void
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export const Modal: FC<PropsWithChildren<TModal>> = ({title, titleStyle = 'text_type_main-large', onClose, children}) => {
  const modalRef = React.useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if(e.target === modalRef.current){
        onClose();
      }
    }
    const handleClickByEscape = (e: KeyboardEvent) => {
      if(e.key === 'Escape'){
        onClose();
      }
    }

    document.addEventListener('keydown', handleClickByEscape);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleClickByEscape);
      document.removeEventListener('click', handleClick)
    }
  }, [modalRef, onClose])

  return ReactDOM.createPortal(
    <ModalOverlay modalRef={modalRef}>
      <section className={`${styles.modal} p-10`}>
        <div className={styles.modal__head}>
          <h2 className={`text ${titleStyle}`}>
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