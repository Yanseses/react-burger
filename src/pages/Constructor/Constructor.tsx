import styles from './constructor.module.css';
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { BurgerIngridients } from "../../components/BurgerIngridients/BurgerIngridients";
import { DndProvider } from "react-dnd";
import { Text } from '../../components/Text/Text';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'
import { useSelector } from '../../services/hooks';
import { Loader } from '../../components/Loader/Loader';
import { useMediaQuery } from 'react-responsive';

export default function Constructor(){
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' });
  const request = useSelector(store => store.main.order.request);

  return (
    <main className={`${styles.constructor}`}>
      <Text As='h1' textSize='large'>
        Соберите бургер
      </Text>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
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