import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css';

function Profile( {onSignOut, onUpdateUser, onError} ) {

  const currentUser = React.useContext(CurrentUserContext);

  const [ name, setName ] = React.useState('');
  const [ email, setEmail ] = React.useState('');

  const [ nameErrMessage, setNameErrMessage ] = React.useState('');
  const [ emailErrMessage, setEmailErrMessage ] = React.useState('');

  const [ formValid, setFormValid ] = React.useState(false);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

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

  React.useEffect(() => {
    if (nameErrMessage || emailErrMessage) {
      setFormValid(false);
    } if (name === currentUser.name && email === currentUser.email) {
      setFormValid(false);
    }
     else {
      setFormValid(true);
    }
  }, [emailErrMessage, nameErrMessage, name, email, currentUser.name, currentUser.email])

  function handleSubmit(e) {

    e.preventDefault();

    onUpdateUser({
      name: name,
      email: email,
    });
  }

  return(
    <section className="profile">
      <p className="profile__welcomeMessage">
        Привет, {name}!
      </p>
      <form className="profile__form" onSubmit={handleSubmit} noValidate>
        <div className="profile__group">
          <label htmlFor="profile-name" className="profile__label">Имя</label>
          <input
            className="profile__input"
            id="profile-name"
            type="text"
            name="userName"
            value={name}
            onChange={e => {handleNameChange(e)}}
          />
        </div>
        <span className={
          nameErrMessage
          ?
          `register__error-message` : `register__error-message_inactive` }>
            {nameErrMessage}</span>
        <div className="profile__group">
          <label htmlFor="profile-email" className="profile__label">Email</label>
          <input
            className="profile__input"
            id="profile-email"
            name="userEmail"
            type="email"
            minLength="2"
            maxLength="40"
            value={email}
            onChange={e => {handleEmailChange(e)}}
          />
        </div>
        <span className={
          emailErrMessage
          ?
          `register__error-message` : `register__error-message_inactive` }>{emailErrMessage}</span>

        <span>{onError}</span>
        <button disabled={!formValid} type="submit" className="profile__btn">Редактировать</button>

      </form>
      <Link to="/" className="profile__link" onClick={onSignOut}>Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;
