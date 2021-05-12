import React from 'react';

import './AboutMe.css';
import profilePic from '../../../images/profile-pic-diploma.png';

function AboutMe () {
  return (
    <section className="aboutMe main__section page__section">
      <h2 className="main__title" id="student-part">Студент</h2>
      <figure className="aboutMe__section">
        <img className="aboutMe__image" src={profilePic} alt="Фотография студента"/>
        <figcaption className="aboutMe__caption">
          <h3 className="aboutMe__title">Виталий</h3>
          <h4 className="aboutMe__subtitle">Фронтенд-разработчик, 30 лет</h4>
          <p className="aboutMe__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <ul className="aboutMe__list">
            <li className="aboutMe__item">
              <a href="https://ru-ru.facebook.com/" className="aboutMe__link">Facebook</a>
            </li>
            <li className="aboutMe__item">
              <a href="https://github.com/IaninaBegun" className="aboutMe__link">Github</a>
            </li>
          </ul>
        </figcaption>
      </figure>
    </section>
  )
}

export default AboutMe;
