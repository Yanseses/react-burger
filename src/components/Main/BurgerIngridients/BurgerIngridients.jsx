import React from "react";
import propTypes from 'prop-types';
import styles from './burgerIngridients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsCategory from "./Ingridients/Ingridients";

export default function BurgerIngridients(props){
  const [ current, setCurrent ] = React.useState('bun');
  const [ state, setState ] = React.useState({
    bun: [],
    main: [],
    sauce: []
  });

  React.useEffect(() => {
    setState({
      bun: props.data.filter(el => el.type == 'bun'),
      main: props.data.filter(el => el.type == 'main'),
      sauce: props.data.filter(el => el.type == 'sauce')
    })
  }, [props])

  return (
    <section className="pt-10 text text_type_main-default">
      <h2 className="text_type_main-large mb-0 mt-0">
        Соберите бургер
      </h2>
      <div className={styles.burgerIngridients__tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.burgerIngridients__list} mt-10`}>
        <IngridientsCategory data={state.bun} category={'Булки'} />
        <IngridientsCategory data={state.sauce} category={'Соусы'} />
        <IngridientsCategory data={state.main} category={'Начинки'} />
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