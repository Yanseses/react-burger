import styles from './ingridients.module.css';
import IngridientDetails from "../../components/modal/IngredientDetails/IngredientDetails";

export default function Ingridients(){
  return (
    <main className={styles.ingridients}>
      <section className={styles.ingridients__item}>
        <h2 className="text text_type_main-large">Детали ингридиента</h2>
        <IngridientDetails />
      </section>
    </main>
  )
}