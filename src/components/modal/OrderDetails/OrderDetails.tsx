import { FC } from 'react'
import styles from './orderDetails.module.css';
import { useDispatch } from '../../../services/hooks';
import { useParams } from 'react-router-dom';
import { TUrlParams } from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<TUrlParams>();
  
  return (
    <div className={`${styles.orderDetails} mt-5`}>
      <div className={styles.orderDetails__head}>
        <h2 className='text text_type_main-medium'>Black Holle Sugar острый бургер</h2>
        <p className='text text_type_main-default'>статус</p>
      </div>
      <section className={`${styles.orderDetails__main} mt-15 mb-10`}>
        <h3 className='text text_type_main-medium'>Состав</h3>
        <div>
          <ul></ul>
        </div>
      </section>
      <div className={styles.orderDetails__footer}>
        <p>время</p>
        <div className={styles.orderDetails__price}>
          <p className='text text_type_digits-default'>1232</p>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </div>
  )
}