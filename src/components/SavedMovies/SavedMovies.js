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
    onFilter,
    onSearch
  }) {



  /* стейт-переменная для смены состояния чекбокса */
  const [ isFilterChecked, setFilterChecked ] = React.useState(false);

  function handleFilterState() {
    setFilterChecked(!isFilterChecked);
    if (isFilterChecked) {
      return foundMovies;
    }
    if(!isFilterChecked) {
      onFilter();
    }
  }

  return(
    <section className="main">
      <SearchForm
        onSearch={onSearch}
      />
      <FilterCheckbox
        onFilter={handleFilterState}
        isFilterChecked={isFilterChecked}
      />
      <MoviesCardList
        foundMovies={foundMovies}
        isSavedMovie={isSaved}
        onSavedMovie={onSavedMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </section>
  )
}

export default SavedMovies;
