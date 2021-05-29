import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies ({
    foundMovies,
    isSaved,
    onSavedMovie,
    onDeleteMovie,
  }) {

  const [ savedMovies, setSavedMovies ] = React.useState(foundMovies);

  function searchSavedMovies (movieToFind) {
    const foundMoviesArray = foundMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(movieToFind);
    });
    setSavedMovies(foundMoviesArray);
  }

  /* функция фильтра фильмов на странице /saved-movies*/

  function filterSavedMovies() {
    const moviesFilteredArray = savedMovies.filter(movie => {
      return movie.duration <= 40;
    });
    setSavedMovies(moviesFilteredArray);
  }

  /* стейт-переменная для смены состояния чекбокса */
  const [ isFilterChecked, setFilterChecked ] = React.useState(false);

  function handleFilterState() {
    setFilterChecked(!isFilterChecked);
    if (!isFilterChecked) return;
    if(isFilterChecked) {
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
        foundMovies={savedMovies}
        isSavedMovie={isSaved}
        onSavedMovie={onSavedMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </section>
  )
}

export default SavedMovies;
