import React from "react";
import propTypes from 'prop-types';
import { ingredientType } from "../../../utils/types";
import styles from './burgerIngridients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingridients from "./Ingridients/Ingridients";
import Modal from "../../modal/Modal";
import IngridientDetails from "../../modal/IngredientDetails/IngredientDetails";
import IngridientsItem from "./Ingridients/IngridientsItem/IngridientsItem";

export default function BurgerIngridients({data}){
  const [ isModalOpen, setIsModalOpen ] = React.useState(false);
  const [ ingridientModal, setIngridientModal ] = React.useState({});
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
  }, [data]);

  const handleClick = React.useCallback((e) => {
    const handledElement = e.nativeEvent.path[2].id;
    setIngridientModal(data.find(el => el._id == handledElement));
    setIsModalOpen(true)
  });

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
        <Ingridients title={'Булки'} >
          { category.bun && category.bun.map(el => (
              <IngridientsItem {...el} key={el._id} onClick={handleClick}/>
            ))
          }
        </Ingridients>
        <Ingridients title={'Соусы'}>
          { category.sauce && category.sauce.map(el => (
              <IngridientsItem {...el} key={el._id} onClick={handleClick}/>
            ))
          }
        </Ingridients>
        <Ingridients title={'Начинки'}>
          { category.main && category.main.map(el => (
              <IngridientsItem {...el} key={el._id} onClick={handleClick}/>
            ))
          }
        </Ingridients>
      </ul>

      { isModalOpen && (
        <Modal title={'Детали ингридиента'} onClose={() => setIsModalOpen(false)}>
          <IngridientDetails ingridient={ingridientModal}/>
        </Modal>
        ) 
      }
    </section>
  )
}


BurgerIngridients.propTypes = {
  data: propTypes.arrayOf(ingredientType).isRequired
}