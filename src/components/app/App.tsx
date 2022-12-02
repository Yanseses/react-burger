import React, { useEffect } from 'react';
import AppHeader from '../AppHeader/Header.jsx';
import styles from './App.module.css';
import Main from '../Main/Main';
import BurgerIngridients from '../Main/BurgerIngridients/BurgerIngridients.jsx';
import { useIngridientsData } from '../../hooks/useIngridientsData.jsx';
import BurgerConstructor from '../Main/BurgerConstructor/BurgerConstructor.jsx';
import Modal from '../modal/Modal.jsx';

export default function App() {
  const [ ingridients ] = useIngridientsData();
  const [ order, setOrder ] = React.useState([]);
  const [ state, setState ] = React.useState({
    hasError: false,
    data: []
  });

  useEffect(() => {
    if(state.data.length > 0){
      setOrder([...state.data])
    }
  }, [state])

  React.useEffect(() => {
    if(ingridients.hasError){
      setState({ 
        data: ingridients.data, 
        hasError: ingridients.hasError
      })
    } else {
      if(ingridients.data.length > 0){
        setState({...state, data: ingridients.data});
      }
    }
  }, [ingridients]);

  return (
    <div>
      <AppHeader />
      { !state.hasError && (
        <Main>
          <BurgerIngridients data={state.data}/>
          <BurgerConstructor data={order}/>
        </Main>
        ) 
      }
    </div>
  );
}
