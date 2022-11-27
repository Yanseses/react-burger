import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngridients(props){
  const [ current, setCurrent ] = React.useState('bun');

  return (
    <section className="pt-10 text text_type_main-default">
      <h2 className="text_type_main-large mb-5" style={{marginTop: 0}}>
        Соберите бургер
      </h2>
      <div style={{ display: 'flex' }}>
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
      {props}
    </section>
  )
}