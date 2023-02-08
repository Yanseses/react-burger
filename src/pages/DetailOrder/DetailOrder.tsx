import styles from './detailOrder.module.css';
import { useParams } from 'react-router-dom';
import { TUrlParams } from '../../utils/types';
import { OrderDetails } from '../../components/modal/OrderDetails/OrderDetails';

export default function DetailOrder(){
  const { id } = useParams<TUrlParams>();

  return (
    <main className={styles.detailOrder}>
      <section className={styles.detailOrder__order}>
        <h2 className={`${styles.detailOrder__title} text text_type_digits-default`}>{`#${id}`}</h2>
        <OrderDetails />
      </section>
    </main>
  )
}