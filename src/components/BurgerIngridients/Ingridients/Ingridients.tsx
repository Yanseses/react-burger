import { FC, PropsWithChildren } from "react";
import styles from './ingridients.module.css';

type TIngridients = {
  title: string;
  refCategory: any
}

export const Ingridients: FC<PropsWithChildren<TIngridients>> = ({title, children, refCategory}): JSX.Element => {
  return (
    <li className="mb-10" ref={refCategory}>
      <h3 className={`text_type_main-medium ${styles.title}`}>
        {title}
      </h3>
      <ul className={`pl-4 pr-4 pt-6 ${styles.ingridientsList}`}>
        {children}
      </ul>
    </li>
  )
}