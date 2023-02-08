import { FC, useEffect } from 'react'
import styles from './orderDetails.module.css';
import { useDispatch, useSelector } from '../../../services/hooks';
import { useParams } from 'react-router-dom';
import { IIngridient, IWsOrder, TUrlParams } from '../../../utils/types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { wsAddModalOrder } from '../../../services/actions/ws';
import { Price } from '../../BurgerConstructor/Price/Price';
import { IngridientsIcon } from '../../BurgerIngridients/IngridientsIcon/IngridientsIcon';
import { getOrderData } from '../../../services/thunks/ws';

export const OrderDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<TUrlParams>();
  const order = 
    useSelector(store => store.ws.orders)
    .find((el: IWsOrder) => el.number === Number(id));
  const ingridients = useSelector(store => store.main.ingridients);
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
        <h2 className='text text_type_main-medium'>
          { orderModal && orderModal.name }
        </h2>
        <p className='text text_type_main-default'>
          { 
            orderModal && orderModal.status === 'done'
              ? 'Выполнено'
              : orderModal && orderModal.status === 'created'
                ? 'Создано'
                : 'Ожидание'
          }
        </p>
      </div>
      <div className={styles.orderDetails__wrapper}>
        <section className={`${styles.orderDetails__main}`}>
          <h3 className='text text_type_main-medium'>Состав</h3>
          <div className={styles.orderDetails__ingridientWrapper}>
            <ul className={styles.orderDetails__ingridient}>
              { orderIngridients!.map((el: IIngridient | undefined, i: number) => {
                  return (
                    <li key={i} className={styles.orderDetails__ingridientItem}>
                      <IngridientsIcon image={el!.image_mobile} />
                      <p className='text text_type_main-default'>{el?.name}</p>
                      <Price price={el!.price} textSize={'default'}/>
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
            price={orderIngridients!.reduce((acc: number, curr: IIngridient | undefined) => curr!.price + acc, 0)} 
            textSize={'default'}
          />
        </div>
      </div>
    </div>
  )
}