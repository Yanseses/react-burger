import { FC, useState } from "react";
import { useInView } from 'react-intersection-observer';
import { useSelector } from "../../services/hooks";
import styles from './burgerIngridients.module.css';
import { Ingridients } from "./Ingridients/Ingridients";
import { IngridientsItem } from "./Ingridients/IngridientsItem/IngridientsItem";
import { Link, useLocation } from "react-router-dom";
import { IIngridient } from "../../utils/types";
import { Text } from "../Text/Text";
import { Tab } from "../Tab/Tab";

export const BurgerIngridients: FC = () => {
  const location = useLocation();
  const data = useSelector(store => store.main.ingridients.data);
  const [ bunsRef, , entryBuns ] = useInView({ threshold: 0 });
  const [ mainRef, , entryMain ] = useInView({ threshold: 0 });
  const [ sauceRef, , entrySauce ] = useInView({ threshold: 0 });
  const [ activeTab, setActiveTab ] = useState('bun');
  
  const handleClickTabs = (e: string) => {
    switch(e){
      case 'main': {
        setActiveTab('main');
        entryMain?.target.scrollIntoView();
        break;
      }
      case 'sauce': {
        setActiveTab('sauce');
        entrySauce?.target.scrollIntoView();
        break;
      }
      default: {
        setActiveTab('bun')
        entryBuns?.target.scrollIntoView();
      }
    }
  }
  
  return (
    <section className={styles.burgerIngridients}>
      <Text As='h2' textSize='large'>
        Соберите бургер
      </Text>
      { data.length > 0 && (        
        <div className={styles.burgerIngridients__tabs}>
          <Tab value='bun' active={activeTab === 'bun'} onClick={handleClickTabs}>
            Булки
          </Tab>
          <Tab value='sauce' active={activeTab === 'sauce'} onClick={handleClickTabs}>
            Соусы
          </Tab>
          <Tab value='main' active={activeTab === 'main'} onClick={handleClickTabs}>
            Начинки
          </Tab>
        </div>
        )
      }
      <ul className={`${styles.burgerIngridients__list} mt-5`}>
        { data.length > 0 ? (
          <>          
            <Ingridients title={'Булки'} refCategory={bunsRef}>
              { data
                .filter((el: IIngridient) => el.type === 'bun') 
                .map((el: IIngridient) => (
                  <Link 
                    key={el._id} 
                    className={styles.burgerIngridients__link}
                    to={`/ingridients/${el._id}`}
                    state={{ modal: location }}>
                    <IngridientsItem {...el}/>
                  </Link>
                )) 
              }
            </Ingridients>
            <Ingridients title={'Соусы'} refCategory={sauceRef}>
              { data
                .filter((el: IIngridient) => el.type === 'sauce') 
                .map((el: IIngridient) => (
                  <Link 
                    key={el._id} 
                    className={styles.burgerIngridients__link}
                    to={`/ingridients/${el._id}`}
                    state={{ modal: location }}>
                    <IngridientsItem {...el}/>
                  </Link>
                ))
              }
            </Ingridients>
            <Ingridients title={'Начинки'} refCategory={mainRef}>
              { data
                .filter((el: IIngridient) => el.type === 'main') 
                .map((el: IIngridient) => (
                  <Link 
                    key={el._id} 
                    className={styles.burgerIngridients__link}
                    to={`/ingridients/${el._id}`}
                    state={{ modal: location }}>
                    <IngridientsItem {...el} />
                  </Link>
                ))
              }
            </Ingridients>
          </>
          ) : (
            <div className={styles.burgerIngridients__list_void}>
              Ингридиенты не найдены
            </div>  
          )
        }
      </ul>
    </section>
  )
}