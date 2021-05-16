import React from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

function Profile() {
  return(
    <section className="profile">
      <p className="profile__welcomeMessage">
        Привет, Виталий!
      </p>
      <form className="profile__form" noValidate>
        <div className="profile__group">
          <label htmlFor="profile-name" className="profile__label">Имя</label>
          <input
            className="profile__input"
            id="profile-name"
            type="text"
            name="name"
            placeholder="Виталий"
          />
        </div>
        <div className="profile__group">
          <label htmlFor="profile-email" className="profile__label">E-mail</label>
          <input
            className="profile__input"
            id="profile-email"
            name="email"
            type="email"
            minLength="2"
            maxLength="40"
            placeholder="pochta@yandex.ru"
          />
        </div>

        <button type="submit" className="profile__btn">Редактировать</button>

      </form>
      <Link to="/" className="profile__link">Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;
