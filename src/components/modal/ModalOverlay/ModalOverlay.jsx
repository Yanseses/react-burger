import styles from './modalOverlay.module.css';

export default function ModalOverlay({children, modalRef}){
  return (
    <section ref={modalRef} className={styles.modalOverlay}>
      {children}
    </section>
  )
}