import { useEffect } from 'react';
import { Aside } from '../../components/Aside/Aside';
import { FeedList } from '../../components/FeedList/FeedList';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './history.module.css';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/actions/ws';
import { FeedItem } from '../../components/FeedList/FeedItem/FeedItem';

export default function History(){
  const dispatch = useDispatch();
  const orders = useSelector(store => store.ws.orders);
  
  useEffect(() => {
    dispatch(wsConnectionOpen());

    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch]);
  
  return (
    <main className={styles.history}>
      <Aside />
      <div className={styles.history__list}>
        <FeedList>
          { orders && orders.map((el: any) => (
            <FeedItem key={el._id} {...el} isPrivate/>
          )) }
        </FeedList>
      </div>
    </main>
  )
}