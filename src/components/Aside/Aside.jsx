import { NavLink } from 'react-router-dom'
import styles from './aside.module.css'
import { deleteCookie } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../services/actions/auth';

export function Aside(){
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    deleteCookie('token');
  }

  return (
    <aside className={styles.aside}>
      <div className={`${styles.aside__list} text text_type_main-medium mb-20`}>
        <NavLink 
          to={'/profile'}
          className={styles.aside__link}
          activeClassName={styles.aside__linkActive}>
            Профиль
        </NavLink>
        <NavLink 
          to={'/history'}
          className={styles.aside__link}
          activeClassName={styles.aside__linkActive}>
            История заказов
        </NavLink> 
        <a className={styles.aside__linkLogout} onClick={handleLogout}>
          Выход
        </a>
      </div>
      <p className='text text_type_main-default text_color_inactive'>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
  )
}