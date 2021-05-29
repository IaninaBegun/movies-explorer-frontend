import React from 'react';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function Movies ({
  onSearch,
  foundMovies,
  isSaved,
  onSavedMovie,
  isLoading,
  onFilter,
  onErr
  }) {


  /* стейт-переменная для смены состояния чекбокса */
  const [ isFilterChecked, setFilterChecked ] = React.useState(false);

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


  function handleFilterState() {
    setFilterChecked(!isFilterChecked);
    if (!isFilterChecked) return;
    if(isFilterChecked) {
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
      { isLoading ?
        <Preloader
          isLoading={isLoading}
          onErr={onErr}/> :

        <MoviesCardList
          foundMovies={foundMovies}
          isSavedMovie={isSaved}
          onSavedMovie={onSavedMovie}
          onBtnClick={handleShowMoreMovies}
          moviesToShow={getMoviesToShowNumber}
          initialMovies={getMoviesNumber}
        />
      }

    </section>
  )
}

export default Movies;
