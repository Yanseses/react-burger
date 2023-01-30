import { Done } from '../../components/Done/Done';
import { FeedList } from '../../components/FeedList/FeedList'
import { OrderStatus } from '../../components/OrderStatus/OrderStatus'
import styles from './feed.module.css'

export default function Feed(){
  const readyList = ['034533', '034532', '034530', '034527'];

  return (
    <main className={styles.feed}>
      <h1 className='text text_type_main-large'>Лента заказов</h1>
      <div className={styles.feed__wrapper}>
        <FeedList />
        <section className={styles.feed__ready}>
          <div className={styles.feed__readyHead}>
            <OrderStatus name={'Готовы'} orderList={readyList} colorList/>
            <OrderStatus name={'В работе'} orderList={readyList} />
          </div>
          <Done title={'Выполнено за все время:'} total={'28 752'}/>
          <Done title={'Выполнено за сегодня:'} total={'138'}/>
        </section>
      </div>
    </main>
  )
}