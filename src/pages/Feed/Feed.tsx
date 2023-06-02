import { useCallback, useEffect, useState } from 'react';
import { Done } from '../../components/Done/Done';
import { FeedList } from '../../components/FeedList/FeedList'
import { OrderStatus } from '../../components/OrderStatus/OrderStatus'
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './feed.module.css'
import { wsConnectionClosed, wsConnectionOpen } from '../../services/actions/ws';
import { FeedItem } from '../../components/FeedList/FeedItem/FeedItem';
import { Link, useLocation } from 'react-router-dom';
import { WS_ALL_ORDERS } from '../../utils/constants';
import { IWsOrder } from '../../utils/types';
import { Text } from '../../components/Text/Text';
import { useMediaQuery } from 'react-responsive';
import { Tab } from '../../components/Tab/Tab';

export default function Feed(){
  const location = useLocation();
  const dispatch = useDispatch();
  const [ activeTab, setActiveTab ] = useState('orders');
  const isTablet = useMediaQuery({ query: '(max-width: 1315px' });
  const orders = useSelector(store => store.ws.orders);
  const totalToday = useSelector(store => store.ws.totalToday);
  const totalAll = useSelector(store => store.ws.totalAll);
  const readyOrders = useSelector(store => store.ws.readyOrders);
  const waitingOrders = useSelector(store => store.ws.waitingOrders);

  const handleClickTabs = useCallback((e: string) => {
    switch(e){
      case 'orders': {
        setActiveTab('orders')
        break;
      }
      case 'statisctic': {
        setActiveTab('statisctic')
        break;
      }
      default: {
        setActiveTab('orders')
      }
    }
  }, [activeTab, setActiveTab])

  useEffect(() => {
    dispatch(wsConnectionOpen(WS_ALL_ORDERS));

    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch]);

  return (
    <main className={styles.feed}>
      <Text As='h1' textSize='large'>
        Лента заказов
      </Text>
      { isTablet ? (
        <>
          <div className={styles.feed__tabs}>
            <Tab value='orders' active={activeTab === 'orders'} onClick={handleClickTabs}>
              Заказы
            </Tab>
            <Tab value='statisctic' active={activeTab === 'statisctic'} onClick={handleClickTabs}>
              Статистика
            </Tab>
          </div>
          { activeTab === 'orders' ? (
            <div className={styles.feed__container}>
              { orders.length > 0 
                ? (
                <FeedList>
                  { orders && orders.map((el: IWsOrder) => (
                    <Link 
                      key={el._id} 
                      className={styles.feed__link}
                      to={`/feed/${el.number}`}
                      state={{ modal: location }}>
                      <FeedItem {...el}/>
                    </Link>
                    ))
                  }
                </FeedList>
                ) : (
                <div className={styles.feed__voidList}>
                  <Text As='p' textSize='medium' color={'inactive'}>
                    Список заказов - пуст
                  </Text>
                </div>
                )
              }
            </div>
            ) : (
            <section className={styles.feed__ready}>
              <div className={styles.feed__readyHead}>
                <OrderStatus name={'Готовы'} orderList={readyOrders} isReady/>
                <OrderStatus name={'В работе'} orderList={waitingOrders} />
              </div>
              <Done title={'Выполнено за все время:'} total={totalAll}/>
              <Done title={'Выполнено за сегодня:'} total={totalToday}/>
            </section>
            )
          }
        </>
        ) : (
        <div className={styles.feed__container}>
          { orders.length > 0 
            ? (
            <FeedList>
              { orders && orders.map((el: IWsOrder) => (
                <Link 
                  key={el._id} 
                  className={styles.feed__link}
                  to={`/feed/${el.number}`}
                  state={{ modal: location }}>
                  <FeedItem {...el}/>
                </Link>
                ))
              }
            </FeedList>
            ) : (
            <div className={styles.feed__voidList}>
              <Text As='p' textSize='medium' color={'inactive'}>
                Список заказов - пуст
              </Text>
            </div>
            )
          }
          <section className={styles.feed__ready}>
            <div className={styles.feed__readyHead}>
              <OrderStatus name={'Готовы'} orderList={readyOrders} isReady/>
              <OrderStatus name={'В работе'} orderList={waitingOrders} />
            </div>
            <Done title={'Выполнено за все время:'} total={totalAll}/>
            <Done title={'Выполнено за сегодня:'} total={totalToday}/>
          </section>
        </div>
        )
      }
    </main>
  )
}