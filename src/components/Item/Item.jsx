import React from "react";
import propTypes from 'prop-types';
import styles from './item.module.css';

export default function Item(props){
  return (
    <div className={props.itemType == 'primary' ? `p-5 ${styles.item}` : `p-5 ${styles.item} ${styles.selected}`}>
      {props.children}
      <span className={`ml-2 text text_type_main-default`}>{props.text}</span>
    </div>
    )
}

Item.propTypes = {
  children: propTypes.node,
  itemType: propTypes.string.isRequired,
  text: propTypes.string.isRequired
}