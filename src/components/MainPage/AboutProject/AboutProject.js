import React from 'react';
import './AboutProject.css';

function AboutProject () {
  return(
    <section className="intro">
      <h2 className="main__title" id="project-part">О проекте</h2>
      <ul className="intro__columns">
        <li className="intro__column">
          <h3 className="intro__title">Дипломный проект включал 5 этапов</h3>
          <p className="intro__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="intro__column">
          <h3 className="intro__title">На выполнение диплома ушло 5 недель</h3>
          <p className="intro__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="intro__items">
        <p className="intro__item intro__item_green">1 неделя</p>
        <p className="intro__item intro__item_grey">4 недели</p>
        <p className="intro__item intro__item_text">Back-end</p>
        <p className="intro__item intro__item_text">Front-end</p>
      </ul>
    </section>
  )
}

export default AboutProject;
