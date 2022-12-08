import React from "react";
import style from './price.module.css';
import { IngridientsContext } from "../../../../context/ingridientsContext";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Price(){
  const { order } = React.useContext(IngridientsContext);

  return (
    <div className={`${style.price} mr-10`}>
      <span className="text text_type_digits-medium mr-2">{order.price}</span>
      <CurrencyIcon type="primary" />
    </div>
  )
}