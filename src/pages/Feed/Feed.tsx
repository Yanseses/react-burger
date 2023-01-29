import { FeedList } from '../../components/FeedList/FeedList'
import styles from './feed.module.css'

export default function Feed(){
  return (
    <main className={styles.feed}>
      <h1 className='text text_type_main-large'>Лента заказов</h1>
      <div className={styles.feed__wrapper}>
        <FeedList />
        <section className={styles.feed__ready}>
          324
        </section>
      </div>
    </main>
  )
}