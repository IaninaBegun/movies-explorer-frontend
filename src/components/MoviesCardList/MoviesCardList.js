import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList ( {
    isSavedMovie,
    foundMovies,
    onSavedMovie,
    onDeleteMovie,
  } ) {

  const isNotFound = foundMovies && foundMovies.length > 0 ? true : false;

  /*movies, функция получения числа отображаемых изначально после поиска карточек */
  const getMoviesNumber = () => {
    if (window.innerWidth >= 900) {
      return 12;
    }
    if (window.innerWidth >= 768) {
      return 8;
    }
    if (window.innerWidth >= 300) {
      return 5;
    }
  }

  const [ moviesToRender, setMoviesToRender ] = React.useState(getMoviesNumber());

  /*movies, функция получения числа карточек при клике на ещё */
  const getMoviesToShowNumber = () => {
    if (window.innerWidth >= 900) {
      return 3;
    } else {
      return 2;
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
     window.addEventListener('resize', () => getMoviesNumber);
    }, 300);
  }, []);

  const handleShowMoreMovies = () => {
    setMoviesToRender(moviesToRender + getMoviesToShowNumber());
  };

  const moviesToDisplay = !isSavedMovie ? foundMovies.slice(0, moviesToRender) : foundMovies;

  return (
    <section className="movies page__section">
      {!isNotFound ? ( `Ничего не найдено`) :

        (<ul className="movies__list">

        {moviesToDisplay.map((movie) => {
          const movieKey = movie.movieId;
            return(
              <MoviesCard
                key={movieKey}
                movie={movie}
                isSavedMovie={isSavedMovie}
                foundMovies={foundMovies}
                onSavedMovie={onSavedMovie}
                onDeleteMovie={onDeleteMovie}
              />
            );
        })}

      </ul>)
    }

      <button
        type="submit"
        className={ !isSavedMovie && moviesToRender < foundMovies.length ? `movies__btn` : `movies__btn_invsible`}
        onClick={() => handleShowMoreMovies()}
      >Ещё</button>

    </section>
  )
}

export default MoviesCardList;
