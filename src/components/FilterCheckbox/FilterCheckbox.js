import React from 'react';

import './FilterCheckbox.css';

function FilterCheckbox ({onFilter, isFilterChecked}) {

  return(
    <form className="filter-form page__section" noValidate>
      <div className="filter-form__checkbox">
        <input
        type="checkbox"
        className="filter-form__input"
        id="checkbox-filter"
        onChange={() => onFilter()}
        checked={!isFilterChecked}/>
        <label htmlFor="checkbox-filter" className="filter-form__label"/>
      </div>
      <h2 className="filter-form__title">Короткометражки</h2>
    </form>
  )
}

export default FilterCheckbox;
