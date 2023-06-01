import { useEffect } from 'react';
import { FeedList } from '../../../components/FeedList/FeedList';
import { useDispatch, useSelector } from '../../../services/hooks';
import styles from './history.module.css';
import { wsConnectionClosed, wsConnectionOpen } from '../../../services/actions/ws';
import { FeedItem } from '../../../components/FeedList/FeedItem/FeedItem';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { WS_USER_ORDERS } from '../../../utils/constants';
import { IWsOrder } from '../../../utils/types';
import { getCookie } from '../../../utils/cookie';
import { Text } from '../../../components/Text/Text';

export default function History(){
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userAuthorized = useSelector(store => store.auth.user.authorized);
  const orders = useSelector(store => store.ws.orders);
  const token = getCookie('accessToken');
  
  useEffect(() => {
    dispatch(wsConnectionOpen(`${WS_USER_ORDERS}?token=${token}`));

    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch, token]);

  useEffect(() => {
    if(!userAuthorized) navigate('/login')
  }, [userAuthorized, navigate]);
  
  return (
    <section className={styles.history}>
      <Text As='h1' textSize='large' extraClass={styles.history__heading}>
        Cписок заказов
      </Text>
      { orders.length > 0 
        ? (
        <FeedList>
          { orders && 
            orders.map((el: IWsOrder) => (
            <Link 
              key={el._id} 
              className={styles.history__link}
              to={`/profile/orders/${el.number}`}
              state={{ modal: location }}>
              <FeedItem {...el} isPrivate/>
            </Link>
          )) }
        </FeedList>
        ) : (
          <div className={styles.history__voidList}>
            <Text As='p' textSize='medium' color={'inactive'}>
              Cписок ваших заказов - пуст
            </Text>
          </div>
        )
      }
    </section>
  )
}