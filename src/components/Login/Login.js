import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login () {
  return(
    <section className="register">
      <p className="register__welcomeMessage">
        Рады видеть!
      </p>
      <form className="register__form" noValidate>
        <label htmlFor="login-email" className="registration__label">E-mail</label>
        <input
          className="register__input register__input_valid"
          id="login-email"
          name="email"
          type="email"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="register__error-message_inactive"/>
        <label htmlFor="login-password" className="registration__label">Пароль</label>
        <input
          className="register__input register__input_invalid"
          id="login-password"
          name="password"
          type="password"
          minLength="8"
          maxLength="40"
          required
        />
        <span className="register__error-message">Что-то пошло не так...</span>

        <button type="submit" className="register__btn register__btn_login">Войти</button>

      </form>
      <div className="register__signin">
          <p className="register__questionSignin">Ещё не зарегистрированы?</p>
          <Link to="signup" className="register__login-link">Регистрация</Link>
      </div>
    </section>
  )
}

export default Login;
