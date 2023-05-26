import { FC, PropsWithChildren } from "react";
import styles from './ingridients.module.css';
import { Text } from "../../Text/Text";

type TIngridientsCategory = {
  title: string;
  refCategory: any
}

export const Ingridients: FC<PropsWithChildren<TIngridientsCategory>> = ({title, children, refCategory}) => {
  return (
    <li className={styles.ingridients} ref={refCategory}>
      <Text As='h3' textSize='medium'>
        { title }
      </Text>
      <ul className={`pl-4 pr-4 ${styles.ingridients__list}`}>
        {children}
      </ul>
    </li>
  )
}