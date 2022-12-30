import styles from './ingridients.module.css';
import IngridientDetails from "../../components/modal/IngredientDetails/IngredientDetails";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ADD_MODAL_INGRIDIENTS } from '../../services/actions';

export default function Ingridients(){
  // const dispatch = useDispatch();
  // const ingridients = useSelector(store => store.main.ingridients);
  // const { id } = useParams();

  // useEffect(() => {
  //   const modalData = ingridients.find(el => console.log(el));
  //   dispatch({
  //     type: ADD_MODAL_INGRIDIENTS,
  //     data: modalData
  //   })
  // }, [])
  

  return (
    <main className={styles.ingridients}>
      <section className={styles.ingridients__item}>
        <h2 className="text text_type_main-large">Детали ингридиента</h2>
        <IngridientDetails />
      </section>
    </main>
  )
}