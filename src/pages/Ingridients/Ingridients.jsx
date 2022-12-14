import styles from './ingridients.module.css';
import IngridientDetails from "../../components/modal/IngredientDetails/IngredientDetails";
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Ingridients(){
  const { id } = useParams();
  const ingridients = useSelector(store => store.main.ingridients);
  const data = ingridients.length > 0 ? ingridients.find(el => el._id === id) : {};

  if(!data){
    return (
      <Redirect to={'/'}/>
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