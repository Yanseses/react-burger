import React from "react";
import propTypes from 'prop-types';
import styles from './ingridients.module.css'

export default function Ingridients({title, children}){
  return (
    <li className="mb-10">
      <h3 className={`text_type_main-medium ${styles.title}`}>
        {title}
      </h3>
      <ul className={`pl-4 pr-4 pt-6 ${styles.ingridientsList}`}>
        {children}
      </ul>
    </li>
  )
}

Ingridients.propTypes = {
  children: propTypes.node.isRequired,
  title: propTypes.string
}