import React from "react";
import propTypes from 'prop-types';
import styles from './burgerIngridients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingridients from "./Ingridients/Ingridients";

export default function BurgerIngridients({data}){
  const [ tabs, setTabs ] = React.useState('bun');
  const [ category, setCategory ] = React.useState({
    bun: [],
    main: [],
    sauce: []
  });

  React.useEffect(() => {
    setCategory({
      bun: data.filter(el => el.type == 'bun'),
      main: data.filter(el => el.type == 'main'),
      sauce: data.filter(el => el.type == 'sauce')
    })
  }, [data])

  return (
    <section className="pt-10 text text_type_main-default">
      <h2 className="text_type_main-large mb-0 mt-0">
        Соберите бургер
      </h2>
      <div className={styles.burgerIngridients__tabs}>
        <Tab value="bun" active={tabs === 'bun'} onClick={setTabs}>
          Булки
        </Tab>
        <Tab value="sauce" active={tabs === 'sauce'} onClick={setTabs}>
          Соусы
        </Tab>
        <Tab value="main" active={tabs === 'main'} onClick={setTabs}>
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.burgerIngridients__list} mt-10`}>
        <Ingridients data={category.bun} category={'Булки'} />
        <Ingridients data={category.sauce} category={'Соусы'} />
        <Ingridients data={category.main} category={'Начинки'} />
      </ul>
    </section>
  )
}


BurgerIngridients.propTypes = {
  data: propTypes.arrayOf(propTypes.shape({
    calories: propTypes.number,
    carbohydrates: propTypes.number,
    fat: propTypes.number,
    image: propTypes.string.isRequired,
    image_large: propTypes.string,
    image_mobile: propTypes.string,
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    proteins: propTypes.number,
    type: propTypes.string.isRequired,
    _id: propTypes.string.isRequired
  })).isRequired
}