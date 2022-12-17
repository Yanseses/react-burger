import style from './price.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

export default function Price(){
  const orderPrice = useSelector(store => store.main.orderPrice);

  return (
    <div className={`${style.price} mr-10`}>
      <span className="text text_type_digits-medium mr-2">{orderPrice}</span>
      <CurrencyIcon type="primary" />
    </div>
  )
}