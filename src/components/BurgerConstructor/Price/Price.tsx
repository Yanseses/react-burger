import { FC } from 'react';
import style from './price.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IPrice {
  price: number,
  textSize: 'medium' | 'large' | 'default'
}

export const Price: FC<IPrice> = ({price, textSize}) => {  
  return (
    <div className={`${style.price}`}>
      <p className={`${style.price__title} text text_type_digits-${textSize}`}>
        {price}
      </p>
      <CurrencyIcon type="primary" />
    </div>
  )
}