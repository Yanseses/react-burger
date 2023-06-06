import { FC } from 'react'
import styles from './loader.module.css';
import { ModalOverlay } from '../modal/ModalOverlay/ModalOverlay'

export const Loader: FC = () => {
  return (
    <ModalOverlay>
      <section className={styles.loader}>
        <div className={styles.loader__spinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </ModalOverlay>
  )
}