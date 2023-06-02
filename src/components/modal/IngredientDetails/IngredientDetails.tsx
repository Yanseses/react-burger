import { useParams } from 'react-router-dom';
import styles from './ingredientDetails.module.css'
import { useDispatch, useSelector } from "../../../services/hooks";
import { useEffect, FC, memo } from 'react';
import { IIngridient, TUrlParams } from '../../../utils/types';
import { addModalIngridient } from '../../../services/actions/main';
import { Text } from '../../Text/Text';
import { useMediaQuery } from 'react-responsive';

export const IngridientDetails: FC = memo(() => {
  const dispatch = useDispatch();
  const { id } = useParams<TUrlParams>();
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' });
  const modal = useSelector(store => store.main.modal);
  const ingridients = useSelector(store => store.main.ingridients.data);

  useEffect(() => {
    const data = ingridients.find((el: IIngridient) => el._id === id);

    if(data){
      dispatch(addModalIngridient(data))
    }
  }, [dispatch, id, ingridients]);

  return (
    <div className={styles.ingredientDetails}>
      <img 
        src={modal 
          ? isMobile 
            ? modal.image
            : modal.image_large
          : ''} 
        alt={modal ? modal.name : ''} 
      />
      <h3 className={`${styles.ingridientDetails__title} text text_type_main-medium mt-4`}>
        {modal && modal.name}
      </h3>
      <ul className={`${styles.ingredientDetails__detail} mt-8`}>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <Text As='p' textSize='default' color={'inactive'}>Калории, ккал</Text>
          <Text As='p' numberSize='default' color={'inactive'}>{modal && modal.calories}</Text>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <Text As='p' textSize='default' color={'inactive'}>Белки, г</Text>
          <Text As='p' numberSize='default' color={'inactive'}>{modal && modal.proteins}</Text>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <Text As='p' textSize='default' color={'inactive'}>Жиры, г</Text>
          <Text As='p' numberSize='default' color={'inactive'}>{modal && modal.fat}</Text>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <Text As='p' textSize='default' color={'inactive'}>Углеводы, г</Text>
          <Text As='p' numberSize='default' color={'inactive'}>{modal && modal.carbohydrates}</Text>
        </li>
      </ul>
    </div>
  )
})