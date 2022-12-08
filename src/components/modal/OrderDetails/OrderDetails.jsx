import React from "react";
import propTypes from 'prop-types';
import sucessLogo from '../../../images/graphics.svg'
import styles from './orderDetails.module.css';

export default function OrderDetails(props){
  return (
    <div className={`${styles.orderDetails} mt-4 mb-20 text`}>
      <h3 className={`${styles.orderDetails__identification} text_type_digits-large`}>
        {props.order}
      </h3>
      <div className={`${styles.orderDetails__main} mt-8`}>
        <p className={`${styles.orderDetails__title} text_type_main-medium`}>
          идентификатор заказа
        </p>
        <img src={sucessLogo} alt="" />
        <div className={styles.orderDetails__descr}>
          <p className={`${styles.orderDetails__descrText} text_type_main-default`}>
            Ваш заказ начали готовить
          </p>
          <p className={`${styles.orderDetails__descrText} text_type_main-default text_color_inactive`}>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>
    </div>
  )
}

OrderDetails.propTypes = {
  order: propTypes.number
}