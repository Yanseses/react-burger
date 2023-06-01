import styles from './feedItem.module.css';
import { FC } from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngridient, IWsOrder } from "../../../utils/types";
import { useSelector } from "../../../services/hooks";
import { Price } from "../../BurgerConstructor/Price/Price";
import { IngridientsIcon } from "../../BurgerIngridients/IngridientsIcon/IngridientsIcon";
import { Text } from "../../Text/Text";

export const FeedItem: FC<IWsOrder> = ({ 
  name, 
  ingredients,
  number,
  updatedAt,
  status, 
  isPrivate
}) => {
  const ingridients = useSelector(store => store.main.ingridients.data);
  const actualIngredients = ingredients.map((el: string) => {
    return ingridients.find((ingridient: IIngridient) => ingridient._id === el)
  });
  
  return (
    <>
      <div className={styles.feedItem__head}>
        <Text As='p' numberSize='default'>
          { `#${number}` }
        </Text>
        <Text As='p' textSize='default' color={'inactive'}>
          <FormattedDate date={new Date(updatedAt)} />
        </Text>
      </div>
      <Text As='p' textSize='medium'>
        { name }
      </Text>
      { isPrivate && (
        <p className={ status === 'done' 
          ? `${styles.feedItem__status} text text_type_main-default` 
          : 'text text_type_main-default'}
        >
          { status === 'done' 
            ? 'Выполнено' 
            : status === 'created' 
              ? 'Создано'
              : 'Ожидание'
          }
        </p>
        ) 
      }
      <div className={styles.feedItem__orderDetail}>
        <div className={styles.feedItem__ingridients}>
          { actualIngredients.map((el: IIngridient | undefined, i: number, arr) => {
            if( i >= 5 ){
              return;
            }
            if(i === 4){
              return (
                <IngridientsIcon 
                  key={i}
                  image={el && el.image_mobile} 
                  index={i} 
                  extraClass={styles.feedItem__img}
                  excess={arr.length - i}/>
                )
            }
            return (
              <IngridientsIcon 
                key={i}
                image={el && el.image_mobile} 
                index={i} 
                extraClass={styles.feedItem__img}/>
              )
          }) 
          }
        </div>
        <Price 
          price={actualIngredients.reduce((acc: number, curr: IIngridient | undefined) => 
            curr ? curr.price + acc : 0, 0)} 
          textSize={'default'}
        />
      </div>
    </>
  )
}