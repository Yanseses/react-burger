import { Aside } from '../../components/Aside/Aside';
import { FeedList } from '../../components/FeedList/FeedList';
import styles from './history.module.css';

export default function History(){
  return (
    <main className={styles.history}>
      <Aside />
      <div style={{ height: '85vh' }}>
        <FeedList />
      </div>
    </main>
  )
}