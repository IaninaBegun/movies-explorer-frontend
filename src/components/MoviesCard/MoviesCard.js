import React from 'react';

import './MoviesCard.css';

function MoviesCard ({
  movie,
  isSavedMovie,
  onSavedMovie,
  onDeleteMovie}) {


  const savedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
  const isAddedMovie = savedMovies.find((i) => i.movieId === movie.movieId);

  function toggleMovieSavedState (movie) {
    onSavedMovie(movie);
  }

  /* функция для перевода минут в часы */
  function countHours(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  }


  return(
    <>
    { isSavedMovie ?

      (<li className="movie__element">

        <button className="movie__btn movie__btn_remove" onClick={() => onDeleteMovie(movie)}/>
        <a className="movie__trailerlink"
          href={movie.trailer}
          target="_blank"
          rel="noreferrer oopener"
        >
          <img className="movie__image" src={movie.image} alt={movie.nameRU} />
        </a>
        <div className="movie__item">
          <h3 className="movie__title">{movie.nameRU}</h3>
          <p className="movie__duration">{countHours(movie.duration)}</p>
        </div>
      </li>)

      :

      (<li className="movie__element">
        <button className={`movie__btn ${ isAddedMovie ? `movie__btn_saved` : `movie__btn_notSaved`}`}
          type="button"
          onClick={() => toggleMovieSavedState(movie)}>
          { isAddedMovie ? `` : `Сохранить`}
        </button>
        <a className="movie__trailerlink"
          href={movie.trailer}
          target="_blank"
          rel="noreferrer oopener"
        >
        <img className="movie__image" src={movie.image} alt={movie.nameRU} />
        </a>
        <div className="movie__item">
          <h3 className="movie__title">{movie.nameRU}</h3>
          <p className="movie__duration">{countHours(movie.duration)}</p>
        </div>
      </li>)
    }
    </>
  )

}

export default MoviesCard;
