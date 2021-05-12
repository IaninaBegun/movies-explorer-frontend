import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationMainPage.css';

function NavigationMainPage() {
  return (
    <nav className="header__navigation">
      <Link to="/signup" className="header__nav-link header__nav-link_register">Регистрация</Link>
      <Link to="/signin" className="header__nav-link header__nav-link_login">Войти</Link>
    </nav>
  )
}

export default NavigationMainPage;
