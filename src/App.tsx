import React from 'react';
import AppHeader from './components/AppHeader/Header.jsx';
import './App.css';
import Main from './components/Main/Main';
import BurgerIngridients from './components/Main/BurgerIngridients/BurgerIngridients.jsx';
import { useIngridients } from './hooks/useIngridients.jsx';
import BurgerConstructor from './components/Main/BurgerConstructor/BurgerConstructor.jsx';

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
    <div style={{height: '100vh'}}>
      <AppHeader />
      <Main>
        <BurgerIngridients  data={state.data}/>
        <BurgerConstructor />
      </Main>
    </div>
  );
}
