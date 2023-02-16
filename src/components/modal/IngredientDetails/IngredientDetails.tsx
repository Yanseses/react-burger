import { useParams } from 'react-router-dom';
import styles from './ingredientDetails.module.css'
import { useDispatch, useSelector } from "../../../services/hooks";
import { useEffect, FC } from 'react';
import { IIngridient, TUrlParams } from '../../../utils/types';
import { addModalIngridient } from '../../../services/actions/main';
import { Text } from '../../Text/Text';

export const IngridientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<TUrlParams>();
  const { ingridients, ingridientModal } = useSelector(store => ({
    ingridients: store.main.ingridients,
    ingridientModal: store.main.ingridientModal
  }));

  useEffect(() => {
    const data = ingridients.find((el: IIngridient) => el._id === id);

    if(data){
      dispatch(addModalIngridient(data))
    }
  }, [dispatch, id, ingridients]);

  return (
    <div className={styles.ingredientDetails}>
      <img 
        src={ingridientModal ? ingridientModal.image_large : ''} 
        alt={ingridientModal ? ingridientModal.name : ''} 
      />
      <h3 className={`${styles.ingridientDetails__title} text text_type_main-medium mt-4`}>
        {ingridientModal && ingridientModal.name}
      </h3>
      <ul className={`${styles.ingredientDetails__detail} mt-8`}>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <Text As='p' textSize='default' isInactive>Калории, ккал</Text>
          <Text As='p' numberSize='default' isInactive>{ingridientModal && ingridientModal.calories}</Text>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <Text As='p' textSize='default' isInactive>Белки, г</Text>
          <Text As='p' numberSize='default' isInactive>{ingridientModal && ingridientModal.proteins}</Text>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <Text As='p' textSize='default' isInactive>Жиры, г</Text>
          <Text As='p' numberSize='default' isInactive>{ingridientModal && ingridientModal.fat}</Text>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <Text As='p' textSize='default' isInactive>Углеводы, г</Text>
          <Text As='p' numberSize='default' isInactive>{ingridientModal && ingridientModal.carbohydrates}</Text>
        </li>
      </ul>
    </div>
  )
}