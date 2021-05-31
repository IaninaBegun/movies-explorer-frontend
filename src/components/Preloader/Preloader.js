import React from 'react'
import './Preloader.css'

const Preloader = ({isLoading, onErr}) => {
    return (
      <div className={isLoading ? `preloader` : `preloader__hidden`}>
          {!onErr ? (
            <div className="preloader__container">
              <span className="preloader__round"></span>
            </div>
          ) : (
            `Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.`
          )}

      </div>
    )
};

export default Preloader
