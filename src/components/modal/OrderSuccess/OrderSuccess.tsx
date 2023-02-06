import { FC } from 'react'
import { useSelector } from "../../../services/hooks";
import sucessLogo from '../../../images/graphics.svg'
import styles from './orderSuccess.module.css';

export const OrderSuccess: FC = () => {
  const orderNumber = useSelector(store => store.main.orderNumber);

  return (
    <div className={`${styles.orderSuccess} mt-4 mb-20 text`}>
      <h3 className={`${styles.orderSuccess__identification} text_type_digits-large`}>
        {orderNumber}
      </h3>
      <div className={`${styles.orderSuccess__main} mt-8`}>
        <p className={`${styles.orderSuccess__title} text_type_main-medium`}>
          идентификатор заказа
        </p>
        <img src={sucessLogo} alt="" />
        <div className={styles.orderSuccess__descr}>
          <p className={`${styles.orderSuccess__descrText} text_type_main-default`}>
            Ваш заказ начали готовить
          </p>
          <p className={`${styles.orderSuccess__descrText} text_type_main-default text_color_inactive`}>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>
    </div>
  )
}