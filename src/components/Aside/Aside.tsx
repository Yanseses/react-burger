import { MouseEvent, FC } from 'react';
import { NavLink } from 'react-router-dom'
import styles from './aside.module.css'
import { useDispatch } from '../../services/hooks';
import { userLogout } from '../../services/thunks/auth';
import { Text } from '../Text/Text';

export const Aside: FC = () => {
  const dispatch = useDispatch();

  const handleLogout = (e: MouseEvent): void => {
    e.preventDefault();
    
    dispatch(userLogout());
  }

  return (
    <aside className={styles.aside}>
      <div className={`${styles.aside__list} text text_type_main-medium mb-20`}>
        <NavLink 
          to={'/profile'}
          className={({isActive}) => isActive ? `${styles.aside__linkActive}` : `${styles.aside__link}`}
          end>
            Профиль
        </NavLink>
        <NavLink 
          to={'/profile/orders'}
          className={({isActive}) => isActive ? `${styles.aside__linkActive}` : `${styles.aside__link}`}>
            История заказов
        </NavLink>
        <NavLink 
          to={'/login'}
          className={({isActive}) => isActive ? `${styles.aside__linkActive}` : `${styles.aside__link}`}
          onClick={handleLogout}>
            Выход
        </NavLink>
      </div>
      <Text As='p' textSize='default' color={'inactive'}>
        В этом разделе вы можете изменить свои персональные данные
      </Text>
    </aside>
  )
}