import React from 'react';

import './SearchForm.css';

function SearchForm () {
  return (
    <form className="form-filmSearch page__section" noValidate>
      <input
        className="input-filmSearch"
        type="text"
        placeholder="Фильм"
      />
      <button type="submit" className="btn-filmSearch">Найти</button>
    </form>
  )
}

export default SearchForm;
