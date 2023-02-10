import styles from './ingridients.module.css';
import { IngridientDetails } from "../../components/modal/IngredientDetails/IngredientDetails";
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { IIngridient, TUrlParams } from '../../utils/types';
import { Text } from '../../components/Text/Text';

export default function Ingridients(){
  const { id } = useParams<TUrlParams>();
  const ingridients = useSelector(store => store.main.ingridients);
  const data = ingridients.length > 0 ? ingridients.find((el: IIngridient) => el._id === id) : {};

  if(!data){
    return (
      <Redirect to={'/'}/>
    )
  }

  return (
    <main className={styles.ingridients}>
      <section className={styles.ingridients__item}>
        <Text As='h2' textSize='large'>Детали ингридиента</Text>
        <IngridientDetails />
      </section>
    </main>
  )
}