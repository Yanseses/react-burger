import { FC, memo, useEffect } from 'react'
import styles from './orderDetails.module.css';
import { useDispatch, useSelector } from '../../../services/hooks';
import { useParams } from 'react-router-dom';
import { IIngridient, IWsOrder, TUrlParams } from '../../../utils/types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { wsAddModalOrder } from '../../../services/actions/ws';
import { Price } from '../../BurgerConstructor/Price/Price';
import { IngridientsIcon } from '../../BurgerIngridients/IngridientsIcon/IngridientsIcon';
import { getOrderData } from '../../../services/thunks/ws';
import { Text } from '../../Text/Text';

export const OrderDetails: FC = memo(() => {
  const dispatch = useDispatch();
  const { id } = useParams<TUrlParams>();
  const order = 
    useSelector(store => store.ws.orders)
    .find((el: IWsOrder) => el.number === Number(id));
  const ingridients = useSelector(store => store.main.ingridients.data);
  const orderModal = useSelector(store => store.ws.orderModal);
  const orderIngridients = orderModal?.ingredients.map((elem: string) => {
    return ingridients.find((el: IIngridient) => el._id === elem);
  })

  useEffect(() => {
    if(order){
      dispatch(wsAddModalOrder(order))
    } else {
      dispatch(getOrderData(Number(id)))
    }
  }, [dispatch, id, order]);
  
  return orderModal && (
    <div className={`${styles.orderDetails} mt-5`}>
      <div className={styles.orderDetails__head}>
        <Text As='h2' textSize='medium' extraClass={styles.orderDetails__title}>
          { orderModal && orderModal.name }
        </Text>
        <Text As='p' textSize='default'>
          { 
            orderModal && orderModal.status === 'done'
              ? 'Выполнено'
              : orderModal && orderModal.status === 'created'
                ? 'Создано'
                : 'Ожидание'
          }
        </Text>
      </div>
      <div className={styles.orderDetails__wrapper}>
        <section className={`${styles.orderDetails__main}`}>
          <Text As='h3' textSize='medium'>Состав</Text>
          <div className={styles.orderDetails__ingridientWrapper}>
            <ul className={styles.orderDetails__ingridient}>
              { orderIngridients!.map((el: IIngridient | undefined, i: number) => {
                  return (
                    <li key={i} className={styles.orderDetails__ingridientItem}>
                      <IngridientsIcon image={el ? el.image_mobile : ''} />
                      <Text As='p' textSize='default'>{el ? el.name : 'Неизвестный ингридиент'}</Text>
                      <Price price={el ? el.price : 0} textSize={'default'}/>
                    </li>
                    )
                  }
                )
              }
            </ul>
          </div>
        </section>
        <div className={styles.orderDetails__footer}>
          <div>
            <FormattedDate 
              className='text text_type_main-default text_color_inactive' 
              date={new Date( orderModal.updatedAt )} 
            />
          </div>
          <Price 
            price={orderIngridients!.reduce((acc: number, curr: IIngridient | undefined) => 
              curr ? curr.price + acc : 0, 0)} 
            textSize={'default'}
          />
        </div>
      </div>
    </div>
  )
})