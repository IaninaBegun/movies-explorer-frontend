import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

function Register () {

  return(
    <section className="register">
      <p className="register__welcomeMessage">
        Добро пожаловать!
      </p>
      <form className="register__form" noValidate>
        <label htmlFor="registration-name" className="registration__label">Имя</label>
        <input
          className="register__input"
          id="registration-name"
          type="text"
          name="name"
          required
        />
        <span className="register__error-message_inactive"/>
        <label htmlFor="registration-email" className="registration__label">E-mail</label>
        <input
          className="register__input register__input_valid"
          id="registration-email"
          name="email"
          type="email"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="register__error-message_inactive"/>
        <label htmlFor="registration-password" className="registration__label">Пароль</label>
        <input
          className="register__input register__input_invalid"
          id="registration-password"
          name="password"
          type="password"
          minLength="8"
          maxLength="40"
          required
        />
        <span className="register__error-message">Что-то пошло не так...</span>

        <button type="submit" className="register__btn">Зарегистрироваться</button>

      </form>
      <div className="register__signin">
          <p className="register__questionSignin">Уже зарегистрированы?</p>
          <Link to="signin" className="register__login-link">Войти</Link>
      </div>
    </section>
  )
}

export default Register;
