import { memo, FC } from 'react';
import styles from './header.module.css';
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Item } from "../Item/Item";
import { Link } from "react-router-dom";
import { useSelector } from '../../services/hooks';

const Header: FC = () => {
  const { userAuthorized, userName }: any = useSelector<any>(store => ({
    userAuthorized: store.auth.user.authorized,
    userName: store.auth.user.data.name
  }));

  // Проблема с отображением имени и навигацией из профиля

  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={styles.header__section}>
        <div className={styles.header__container}>
          <nav className={styles.header__navList}>
            <Item text={'Конструктор'} Icon={BurgerIcon} link={'/'} />
            <Item text={'Лента заказов'} Icon={ListIcon} link={'/feed'} />
          </nav>
          <Link to={'/'}>
            <Logo />
          </Link>
        </div>
        <Item 
          text={userAuthorized ? userName : 'Личный кабинет'} 
          Icon={ProfileIcon} 
          link={userAuthorized ? '/profile' : '/login'} 
        />
      </div>
    </header>
  )
}

export default memo(Header)