import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation () {

  return (

    <nav className="header__navigation header__navigation_burger">
      <button className="header__nav-btn header__nav-btn_close header__nav-btn_inactive"/>
      <Link to="/movies" className="header__nav-link header__nav-link_movies">Фильмы</Link>
      <Link to="/saved-movies" className="header__nav-link header__nav-link_saved-movies">Сохранённые фильмы</Link>
      <Link to="/profile" className="header__nav-link header__nav-link_profile">Аккаунт</Link>
    </nav>

  )
}

export default Navigation;
