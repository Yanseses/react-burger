import { useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from "react-redux";
import styles from './burgerIngridients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingridients } from "./Ingridients/Ingridients";
import { IngridientsItem } from "./Ingridients/IngridientsItem/IngridientsItem";
import { TAB_SWITCH } from '../../services/actions/index';
import { Link, useLocation } from "react-router-dom";

export interface IIngridient {
  name: string,
  _id: string,
  type: string,
  image: string,
  price: number,
  __v: number,
  calories?: number,
  carbohydrates?: number,
  fat?: number,
  image_large?: string,
  image_mobile?: string,
  proteins?: number,
  id?: string
}

export default function BurgerIngridients(): JSX.Element{
  const location = useLocation();
  const dispatch = useDispatch();
  const [ bunsRef, inWiewBuns, entryBuns ] = useInView({threshold: 0});
  const [ mainRef, inWiewMain, entryMain ] = useInView({threshold: 0});
  const [ sauceRef, inWiewSauce, entrySauce ] = useInView({threshold: 0});
  const { activeTab, data }: any = useSelector<any>(store => ({
    activeTab: store.main.activeTab,
    data: store.main.ingridients,
  }));

  useEffect(() => {
    if(inWiewBuns){
      dispatch({type: TAB_SWITCH, tab: 'bun'})
    } else if(inWiewSauce){
      dispatch({type: TAB_SWITCH, tab: 'sauce'})
    } else if(inWiewMain){
      dispatch({type: TAB_SWITCH, tab: 'main'})
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