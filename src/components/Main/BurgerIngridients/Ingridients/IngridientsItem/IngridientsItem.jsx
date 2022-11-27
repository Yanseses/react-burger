import React from "react";
import './ingridientsItem.css';

export default function IngridientsItem(props){

  return (
    <li className="ingridients-item">
      <div className="ingridients-item__head">
        <img src={props.image} alt={props.name} />
        <p className="ingridients-item__text">
          {props.price}
        </p>
      </div>
      <p className="ingridients-item__text">
        {props.name}
      </p>
    </li>
  )
}