import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { BurgerIngridients } from "../../components/BurgerIngridients/BurgerIngridients";
import styles from './constructor.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Constructor(){
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={`${styles.constructor}`}>
        <BurgerIngridients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  )
}