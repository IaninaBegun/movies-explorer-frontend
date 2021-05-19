import React from 'react';

import './MoviesCard.css';


function MoviesCard ({movie, isSavedMovie}) {

  const [ isSaved, setIsSaved ] = React.useState(false);

  function movieIsSaved () {
    setIsSaved(true);
  }

  function countHours(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  }

  const imageUrl = `https://api.nomoreparties.co${movie.image.url}`;

  return(
    <li className="movie__element">
      {!isSavedMovie ?
      <button className={`movie__btn ${ isSaved ? `movie__btn_saved` : `movie__btn_notSaved`}`} type="button" onClick={() => movieIsSaved()}>{ isSaved ? `` : `Сохранить`}</button>
      : <button className="movie__btn movie__btn_remove"/>}

      <img className="movie__image" src={imageUrl} alt={movie.nameRU} />
      <div className="movie__item">
        <h3 className="movie__title">{movie.nameRU}</h3>
        <p className="movie__duration">{countHours(movie.duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;
