import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { initialMoviesCards } from '../../utils/constants';

function MoviesCardList ( {isSavedMovies} ) {

  return (
    <section className="movies page__section">
      <ul className="movies__list">
        {initialMoviesCards.map((movie) => {
          const movieKey = movie.id;
            return(
              <MoviesCard
                key={movieKey}
                movie={movie}
                isSavedMovie={isSavedMovies}
              />
            );
        })}
      </ul>
      <button type="submit" className={ !isSavedMovies ? `movies__btn` : `movies__btn_invsible`}>Ещё</button>
    </section>
  )
}

export default MoviesCardList;
