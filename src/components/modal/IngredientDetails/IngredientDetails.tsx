import { useParams } from 'react-router-dom';
import styles from './ingredientDetails.module.css'
import { useDispatch, useSelector } from "../../../services/hooks";
import { useEffect, FC } from 'react';
import { IIngridient, TUrlParams } from '../../../utils/types';
import { addModalIngridient } from '../../../services/actions/main';

export const IngridientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<TUrlParams>();
  const { ingridients, ingridientModal }: any = useSelector(store => ({
    ingridients: store.main.ingridients,
    ingridientModal: store.main.ingridientModal
  }));
  const data = ingridients.length > 0 ? ingridients.find((el: IIngridient) => el._id === id) : {};

  useEffect(() => {
    dispatch(addModalIngridient(data))
  }, [dispatch, ingridients]);

  return (
    <div className={styles.ingredientDetails}>
      <img src={ingridientModal.image_large} alt={ingridientModal.name} />
      <h3 className={`${styles.ingridientDetails__title} text text_type_main-medium mt-4`}>
        {ingridientModal.name}
      </h3>
      <ul className={`${styles.ingredientDetails__detail} mt-8 text text_color_inactive`}>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <p className='text_type_main-default'>Калории, ккал</p>
          <p className="text_type_digits-default">{ingridientModal.calories}</p>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <p className='text_type_main-default'>Белки, г</p>
          <p className="text_type_digits-default">{ingridientModal.proteins}</p>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <p className='text_type_main-default'>Жиры, г</p>
          <p className="text_type_digits-default">{ingridientModal.fat}</p>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <p className='text_type_main-default'>Углеводы, г</p>
          <p className="text_type_digits-default">{ingridientModal.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}