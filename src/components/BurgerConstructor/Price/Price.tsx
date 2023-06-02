import { FC, memo } from 'react';
import style from './price.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TNumberSize, Text } from '../../Text/Text';

interface IPrice {
  price: number,
  textSize: TNumberSize
}

export const Price: FC<IPrice> = memo(({ price, textSize }) => {  
  return (
    <div className={`${style.price}`}>
      <Text As='p' numberSize={`${textSize}`}>
        { price }
      </Text>
      <CurrencyIcon type="primary" />
    </div>
  )
})