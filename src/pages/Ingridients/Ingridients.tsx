import styles from './ingridients.module.css';
import { IngridientDetails } from "../../components/modal/IngredientDetails/IngredientDetails";
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IIngridient, TUrlParams } from '../../services/types';

export default function Ingridients(){
  const { id } = useParams<TUrlParams>();
  const ingridients: any = useSelector<any>(store => store.main.ingridients);
  const data = ingridients.length > 0 ? ingridients.find((el: IIngridient) => el._id === id) : {};

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