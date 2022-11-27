import React from "react";
import './menu.css';
import Item from "../../Item/Item";
import { BurgerIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Menu(){
  
  return (
    <nav className="menu">
      <Item text={'Конструктор'} itemType={'primary'}>
        <BurgerIcon type='primary' />
      </Item>
      <Item text={'Лента заказов'} itemType={'secondary'}>
        <ListIcon type='secondary'/>
      </Item>
    </nav>
  )
}