import { useEffect, useState, useCallback } from "react";
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from "react-redux";
import styles from './burgerIngridients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingridients from "./Ingridients/Ingridients";
import Modal from "../../modal/Modal";
import IngridientDetails from "../../modal/IngredientDetails/IngredientDetails";
import IngridientsItem from "./Ingridients/IngridientsItem/IngridientsItem";
import { getIngridientsData, TAB_SWITCH } from '../../../services/actions/index';
import { ADD_MODAL_INGRIDIENTS, ORDER_BUNS_CHANGE, ORDER_MAIN_CHANGE } from "../../../services/actions/index";

export default function BurgerIngridients(){
  const dispatch = useDispatch();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ bunsRef, inWiewBuns, entryBuns ] = useInView({threshold: 0});
  const [ mainRef, inWiewMain, entryMain ] = useInView({threshold: 0});
  const [ sauceRef, inWiewSauce, entrySauce ] = useInView({threshold: 0});
  const { activeTab, data } = useSelector(store => ({
    activeTab: store.main.activeTab,
    data: store.main.ingridients,
  }));

  useEffect(() => {
    dispatch(getIngridientsData())
  }, [dispatch]);

  useEffect(() => {
    if(inWiewBuns){
      dispatch({type: TAB_SWITCH, tab: 'bun'})
    } else if(inWiewSauce){
      dispatch({type: TAB_SWITCH, tab: 'sauce'})
    } else if(inWiewMain){
      dispatch({type: TAB_SWITCH, tab: 'main'})
    }
  }, [inWiewBuns, inWiewMain, inWiewSauce]);

  const handleClickTabs = (e) => {
    switch(e){
      case 'main': {
        entryMain.target.scrollIntoView();
        break;
      }
      case 'sauce': {
        entrySauce.target.scrollIntoView();
        break;
      }
      default: {
        entryBuns.target.scrollIntoView();
      }
    }
  }

  const handleClick = useCallback((e) => {
    const modalData = data.find(el => el._id == e.nativeEvent.path[2].id);
    dispatch({
      type: ADD_MODAL_INGRIDIENTS,
      data: modalData
    })
    setIsModalOpen(true);
  });

  return (
    <section className="pt-10 text text_type_main-default">
      <h2 className="text_type_main-large mb-0 mt-0">
        Соберите бургер
      </h2>
      <div className={styles.burgerIngridients__tabs}>
        <Tab value="bun" active={activeTab === 'bun'} onClick={handleClickTabs}>
          Булки
        </Tab>
        <Tab value="sauce" active={activeTab === 'sauce'} onClick={handleClickTabs}>
          Соусы
        </Tab>
        <Tab value="main" active={activeTab === 'main'} onClick={handleClickTabs}>
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.burgerIngridients__list} mt-10`}>
        <Ingridients title={'Булки'} refCategory={bunsRef}>
          { data && data
            .filter(el => el.type == 'bun') 
            .map(el => (
              <IngridientsItem {...el} key={el._id} onClick={handleClick}/>
            ))
          }
        </Ingridients>
        <Ingridients title={'Соусы'} refCategory={sauceRef}>
          { data && data
            .filter(el => el.type == 'sauce') 
            .map(el => (
              <IngridientsItem {...el} key={el._id} onClick={handleClick}/>
            ))
          }
        </Ingridients>
        <Ingridients title={'Начинки'} refCategory={mainRef}>
          { data && data
            .filter(el => el.type == 'main') 
            .map(el => (
              <IngridientsItem {...el} key={el._id} onClick={handleClick}/>
            ))
          }
        </Ingridients>
      </ul>

      { isModalOpen && (
        <Modal title={'Детали ингридиента'} onClose={() => setIsModalOpen(false)}>
          <IngridientDetails />
        </Modal>
        ) 
      }
    </section>
  )
}