import { Link } from 'react-router-dom';
import styles from './notFound.module.css';
import { Text } from '../../components/Text/Text';

export default function NotFound(){
  return (
    <main className={styles.notFound}>
      <section className={styles.notFound__section}>
        <Text As='h2' textSize='large'>
          Страница не найдена
        </Text>
        <Text As='p' textSize='default'>
          Возможно ее удалили или переместили. Если вы вводили адрес страницы самостоятельно, проверьте, пожалуйста, его на корректность
        </Text>
        <Link to={'/'}>Вернуться на главную</Link>
      </section>
    </main>
  )
}