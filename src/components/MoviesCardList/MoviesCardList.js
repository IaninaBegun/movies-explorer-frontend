import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
/*import { initialMoviesCards } from '../../utils/constants';*/

function MoviesCardList ( {isSavedMovies, foundMovies} ) {
  console.log(foundMovies);




  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', getMoviesNumber);
    }, 300);
  }, []);

  /*let arrayForMovies = [];*/

  const getMoviesNumber = () => {
    if (window.innerWidth >= 900) {
        return 12;
    }
    if (window.innerWidth >= 768) {
        return 8;
    }
    if (window.innerWidth >= 480) {
        return 5;
    }
  }

  const [ btnShow, setBtnShow ] = React.useState(false);
  const [ moviesToShow, setMoviesToShow ] = React.useState([]);
  const [ nextMovies, setNextMovies ] = React.useState(getMoviesNumber());

  React.useEffect(() => {
    JSON.parse(localStorage.getItem('moviesFound'));
    toggleBtnVisibility(nextMovies);
  },[nextMovies]);

  /*const loopWithSlice = (start, end) => {
    const slicedPosts = foundMovies.slice(start, end);
    arrayForMovies = [...arrayForMovies, ...slicedPosts];
    console.log(arrayForMovies);
    setMoviesToShow(arrayForMovies);
  };*/



  /*const handleShowMorePosts = () => {
    loopWithSlice(nextMovies, nextMovies + getMoviesNumber());
    setNextMovies(nextMovies + getMoviesNumber());
  };
  React.useEffect(() => {
    loopWithSlice(0, getMoviesNumber());
  }, []);*/

  function loadMoreMovies() {
    setNextMovies((nextMovies) => {
      return nextMovies + getMoviesNumber();
    });
    setMoviesToShow((moviesToShow) => {
      /*let newArray = [];
      newArray = */
      return moviesToShow.slice(0, nextMovies)
    });
    console.log(moviesToShow);
  }

  function toggleBtnVisibility (films) {
    if (films > 5) {
      setBtnShow(true);
    } else {
      setBtnShow(false);
    }
  }


  /*console.log(moviesToShow);*/

  /*function addMovies(films) {
    if (films.length < 1) return;
    let i = 0;
    for (i = 0; i < films.length; i++) {
      return films;
    }
    console.log(films);
  }*/

  return (
    <section className="movies page__section">
      <ul className="movies__list">
        {foundMovies.slice(0, nextMovies).map((movie) => {
          const movieKey = movie.id;
            return(
              <MoviesCard
                key={movieKey}
                movie={movie}
                isSavedMovie={isSavedMovies}
                foundMovies={foundMovies}
              />
            );
        })}

        {/*{moviesToShow.map((movie) => {
          const movieKey = movie.id;
            return(
              <MoviesCard
                key={movieKey}
                movie={movie}
                isSavedMovie={isSavedMovies}
                foundMovies={foundMovies}
              />
            );
        })}*/}
      </ul>
      <button
        type="submit"
        className={ !isSavedMovies && btnShow ? `movies__btn` : `movies__btn_invsible`}
        /*onClick={handleShowMorePosts}*/
        onClick={loadMoreMovies}
      >Ещё</button>
    </section>
  )
}

export default MoviesCardList;
