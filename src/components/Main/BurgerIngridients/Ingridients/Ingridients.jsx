import React from "react";
import propTypes from 'prop-types';
import styles from './ingridients.module.css'
import IngridientsItem from "./IngridientsItem/IngridientsItem";

export default function Ingridients(props){
  return (
    <li className="mb-10">
      <h3 className={`text_type_main-medium ${styles.title}`}>
        {props.category}
      </h3>
      <ul className={`pl-4 pr-4 pt-6 ${styles.ingridientsList}`}>
        {props.data.map(el => (
          <IngridientsItem  
            image={el.image}
            name={el.name}
            price={el.price}
            key={el._id}/>
        ))}
      </ul>
    </li>
  )
}

Ingridients.propTypes = {
  data: propTypes.arrayOf(propTypes.shape({
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
    _id: propTypes.string.isRequired}
    )
  ),
  category: propTypes.string
}