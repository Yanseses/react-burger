import React from "react";
import './item.css';

export default function Item(props){
  return (
    <div className={props.itemType == 'primary' ? "p-5 item" : 'p-5 item selected'}>
      {props.children}
      <span className="ml-2 text text_type_main-default">{props.text}</span>
    </div>
    )
}