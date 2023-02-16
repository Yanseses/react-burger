import { useEffect, FC } from "react";
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from "../../services/hooks";
import styles from './burgerIngridients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingridients } from "./Ingridients/Ingridients";
import { IngridientsItem } from "./Ingridients/IngridientsItem/IngridientsItem";
import { Link, useLocation } from "react-router-dom";
import { IIngridient } from "../../utils/types";
import { tabSwitch } from "../../services/actions/main";
import { Text } from "../Text/Text";

export const BurgerIngridients: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [ bunsRef, inWiewBuns, entryBuns ] = useInView({threshold: 0});
  const [ mainRef, inWiewMain, entryMain ] = useInView({threshold: 0});
  const [ sauceRef, inWiewSauce, entrySauce ] = useInView({threshold: 0});
  const { activeTab, data } = useSelector(store => ({
    activeTab: store.main.activeTab,
    data: store.main.ingridients,
  }));
  
  useEffect(() => {
    if(inWiewBuns){
      dispatch(tabSwitch('bun'))
    } else if(inWiewSauce){
      dispatch(tabSwitch('sauce'))
    } else if(inWiewMain){
      dispatch(tabSwitch('main'))
    }
  }, [dispatch, inWiewBuns, inWiewMain, inWiewSauce]);
  
  const handleClickTabs = (e: string) => {
    switch(e){
      case 'main': {
        entryMain?.target.scrollIntoView();
        break;
      }
      case 'sauce': {
        entrySauce?.target.scrollIntoView();
        break;
      }
      default: {
        entryBuns?.target.scrollIntoView();
      }
    }
  }
  
  return (
    <section className={`${styles.burgerIngridients} pt-10`}>
      <Text As='h2' textSize='large'>
        Соберите бургер
      </Text>
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
      <ul className={`${styles.burgerIngridients__list} mt-5`}>
        <Ingridients title={'Булки'} refCategory={bunsRef}>
          { data && data
            .filter((el: IIngridient) => el.type === 'bun') 
            .map((el: IIngridient) => (
              <Link 
                key={el._id} 
                className={styles.burgerIngridients__link}
                to={{
                  pathname: `/ingridients/${el._id}`,
                  state: { modal: location }
                }}>
                <IngridientsItem {...el}/>
              </Link>
            ))
          }
        </Ingridients>
        <Ingridients title={'Соусы'} refCategory={sauceRef}>
          { data && data
            .filter((el: IIngridient) => el.type === 'sauce') 
            .map((el: IIngridient) => (
              <Link 
                key={el._id} 
                className={styles.burgerIngridients__link}
                to={{
                  pathname: `/ingridients/${el._id}`,
                  state: { modal: location }
                }}>
                <IngridientsItem {...el}/>
              </Link>
            ))
          }
        </Ingridients>
        <Ingridients title={'Начинки'} refCategory={mainRef}>
          { data && data
            .filter((el: IIngridient) => el.type === 'main') 
            .map((el: IIngridient) => (
              <Link 
                key={el._id} 
                className={styles.burgerIngridients__link}
                to={{
                  pathname: `/ingridients/${el._id}`,
                  state: { modal: location }
                }}>
                <IngridientsItem {...el} />
              </Link>
            ))
          }
        </Ingridients>
      </ul>
    </section>
  )
}