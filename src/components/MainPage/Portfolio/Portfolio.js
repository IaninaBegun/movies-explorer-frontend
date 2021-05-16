import React from 'react';

import './Portfolio.css';

import arrowLink from '../../../images/arrow-link-diploma.svg';

function Portfolio () {
  return (
    <section className="portfolio main__section page__section">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__menu">
        <li className="portfolio__item">Статичный сайт
          <a className="portfolio__link" href="https://github.com/IaninaBegun/how-to-learn">
            <img src={arrowLink} alt="Ссылка для перехода на статичный сайт"/>
          </a>
        </li>
        <li className="portfolio__item">Адаптивный сайт
          <a className="portfolio__link" href="https://ianinabegun.github.io/russian-travel/index.html">
            <img src={arrowLink} alt="Ссылка для перехода на адаптивный сайт"/>
          </a>
        </li>
        <li className="portfolio__item">Одностраничное приложение
          <a className="portfolio__link" href="https://ianinabegun.github.io/mesto/index.html">
            <img src={arrowLink} alt="Ссылка для перехода на одностраничное приложение"/>
          </a>
        </li>
      </nav>
    </section>
  )
}

export default Portfolio;
