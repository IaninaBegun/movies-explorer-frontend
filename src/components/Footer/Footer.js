import React from 'react';

import { Switch, Route } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return(
    <footer className="footer">
      <Switch>

        <Route exact path="/">
          <div className="footer__content">
            <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className="footer__info">
              <p className="footer__copyright">&copy;2021</p>
              <nav>
                <ul className="footer__links">
                  <li className="footer__item"><a href="https://praktikum.yandex.ru" className="footer__link">Яндекс.Практикум</a></li>
                  <li className="footer__item"><a href="https://github.com" className="footer__link footer__link_margins">Github</a></li>
                  <li className="footer__item"><a href="https://ru-ru.facebook.com/" className="footer__link">Facebook</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </Route>

        <Route path="/movies">
          <div className="footer__content">
            <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className="footer__info">
              <p className="footer__copyright">&copy;2021</p>
              <nav>
                <ul className="footer__links">
                  <li className="footer__item"><a href="https://praktikum.yandex.ru" className="footer__link">Яндекс.Практикум</a></li>
                  <li className="footer__item"><a href="https://github.com" className="footer__link footer__link_margins">Github</a></li>
                  <li className="footer__item"><a href="https://ru-ru.facebook.com/" className="footer__link">Facebook</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </Route>

        <Route path="/saved-movies">
          <div className="footer__content">
            <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className="footer__info">
              <p className="footer__copyright">&copy;2021</p>
              <nav>
                <ul className="footer__links">
                  <li className="footer__item"><a href="https://praktikum.yandex.ru" className="footer__link">Яндекс.Практикум</a></li>
                  <li className="footer__item"><a href="https://github.com" className="footer__link footer__link_margins">Github</a></li>
                  <li className="footer__item"><a href="https://ru-ru.facebook.com/" className="footer__link">Facebook</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </Route>

      </Switch>
    </footer>
  )
}

export default Footer;
