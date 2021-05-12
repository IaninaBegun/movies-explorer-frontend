import React from 'react';
import './NavTab.css';

function NavTab () {
  return(
    <nav className="navtab">
      <li className="navtab__item">
        <a href="#project-part" className="navtab__link">О проекте</a>
      </li>
      <li className="navtab__item">
        <a href="#techs-part" className="navtab__link">Технологии</a>
      </li>
      <li className="navtab__item">
        <a href="#student-part" className="navtab__link">Студент</a>
      </li>
    </nav>
  )
}

export default NavTab;
