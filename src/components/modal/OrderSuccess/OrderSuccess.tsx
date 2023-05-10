import { FC } from 'react'
import { useSelector } from "../../../services/hooks";
import sucessLogo from '../../../images/graphics.svg'
import styles from './orderSuccess.module.css';
import { Text } from '../../Text/Text';

export const OrderSuccess: FC = () => {
  const orderNumber = useSelector(store => store.main.order.successNumber);

  return (
    <div className={`${styles.orderSuccess} mt-4 mb-20 text`}>
      <Text As='h3' numberSize='large'>
        { orderNumber }
      </Text>
      <div className={`${styles.orderSuccess__main} mt-8`}>
        <Text As='p' textSize='medium'>
          идентификатор заказа
        </Text>
        <img src={sucessLogo} alt="" />
        <div className={styles.orderSuccess__descr}>
          <Text As='p' textSize='default'>
            Ваш заказ начали готовить
          </Text>
          <Text As='p' textSize='default' color={'inactive'}>
            Дождитесь готовности на орбитальной станции
          </Text>
        </div>
      </div>
    </div>
  )
}