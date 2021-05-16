import React from 'react';

import './MoviesCard.css';


function MoviesCard ({movie, isSavedMovie}) {

  const [ isSaved, setIsSaved ] = React.useState(false);

  function movieIsSaved () {
    setIsSaved(true);
  }

  return(
    <li className="movie__element">
      {!isSavedMovie ?
      <button className={`movie__btn ${ isSaved ? `movie__btn_saved` : `movie__btn_notSaved`}`} type="button" onClick={() => movieIsSaved()}>{ isSaved ? `` : `Сохранить`}</button>
      : <button className="movie__btn movie__btn_remove"/>}

      <img className="movie__image" src={movie.image.url} alt={movie.nameRU} />
      <div className="movie__item">
        <h3 className="movie__title">{movie.nameRU}</h3>
        <p className="movie__duration">{movie.duration}</p>
      </div>
    </li>
  )
}

export default MoviesCard;
