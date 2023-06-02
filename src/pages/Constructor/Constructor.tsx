import styles from './constructor.module.css';
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { BurgerIngridients } from "../../components/BurgerIngridients/BurgerIngridients";
import { DndProvider } from "react-dnd";
import { Text } from '../../components/Text/Text';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from '../../services/hooks';
import { Loader } from '../../components/Loader/Loader';

export default function Constructor(){
  const request = useSelector(store => store.main.order.request);

  return (
    <main className={`${styles.constructor}`}>
      <Text As='h1' textSize='large'>
        Соберите бургер
      </Text>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.constructor__wrapper}>
          <BurgerIngridients />
          <BurgerConstructor />
        </div>
      </DndProvider>

      { request && (
        <Loader />  
        ) 
      }
    </main>
  )
}