import { useEffect } from 'react';
import { Aside } from '../../components/Aside/Aside';
import { FeedList } from '../../components/FeedList/FeedList';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './history.module.css';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/actions/ws';
import { FeedItem } from '../../components/FeedList/FeedItem/FeedItem';
import { Link, useLocation } from 'react-router-dom';
import { WS_USER_ORDERS } from '../../utils/constants';
import { IWsOrder } from '../../utils/types';
import { getCookie } from '../../utils/cookie';

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
  
  return (
    <main className={styles.history}>
      <Aside />
      <div className={styles.history__list}>
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
      </div>
    </main>
  )
}