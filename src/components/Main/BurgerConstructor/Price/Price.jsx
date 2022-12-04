import React from "react";
import style from './price.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Price(props){
  return (
    <div className={`${style.price} mr-10`}>
      <span className="text text_type_digits-medium mr-2">{props.data}</span>
      <CurrencyIcon type="primary" />
    </div>
  )
}