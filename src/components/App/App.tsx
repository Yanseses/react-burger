import React, { useEffect } from 'react';
import AppHeader from '../AppHeader/Header.jsx';
import styles from './App.module.css';
import Main from '../Main/Main';
import BurgerIngridients from '../Main/BurgerIngridients/BurgerIngridients.jsx';
import BurgerConstructor from '../Main/BurgerConstructor/BurgerConstructor.jsx';

export default function App() {
  const [ state, setState ] = React.useState({
    hasError: false,
    data: []
  });

  useEffect(() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(el => {
        if(el.ok){
          return el.json()
        } else {
          throw new Error(el.statusText)
        }
      })
      .then(el => {
        if(el.success){
          setState({...state, data: el.data})
        } else {
          throw new Error('404')
        }
      })
      .catch(err => setState({data: err, hasError: true}))
  }, [])

  return (
    <div>
      <AppHeader />
      { !state.hasError && (
        <Main>
          <BurgerIngridients data={state.data} />
          <BurgerConstructor data={state.data} />
        </Main>
        ) 
      }
    </div>
  );
}
