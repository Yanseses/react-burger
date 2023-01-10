import { Link } from 'react-router-dom';
import styles from './notFound.module.css';

export default function NotFound(){
  return (
    <main className={styles.notFound}>
      <section className={styles.notFound__section}>
        <h2 className={`${styles.notFound__title} text text_type_main-large`}>
          Страница не найдена
        </h2>
        <p className='text text_type_main-default'>
          Возможно ее удалили или переместили. Если вы вводили адрес страницы самостоятельно, проверьте, пожалуйста, его на корректность
        </p>
        <Link to={'/'}>Вернуться на главную</Link>
      </section>
    </main>
  )
}