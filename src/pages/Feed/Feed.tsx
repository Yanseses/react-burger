import { useEffect } from 'react';
import { Done } from '../../components/Done/Done';
import { FeedList } from '../../components/FeedList/FeedList'
import { OrderStatus } from '../../components/OrderStatus/OrderStatus'
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './feed.module.css'
import { wsConnectionClosed, wsConnectionOpen } from '../../services/actions/ws';
import { FeedItem } from '../../components/FeedList/FeedItem/FeedItem';

export default function Feed(){
  const dispatch = useDispatch();
  const { 
    orders, 
    totalToday, 
    totalAll, 
    readyOrders, 
    waitingOrders 
  } = useSelector(store => ({
    orders: store.ws.orders,
    totalToday: store.ws.totalToday,
    totalAll: store.ws.totalAll,
    readyOrders: store.ws.readyOrders,
    waitingOrders: store.ws.waitingOrders
  }));

  useEffect(() => {
    dispatch(wsConnectionOpen());

    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch]);

  return (
    <main className={styles.feed}>
      <h1 className='text text_type_main-large'>Лента заказов</h1>
      <div className={styles.feed__container}>
        <FeedList>
          { orders && orders.map((el: any) => (
            <FeedItem key={el._id} {...el}/>
            )) 
          }
        </FeedList>
        <section className={styles.feed__ready}>
          <div className={styles.feed__readyHead}>
            <OrderStatus name={'Готовы'} orderList={readyOrders} isReady/>
            <OrderStatus name={'В работе'} orderList={waitingOrders} />
          </div>
          <Done title={'Выполнено за все время:'} total={totalAll}/>
          <Done title={'Выполнено за сегодня:'} total={totalToday}/>
        </section>
      </div>
    </main>
  )
}