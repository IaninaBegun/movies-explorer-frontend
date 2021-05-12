import React from 'react';

import './SearchForm.css';

function SearchForm () {
  return (
    <>
      <form className="form-filmSearch page__section" noValidate>
        <input
          className="input-filmSearch"
          type="text"
          placeholder="Фильм"
          required
        />
        <button type="submit" className="btn-filmSearch">Найти</button>
      </form>
      <span className="form-filmSearch__error-message page__section">Что-то пошло не так...</span>
    </>
  )
}

export default SearchForm;
