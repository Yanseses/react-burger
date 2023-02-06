import styles from './detailOrder.module.css';
import { useParams } from 'react-router-dom';
import { TUrlParams } from '../../utils/types';
import { OrderDetails } from '../../components/modal/OrderDetails/OrderDetails';

export default function DetailOrder(){
  const { id } = useParams<TUrlParams>();

  return (
    <main className={styles.ingridients}>
      <section className={styles.ingridients__item}>
        <h2 className="text text_type_main-large">{`#${id}`}</h2>
        <OrderDetails />
      </section>
    </main>
  )
}