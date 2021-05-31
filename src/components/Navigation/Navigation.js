import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

import profileLogo from '../../images/icon-profile-diploma.svg';

function Navigation () {

  const [ isOpen, setIsOpen ] = React.useState(false);

  function openMenu() {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  return (

    <nav className={ !isOpen ? `header__navigation header__navigation_burger_closed` : `header__navigation_burger_opened` }>
      <button className={ isOpen ? `header__nav-btn_close` : `header__nav-btn ` } onClick={()=>openMenu()}/>
      <Link to="/" onClick={openMenu} className={ isOpen ?
        `header__nav-link` : `header__logo-link_inactive` }>Главная</Link>

      <Link to="/movies" onClick={openMenu} className={ !isOpen ?
         `header__nav-link header__nav-link_inactive` : `header__nav-link_movies` }
      >Фильмы</Link>
      <Link to="/saved-movies" onClick={openMenu} className= { !isOpen ?
         `header__nav-link header__nav-link_inactive` : `header__nav-link_saved-movies`}
      >Сохранённые фильмы</Link>
      <Link to="/profile" onClick={openMenu} className= { !isOpen ?
         `header__nav-link header__nav-link_inactive` : `header__nav-link_profile` }>
        <>
          <p className="header__profile-text">Аккаунт</p>
          <img src={profileLogo} alt="Иконка ссылки на профиль пользователя" className="header__profile-img"></img>
        </>
      </Link>
    </nav>

  )
}

export default Navigation;
