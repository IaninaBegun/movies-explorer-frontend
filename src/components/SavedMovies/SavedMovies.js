import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

/*import * as MainApi from '../../utils/MainApi';*/


function SavedMovies ({
    isSaved,
    onSavedMovie,
    onDeleteMovie,
    foundMovies,
    /*isLoggedIn*/
  }) {



  /* стейт для хранения всех сохранённых фильмов пользователя */

  /*const [ savedMovies, setSavedMovies ] = React.useState([]);*/


  /* эффект для загрузки и сохранения сохранённых фильмов
  пользователя при входе на сайт */

  /*React.useEffect(() => {
    if (!isLoggedIn) return;
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      MainApi.getSavedMovies()
      .then((res) => {
        if (res) {
          setSavedMovies(res);
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log( `Ошибка 400: Токен не передан или передан не в том формате.` );
        }
        if (err === 401) {
          console.log( 'Ошибка 401: Переданный токен некорректен.' );
        } else {
          console.log('Что-то пошло не так');
        }
      })
    }
    localStorage.setItem('moviesSaved', JSON.stringify(savedMovies) );
  }, [isLoggedIn]);*/

  const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
  console.log(localSavedMovies);

  const [ savedFoundMovies, setSavedFoundMovies ] = React.useState(localSavedMovies);

  function searchSavedMovies (movieToFind) {
    /*const foundMoviesArray = savedMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(movieToFind);
    });*/
    const foundMoviesArray = foundMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(movieToFind);
    });
    setSavedFoundMovies(foundMoviesArray);
  }

  /* функция фильтра фильмов на странице /saved-movies*/

  function filterSavedMovies() {
    /*const moviesFilteredArray = savedMovies.filter(movie => {
      return movie.duration <= 40;
    });*/
    const moviesFilteredArray = foundMovies.filter(movie => {
      return movie.duration <= 40;
    });
    setSavedFoundMovies(moviesFilteredArray);
  }

  /* стейт-переменная для смены состояния чекбокса */
  const [ isFilterChecked, setFilterChecked ] = React.useState(false);

  function handleFilterState() {
    setFilterChecked(!isFilterChecked);
    if (isFilterChecked) {
      return savedFoundMovies;
    }
    if(!isFilterChecked) {
      filterSavedMovies();
    }
  }

  return(
    <section className="main">
      <SearchForm
        onSearch={searchSavedMovies}
      />
      <FilterCheckbox
        onFilter={handleFilterState}
        isFilterChecked={isFilterChecked}
      />
      <MoviesCardList
        foundMovies={savedFoundMovies}
        isSavedMovie={isSaved}
        onSavedMovie={onSavedMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </section>
  )
}

export default SavedMovies;
