import styles from './modalOverlay.module.css';
import propTypes from 'prop-types';

export default function ModalOverlay({children, modalRef}){
  return (
    <section ref={modalRef} className={styles.modalOverlay}>
      {children}
    </section>
  )
}

ModalOverlay.propTypes = {
  children: propTypes.node.isRequired,
  modalRef: propTypes.object.isRequired
}