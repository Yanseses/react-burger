import { FC } from "react";
import styles from './ingridientsIcon.module.css';

interface IIngridientIcon {
  index?: number,
  image?: string,
  extraClass?: string
}

export const IngridientsIcon: FC<IIngridientIcon> = ({image, index, extraClass}) => {
  return (
    <div 
      className={`${styles.ingridientsIcon} ${extraClass}`} 
      style={index !== undefined ? { zIndex: 50 - index, left: 30 * index  } : {}}
    >
      <img src={image} alt="" className={styles.ingridientsIcon__image}/>
    </div>
  )
}