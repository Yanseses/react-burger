import styles from './ingridients.module.css';
import IngridientDetails from "../../components/modal/IngredientDetails/IngredientDetails";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ADD_MODAL_INGRIDIENTS } from '../../services/actions';
import NotFound from '../NotFound/NotFound';

export default function Ingridients(){
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingridients = useSelector(store => store.main.ingridients);
  const data = ingridients.length > 0 ? ingridients.find(el => el._id === id) : {};

  useEffect(() => {
    dispatch({
      type: ADD_MODAL_INGRIDIENTS,
      data
    })
  }, [data]);
  
  if(!data){
    return (
      <NotFound />
    )
  }

  return (
    <main className={styles.ingridients}>
      <section className={styles.ingridients__item}>
        <h2 className="text text_type_main-large">Детали ингридиента</h2>
        <IngridientDetails />
      </section>
    </main>
  )
}