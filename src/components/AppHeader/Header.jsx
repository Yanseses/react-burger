import React from "react";
import './header.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Menu from './Menu/Menu.jsx';
import Auth from './Auth/Auth.jsx';

export default function Header(){

  return (
    <header className='p-4 header'>
      <div className="header-container">
        <Menu />
        <Logo />
        <Auth />
      </div>
    </header>
  )
}