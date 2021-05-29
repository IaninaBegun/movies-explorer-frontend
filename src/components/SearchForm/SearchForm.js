import React from 'react';

import './SearchForm.css';

function SearchForm({onSearch}) {
  /*console.log(onSearch);*/

  const [ movieSearch, setMovieSearch ] = React.useState('');
  const [ movieErrMessage, setMovieErrMessage ] = React.useState('');

  /*console.log(movieSearch);*/

  const [ formValid, setFormValid ] = React.useState(false);

  const handleMovieSearch = (e) => {
    setMovieSearch(e.target.value);
    if (e.target.value.length < 1 ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValid) {
      setMovieErrMessage('Нужно ввести ключевое слово');
    }

    setMovieErrMessage('');
    onSearch(movieSearch);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form-filmSearch page__section" noValidate>
        <input
          className="input-filmSearch"
          type="text"
          placeholder="Фильм"
          required
          value={movieSearch}
          onChange={e => {handleMovieSearch(e)}}
        />
        <button type="submit" className="btn-filmSearch">Найти</button>
      </form>
      <span className="form-filmSearch__error-message page__section">{movieErrMessage}</span>
    </>
  )
}

export default SearchForm;
