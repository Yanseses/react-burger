import React from 'react';
import AppHeader from '../AppHeader/Header.jsx';
import styles from './App.module.css';
import Main from '../Main/Main';
import { hardCodeOrder } from '../../utils/hardCodeOrder';
import { IngridientsContext } from '../../context/ingridientsContext';
import BurgerIngridients from '../Main/BurgerIngridients/BurgerIngridients.jsx';
import BurgerConstructor from '../Main/BurgerConstructor/BurgerConstructor.jsx';

export default function App() {
  const [ order, setOrder ] = React.useState(hardCodeOrder);

  return (
    <div>
      <AppHeader />
        <IngridientsContext.Provider value={{order, setOrder}}>
          <Main>
            <BurgerIngridients />
            <BurgerConstructor />
          </Main>
        </IngridientsContext.Provider>
    </div>
  );
}
