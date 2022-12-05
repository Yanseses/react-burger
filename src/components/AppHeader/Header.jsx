import React from "react";
import styles from './header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Menu from './Menu/Menu.jsx';
import Auth from './Auth/Auth.jsx';

export default function Header(){

  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={styles.headerContainer}>
        <Menu />
        <Logo />
        <Auth />
      </div>
    </header>
  )
}