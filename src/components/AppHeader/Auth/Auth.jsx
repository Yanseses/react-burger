import React from "react";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Item from "../../Item/Item";

export default function Auth(){
  return (
    <Item text={'Личный кабинет'} itemType={'secondary'}>
      <ProfileIcon type='secondary' />
    </Item>
  )
}