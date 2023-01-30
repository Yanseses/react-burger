import { FC } from "react";
import styles from './orderStatus.module.css';

interface IOrderStatus {
  name: string,
  orderList: string[],
  colorList?: boolean
}

export const OrderStatus: FC<IOrderStatus> = ({name, orderList, colorList}) => {
  return (
    <div className={styles.orderStatus__wrapper}>
      <h3 className='text text_type_main-medium'>
        { name }
      </h3>
      <ul className={`${styles.orderStatus__list} text text_type_digits-default`}>
        { orderList && orderList.map((el: any) => (
          <li className={colorList ? styles.orderStatus__itemColor : styles.orderStatus__item}>{el}</li>
          )) 
        }
      </ul>
    </div>
  )
}