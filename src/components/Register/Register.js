import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

function Register ({ onRegister, onError }) {

  const [ name, setName ] = React.useState('');
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const [ nameIsFilled, setNameIsFilled ] = React.useState(false);
  const [ emailIsFilled, setEmailIsFilled ] = React.useState(false);
  const [ passwordIsFilled, setPasswordIsFilled ] = React.useState(false);

  const [ nameErrMessage, setNameErrMessage ] = React.useState('Поле должно быть заполнено');
  const [ emailErrMessage, setEmailErrMessage ] = React.useState('Поле должно быть заполнено');
  const [ passwordErrMessage, setPasswordErrMessage ] = React.useState('Поле должно быть заполнено');

  const [ formValid, setFormValid ] = React.useState(false);

  const nameInputClassName = (
    `${!nameIsFilled ? `register__input` : (`${!nameErrMessage ? 'register__input_valid' : 'register__input_invalid'}`)} `
  );

  const emailInputClassName = (
    `${!emailIsFilled ? `register__input` : (`${!emailErrMessage ? 'register__input_valid' : 'register__input_invalid'}`)} `
  );

  const passwordInputClassName = (
    `${!passwordIsFilled ? `register__input` : (`${!passwordErrMessage ? 'register__input_valid' : 'register__input_invalid'}`)} `
  );

  React.useEffect(() => {
    if (nameErrMessage || emailErrMessage || passwordErrMessage) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailErrMessage, passwordErrMessage, nameErrMessage])

  const blurHandler = (e) => {
    switch(e.target.name) {
      case 'name':
        setNameIsFilled(true)
        break;
      case 'email':
        setEmailIsFilled(true)
        break;
      case 'password':
        setPasswordIsFilled(true)
        break;
      default:
        setNameIsFilled(false)
        setEmailIsFilled(false)
        setPasswordIsFilled(false)
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
    const regex = /^[a-zа-яё\-\s]+$/i;
    if (!regex.test(String(e.target.value).toLowerCase()) || (e.target.value.length < 2) || (e.target.value.length > 40) ) {
      setNameErrMessage('Некорректное имя пользователя');
    } else {
      setNameErrMessage('');
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    const regex = /^[^@]+@[^@.]+\.[^@]+$/;
    if (!regex.test(String(e.target.value).toLowerCase())) {
      setEmailErrMessage('Некорректный email');
    } else {
      setEmailErrMessage('');
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 8 || e.target.value.length > 40) {
      setPasswordErrMessage('Некорректный пароль');
    } else {
      setPasswordErrMessage('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && password){

      onRegister({
        password: password,
        email: email,
        name: name});
    }
  }


  return(
    <section className="register">
      <p className="register__welcomeMessage">
        Добро пожаловать!
      </p>
      <form onSubmit={handleSubmit} className="register__form" noValidate>
        <label htmlFor="registration-name" className="registration__label">Имя</label>
        <input
          className={nameInputClassName}
          id="registration-name"
          type="text"
          name="name"
          required
          value={ name }
          onChange={e => {handleNameChange(e)}}
          onBlur={e => {blurHandler(e)}}
        />
        <span className={
          nameIsFilled && nameErrMessage
          ?
          `register__error-message` : `register__error-message_inactive` }>
            {nameErrMessage}</span>
        <label htmlFor="registration-email" className="registration__label">E-mail</label>
        <input
          className={emailInputClassName}
          id="registration-email"
          name="email"
          type="email"
          minLength="2"
          maxLength="40"
          required
          value={ email }
          onChange={e => {handleEmailChange(e)}}
          onBlur={e => {blurHandler(e)}}
        />
        <span className={
          emailIsFilled && emailErrMessage
          ?
          `register__error-message` : `register__error-message_inactive` }>{emailErrMessage}</span>
        <label htmlFor="registration-password" className="registration__label">Пароль</label>
        <input
          className={passwordInputClassName}
          id="registration-password"
          name="password"
          type="password"
          minLength="8"
          maxLength="40"
          required
          value={ password }
          onChange={e => {handlePasswordChange(e)}}
          onBlur={e => {blurHandler(e)}}
        />
        <span className={
          passwordIsFilled && passwordErrMessage
          ? `register__error-message` : `register__error-message_inactive`
          }>{passwordErrMessage}</span>

        {<span>{onError}</span>}
        <button disabled={!formValid} type="submit" className="register__btn">Зарегистрироваться</button>

      </form>
      <div className="register__signin">
        <p className="register__questionSignin">Уже зарегистрированы?</p>
        <Link to="signin" className="register__login-link">Войти</Link>
      </div>
    </section>
  )
}

export default Register;
