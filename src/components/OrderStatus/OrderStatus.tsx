import { FC, memo } from "react";
import styles from './orderStatus.module.css';
import { Text } from "../Text/Text";
import { useMediaQuery } from "react-responsive";

interface IOrderStatus {
  name: string,
  orderList: number[],
  isReady?: boolean
}

export const OrderStatus: FC<IOrderStatus> = memo(({name, orderList, isReady}) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1315px)' });

  return (
    <div className={styles.orderStatus__wrapper}>
      <Text As='h3' textSize='medium'>
        {name}
      </Text>
      <ul className={`${styles.orderStatus__list} text text_type_digits-default`}>
        { orderList.map((el: number, i: number, arr) => {
          if(isTablet && i >= 20){
            return
          }
          return (
            <li key={el} className={isReady ? styles.orderStatus__itemColor : styles.orderStatus__item}>{el}</li>
            )
          }
        ) 
        }
      </ul>
    </div>
  )
})