import styles from './ingridients.module.css';
import { IngridientDetails } from "../../components/modal/IngredientDetails/IngredientDetails";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { IIngridient, TUrlParams } from '../../utils/types';
import { Text } from '../../components/Text/Text';
import { useEffect } from 'react';

export default function Ingridients(){
  const navigate = useNavigate();
  const { id } = useParams<TUrlParams>();
  const ingridients = useSelector(store => store.main.ingridients.data);
  const data = ingridients.length > 0 ? ingridients.find((el: IIngridient) => el._id === id) : {};

  useEffect(() => {
    if(!data) navigate('/')
  }, [data, navigate])

  return (
    <main className={styles.ingridients}>
      <section className={styles.ingridients__item}>
        <Text As='h2' textSize='large'>Детали ингридиента</Text>
        <IngridientDetails />
      </section>
    </main>
  )
}