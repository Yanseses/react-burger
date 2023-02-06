import { FC } from "react";
import styles from './feedItem.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngridient, IWsOrder } from "../../../utils/types";
import { useSelector } from "../../../services/hooks";

export const FeedItem: FC<IWsOrder> = ({ 
  name, 
  ingredients, 
  number,
  updatedAt,
  status, 
  isPrivate
}) => {
  const ingridients = useSelector(store => store.main.ingridients);
  const actualIngredients = ingredients.map((el: string) => {
    return ingridients.find((ingridient: IIngridient) => ingridient._id === el)
  })
  
  return (
    <>
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
      { isPrivate && (
        <p className={ status === 'done' 
          ? `${styles.feedItem__status} text text_type_main-default` 
          : 'text text_type_main-default'}
        >
          { status === 'done' 
            ? 'Выполнено' 
            : status === 'created' 
              ? 'Создано'
              : 'Ожидание'
          }
        </p>
        ) 
      }
      <div className={styles.feedItem__orderDetail}>
        <ul className={styles.feedItem__ingridients}>
          { actualIngredients.map((el: IIngridient | undefined, i: number) => (
            <li className={styles.feedItem__imgContainer} style={{ zIndex: 50 - i, left: 30 * i }}>
              <img src={el!.image_mobile} alt="" className={styles.feedItem__img}/>
            </li>
            )) 
          }
        </ul>
        <div className={styles.feedItem__orderPrice}>
        <p className='text text_type_digits-default'>
          { actualIngredients.reduce((acc: number, curr: IIngridient | undefined) => curr!.price + acc, 0) }
        </p> 
        <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  )
}