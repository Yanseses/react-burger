import React from 'react';
import AppHeader from '../AppHeader/Header.jsx';
import styles from './App.module.css';
import Main from '../Main/Main';
import BurgerIngridients from '../Main/BurgerIngridients/BurgerIngridients.jsx';
import { useIngridients } from '../../hooks/useIngridients.jsx';
import BurgerConstructor from '../Main/BurgerConstructor/BurgerConstructor.jsx';

export default function App() {
  const [ ingridients ] = useIngridients();
  const [ state, setState ] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  React.useEffect(() => {
    if(ingridients.length > 0){
      setState({...state, data: ingridients});
    }
  }, [ingridients])

  return (
    <div>
      <AppHeader />
      <Main>
        <BurgerIngridients data={state.data}/>
        <BurgerConstructor data={state.data}/>
      </Main>
    </div>
  );
}
