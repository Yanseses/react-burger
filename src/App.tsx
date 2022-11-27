import { useEffect, useState } from 'react';
import AppHeader from './components/AppHeader/Header.jsx';
import './App.css';
import Main from './components/Main/Main';
import BurgerIngridients from './components/Main/BurgerIngridients/BurgerIngridients.jsx';
import { useIngridients } from './hooks/useIngridients.jsx';
import BurgerConstructor from './components/Main/BurgerConstructor/BurgerConstructor.jsx';

export default function App() {
  const [ ingridients ] = useIngridients();
  const [ state, setState ] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  useEffect(() => {
    changeState();
  }, [ ingridients ]);

  const changeState = () => {
    setState({...state, data: ingridients});
  }

  return (
    <div>
      <AppHeader />
      <Main>
        <BurgerIngridients data={state.data}/>
        <BurgerConstructor />
      </Main>
    </div>
  );
}
