import propTypes from 'prop-types';
import styles from './item.module.css';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Item({text, Icon, link}){
  const location = useLocation();

  return (
    <NavLink exact to={{ pathname: `${link}`}} className={styles.item} activeClassName={styles.item__active}>
      <Icon type={location.pathname == link ? 'primary' : 'secondary'} />
      <span className={`text text_type_main-default`}>{text}</span>
    </NavLink>
  )
}

Item.propTypes = {
  Icon: propTypes.elementType,
  link: propTypes.string.isRequired,
  text: propTypes.string.isRequired
}