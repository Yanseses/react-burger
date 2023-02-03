import { FC } from "react";
import styles from './feedItem.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../../services/hooks";

interface IFeedItem {
  name: string,
  number: number,
  updatedAt: string,
  createdAt: string,
  status: 'done' | 'created' | 'pending',
  ingredients: any,
  price: number,
  isPrivate?: boolean,
  _id?: string,
}

export const FeedItem: FC<IFeedItem> = ({ 
  name, 
  ingredients, 
  number, 
  updatedAt, 
  status, 
  isPrivate,
  price = 0,
}) => {
  const ingridients = useSelector(store => store.main.ingridients);

  return (
    <li className={styles.feedItem}>
      <div className={styles.feedItem__head}>
        <p className={`${styles.feedItem__orderNumber} text text_type_digits-default`}>
          { `#${number}` }
        </p>
        <p className={`${styles.feedItem__orderDate} text text_type_main-default text_color_inactive`}>
          <FormattedDate date={new Date(updatedAt)} />
        </p>
      </div>
      <p className='text text_type_main-medium'>
        { name }
      </p>
      { isPrivate && status === 'done'
        ? (
          <p className={`${styles.feedItem__status} text text_type_main-default`}>
            { 'Выполнено' }
          </p>
        ) : (
          <p className='text text_type_main-default'>
            { status === 'created' ? 'Создано' : 'Ожидание' }
          </p>
        )
      }
      <div className={styles.feedItem__orderDetail}>
        <div>

        </div>
        <div className={styles.feedItem__orderPrice}>
        <p className='text text_type_digits-default'>
          { price }
        </p> 
        <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  )
}