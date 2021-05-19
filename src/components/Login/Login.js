import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login ({ onLogin, onError } ) {

  const [ authEmail, setAuthEmail ] = React.useState('');
  const [ authPassword, setAuthPassword ] = React.useState('');

  const [ emailIsFilled, setEmailIsFilled ] = React.useState(false);
  const [ passwordIsFilled, setPasswordIsFilled ] = React.useState(false);

  const [ emailErrMessage, setEmailErrMessage ] = React.useState('Поле должно быть заполнено');
  const [ passwordErrMessage, setPasswordErrMessage ] = React.useState('Поле должно быть заполнено');

  const [ formValid, setFormValid ] = React.useState(false);

  const emailInputClassName = (
    `${!emailIsFilled ? `register__input` : (`${!emailErrMessage ? 'register__input_valid' : 'register__input_invalid'}`)} `
  );

  const passwordInputClassName = (
    `${!passwordIsFilled ? `register__input` : (`${!passwordErrMessage ? 'register__input_valid' : 'register__input_invalid'}`)} `
  );

  React.useEffect(() => {
    if ( emailErrMessage || passwordErrMessage ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailErrMessage, passwordErrMessage])

  const blurHandler = (e) => {
    switch(e.target.name) {
      case 'authEmail':
        setEmailIsFilled(true)
        break;
      case 'authPassword':
        setPasswordIsFilled(true)
        break;
      default:
        setEmailIsFilled(false)
        setPasswordIsFilled(false)
    }
  }

  const handleEmailChange = (e) => {
    setAuthEmail(e.target.value)
    const regex = /^[^@]+@[^@.]+\.[^@]+$/;
    if (!regex.test(String(e.target.value).toLowerCase())) {
      setEmailErrMessage('Некорректный email');
    } else {
      setEmailErrMessage('');
    }
  }

  const handlePasswordChange = (e) => {
    setAuthPassword(e.target.value)
    if (e.target.value.length < 8 || e.target.value.length > 40) {
      setPasswordErrMessage('Некорректный пароль');
    } else {
      setPasswordErrMessage('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( authEmail && authPassword){

      onLogin({
        password: authPassword,
        email: authEmail,
      });
    }
  }

  return(
    <section className="register">
      <p className="register__welcomeMessage">
        Рады видеть!
      </p>
      <form onSubmit={handleSubmit} className="register__form" noValidate>
        <label htmlFor="login-email" className="registration__label">E-mail</label>
        <input
          className={emailInputClassName}
          id="login-email"
          name="authEmail"
          type="email"
          minLength="2"
          maxLength="40"
          required
          value={ authEmail }
          onChange={ e => {handleEmailChange(e)} }
          onBlur={e => {blurHandler(e)}}
        />
        <span className={
          emailIsFilled && emailErrMessage
          ?
          `register__error-message` : `register__error-message_inactive` }>{emailErrMessage}</span>
        <label htmlFor="login-password" className="registration__label">Пароль</label>
        <input
          className={passwordInputClassName}
          id="login-password"
          name="authPassword"
          type="password"
          minLength="8"
          maxLength="40"
          required
          value={ authPassword }
          onChange={ e => {handlePasswordChange(e)} }
          onBlur={e => {blurHandler(e)}}
        />
        <span className={
          passwordIsFilled && passwordErrMessage
          ? `register__error-message` : `register__error-message_inactive`
          }>{passwordErrMessage}</span>

        <span>{onError}</span>

        <button disabled={!formValid} type="submit" className="register__btn register__btn_login">Войти</button>

      </form>
      <div className="register__signin">
          <p className="register__questionSignin">Ещё не зарегистрированы?</p>
          <Link to="signup" className="register__login-link">Регистрация</Link>
      </div>
    </section>
  )
}

export default Login;
