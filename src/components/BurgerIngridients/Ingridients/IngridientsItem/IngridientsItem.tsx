import { Counter } from "../../../Counter/Counter";
import { Button } from "../../../Button/Button";
import { useDrag } from "react-dnd";
import styles from'./ingridientsItem.module.css';
import { FC, SyntheticEvent, memo } from "react";
import { IIngridient } from "../../../../utils/types";
import { Price } from "../../../BurgerConstructor/Price/Price";
import { Text } from "../../../Text/Text";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "../../../../services/hooks";
import { orderBunsChange, orderMainChange } from "../../../../services/actions/main";

export const IngridientsItem: FC<IIngridient> = memo((props) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1240px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' });
  const dispatch = useDispatch();
  const { image, image_mobile, _id, name, price, type, counter = 0 } = props;
  const [{ opacity }, ref] = useDrag({
    type: type === 'bun' ? 'bun' : 'main',
    item: props,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const handleButtonClick = (event: SyntheticEvent) => {
    event.preventDefault();

    if(type === 'bun'){
      if(counter === 0) dispatch(orderBunsChange(props))
    } else {
      dispatch(orderMainChange(props))
    }
  }

  return (
    <li 
      className={styles.ingridientsItem} 
      style={{opacity}}
      ref={ref} 
      id={_id}>
        <img src={isTablet ? image_mobile : image} alt={name} />
        <Price textSize={'default'} price={price}/>
        <Text As='p' textSize='default' extraClass={styles.ingridientsItem__name}>
          { name }
        </Text>
        { isMobile && ( 
          <Button htmlType="button" type="secondary" onClick={handleButtonClick}>
            Добавить
          </Button> 
          ) 
        }
      
      { counter > 0 && (
        <Counter count={counter} size="small" />
        ) 
      }
    </li>
  )
})