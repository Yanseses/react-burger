import React from 'react';
import AppHeader from '../AppHeader/Header.jsx';
import styles from './App.module.css';
import Main from '../Main/Main';
import BurgerIngridients from '../Main/BurgerIngridients/BurgerIngridients.jsx';
import BurgerConstructor from '../Main/BurgerConstructor/BurgerConstructor.jsx';

export default function App() {
  return (
    <div>
      <AppHeader />
        <Main>
          <BurgerIngridients />
          <BurgerConstructor />
        </Main>
    </div>
  );
}
