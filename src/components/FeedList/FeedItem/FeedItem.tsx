import { FC } from "react";
import styles from './feedItem.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const FeedItem: FC = () => {

  return (
    <li className={styles.feedItem}>
      <div className={styles.feedItem__head}>
        <p className={`${styles.feedItem__orderNumber} text text_type_digits-default`}>
          #034535
        </p>
        <p className={`${styles.feedItem__orderDate} text text_type_main-default text_color_inactive`}>
          Сегодня, 16:20
        </p>
      </div>
      <p className='text text_type_main-medium'>
        Death Star Starship Main бургер
      </p>
      <div className={styles.feedItem__orderDetail}>
        <div>

        </div>
        <div className={styles.feedItem__orderPrice}>
        <p className='text text_type_digits-default'>
          480
        </p>
        <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  )
}