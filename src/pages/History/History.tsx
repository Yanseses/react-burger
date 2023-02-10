import { useEffect } from 'react';
import { Aside } from '../../components/Aside/Aside';
import { FeedList } from '../../components/FeedList/FeedList';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './history.module.css';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/actions/ws';
import { FeedItem } from '../../components/FeedList/FeedItem/FeedItem';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { WS_USER_ORDERS } from '../../utils/constants';
import { IWsOrder } from '../../utils/types';
import { getCookie } from '../../utils/cookie';
import { Text } from '../../components/Text/Text';

export default function History(){
  const location = useLocation();
  const dispatch = useDispatch();
  const orders = useSelector(store => store.ws.orders);
  const token = getCookie('accessToken');
  
  useEffect(() => {
    dispatch(wsConnectionOpen(`${WS_USER_ORDERS}?token=${token}`));

    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch, token]);

  if(!getCookie('refreshToken')){
    return (
      <Redirect to={'/login'}/>
    )
  }
  
  return (
    <main className={styles.history}>
      <Aside />
      <div className={styles.history__list}>
        { orders.length > 0 
          ? (
          <FeedList>
            { orders && 
              orders.map((el: IWsOrder) => (
              <Link 
                key={el._id} 
                className={styles.history__link}
                to={{
                  pathname: `/profile/orders/${el.number}`,
                  state: { modal: location }
                }}>
                <FeedItem {...el} isPrivate/>
              </Link>
            )) }
          </FeedList>
          ) : (
            <div className={styles.history__voidList}>
              <Text As='p' textSize='medium' isInactive>
                Cписок ваших заказов - пуст
              </Text>
            </div>
          )
        }
      </div>
    </main>
  )
}