import React from "react";
import './ingridients.css'
import IngridientsItem from "./IngridientsItem/IngridientsItem";

export default function Ingridients(props){

  return (
    <li className="mt-10">
      <h3 className='text_type_main-default title'>
        {props.category}
      </h3>
      <ul className='pl-4 pr-4 pt-6 ingridients-list'>
        {props.data.map(el => 
          <IngridientsItem  
            image={el.image}
            name={el.name}
            price={el.price}
            key={el._id}/>
          )
        }
      </ul>
    </li>
  )
}