import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound () {
  return (
    <section className="not-found">
      <span className="not-found__errorCode">404</span>
      <h3 className="not-found__title">
        Страница не найдена
      </h3>
      <Link className="not-found__link" to="/">Назад</Link>
    </section>
  )
}

export default PageNotFound;
