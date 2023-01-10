import { memo } from "react";
import styles from './header.module.css';
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Item from "../Item/Item";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default memo(function Header(){
  const { userAuthorized, userName } = useSelector(store => ({
    userAuthorized: store.auth.userAuthorized,
    userName: store.auth.user.name
  }));

  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={styles.header__section}>
        <div className={styles.header__container}>
          <nav className={styles.header__navList}>
            <Item text={'Конструктор'} Icon={BurgerIcon} link={'/'} />
            <Item text={'Лента заказов'} Icon={ListIcon} link={'/some-link'} />
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
})