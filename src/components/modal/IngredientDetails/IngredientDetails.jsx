import React from "react";
import propTypes from 'prop-types';
import styles from './ingredientDetails.module.css'

export default function IngridientDetails(props){
  const { image_large, name, calories, proteins, fat, carbohydrates } = props;

  return (
    <div className={styles.ingredientDetails}>
      <img src={image_large} alt="" />
      <h3 className={`${styles.ingridientDetails__title} text text_type_main-medium mt-4`}>
        {name}
      </h3>
      <ul className={`${styles.ingredientDetails__detail} mt-8 text text_color_inactive`}>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <p className='text_type_main-default'>Калории, ккал</p>
          <p className="text_type_digits-default">{calories}</p>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <p className='text_type_main-default'>Белки, г</p>
          <p className="text_type_digits-default">{proteins}</p>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <p className='text_type_main-default'>Жиры, г</p>
          <p className="text_type_digits-default">{fat}</p>
        </li>
        <li className={`${styles.ingredientDetails__detailItem}`}>
          <p className='text_type_main-default'>Углеводы, г</p>
          <p className="text_type_digits-default">{carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngridientDetails.propTypes = {
  props: propTypes.shape({
    calories: propTypes.number,
    carbohydrates: propTypes.number,
    fat: propTypes.number,
    image: propTypes.string.isRequired,
    image_large: propTypes.string,
    image_mobile: propTypes.string,
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    proteins: propTypes.number,
    type: propTypes.string.isRequired,
    _id: propTypes.string.isRequired
  })
}