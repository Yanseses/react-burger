import styles from './modalOverlay.module.css';
import { FC, PropsWithChildren, LegacyRef } from 'react';

type TModalOverlay = {
  modalRef?: LegacyRef<HTMLElement>
}

export const ModalOverlay: FC<PropsWithChildren<TModalOverlay>> = ({ children, modalRef }) => {
  return (
    <section ref={modalRef} className={styles.modalOverlay}>
      {children}
    </section>
  )
}