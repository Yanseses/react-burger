import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import styles from'./ingridientsItem.module.css';
import { FC } from "react";
import { IIngridient } from "../../../../utils/types";
import { Price } from "../../../BurgerConstructor/Price/Price";
import { Text } from "../../../Text/Text";
import { useMediaQuery } from "react-responsive";

export const IngridientsItem: FC<IIngridient> = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1240px)' });
  const { image, image_mobile, _id, name, price, type, counter = 0 } = props;
  const [{ opacity }, ref] = useDrag({
    type: type === 'bun' ? 'bun' : 'main',
    item: props,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <li 
      className={styles.ingridientsItem} 
      style={{opacity}}
      ref={ref} 
      id={_id}>
        <img src={isMobile ? image_mobile : image} alt={name} />
        <Price textSize={'default'} price={price}/>
        <Text As='p' textSize='default'>
          { name }
        </Text>
      
      { counter > 0 && (
        <Counter count={counter} size="small" />
        ) 
      }
    </li>
  )
}