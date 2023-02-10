import { FC } from "react";
import styles from './orderStatus.module.css';
import { Text } from "../Text/Text";

interface IOrderStatus {
  name: string,
  orderList: number[],
  isReady?: boolean
}

export const OrderStatus: FC<IOrderStatus> = ({name, orderList, isReady}) => {

  return (
    <div className={styles.orderStatus__wrapper}>
      <Text As='h3' textSize='medium'>
        {name}
      </Text>
      <ul className={`${styles.orderStatus__list} text text_type_digits-default`}>
        { orderList.map((el: number) => (
          <li key={el} className={isReady ? styles.orderStatus__itemColor : styles.orderStatus__item}>{el}</li>
          )) 
        }
      </ul>
    </div>
  )
}