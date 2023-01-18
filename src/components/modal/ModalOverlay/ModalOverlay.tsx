import styles from './modalOverlay.module.css';
import { FC, PropsWithChildren } from 'react';
import { TModalOverlay } from '../../../services/types';

export const ModalOverlay: FC<PropsWithChildren<TModalOverlay>> = ({ children, modalRef }): JSX.Element => {
  return (
    <section ref={modalRef} className={styles.modalOverlay}>
      {children}
    </section>
  )
}