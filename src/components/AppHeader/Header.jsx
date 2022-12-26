import React from "react";
import styles from './header.module.css';
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Item from "../Item/Item";
import { useSelector } from "react-redux";

export default React.memo(function Header(){
  const { userAuthorized, user } = useSelector(store => ({
    userAuthorized: store.auth.userAuthorized,
    user: store.auth.user
  }));

  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={styles.header__container}>
        <nav className={styles.header__navList}>
          <Item text={'Конструктор'} Icon={BurgerIcon} link={'/'} />
          <Item text={'Лента заказов'} Icon={ListIcon} link={'/some-link'} />
        </nav>
        <Logo />
        { userAuthorized ? (
          <Item text={user.name} Icon={ProfileIcon} link={'/profile'} />
          ) : (
          <Item text={'Личный кабинет'} Icon={ProfileIcon} link={'/login'} />
          )
        }
      </div>
    </header>
  )
})