import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute';

import './App.css';
import Header from '../Header/Header';
import Main from '../MainPage/Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import PopupErrors from '../PopupErrors/PopupErrors';
import SavedMovies from '../SavedMovies/SavedMovies';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import * as MoviesApi from '../../utils/MoviesApi';
import * as MainApi from '../../utils/MainApi';


function App() {

  const history = useHistory();

  const [ isLoggedIn, setIsLoggedIn ] = React.useState(null);
  const [ currentUser, setCurrentUser ] = React.useState([]);
  const [ isInfoTooltipPopupOpen, setInfoTooltipPopupOpen ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ moviesFound, setMoviesFound ] = React.useState([]);
  const [ errMessage, setErrMessage ] = React.useState('');
  const [ savedMovies, setSavedMovies ] = React.useState([]);
  const [ isFindingErr, setFindingErr ] = React.useState(false);
  const [ isCurrentlySaved, setIsCurentlySaved ] = React.useState(false);

  /* эффект для загрузки найденных фильмов (если они есть)
  пользователя при повторном входе на сайт */

  React.useEffect(() => {
    if (!isLoggedIn) return;
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;
    const savedFoundMovies = localStorage.getItem('moviesFound');
    const moviesSavedByUser = localStorage.getItem('moviesSaved');
    if (jwt) {
      const newMoviesFound = JSON.parse(savedFoundMovies) || [];
      const newSavedMovies = JSON.parse(moviesSavedByUser) || [];
      setMoviesFound(newMoviesFound);
      setSavedMovies(newSavedMovies);
    }
  }, [isLoggedIn]);

  /* функция для проверки токена пользователя */

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
      if (jwt){
      MainApi.getContent(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
          history.push('/movies');
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
      });
    }
  }

  /* эффект для проверки токена пользователя */
  React.useEffect(() => {
    tokenCheck()
  }, []);


  /* фукция для преобразования данных с сервера для очистки невалидных данных
  и сохранения их в массив*/

  const adjustData = (movies) => {
    const newMovies = movies.map((movie) => {
      return {
        movieId: `${movie.id}`,
        country: `${movie.country ? `${movie.country}` : `Данные о стране отсутствуют.`}`,
        director: `${movie.director ? `${movie.director}` : `Данные о режиссёре отсутствуют.`}`,
        duration: `${movie.duration ? `${movie.duration}` : `0`}`,
        year: `${movie.year ? `${movie.year}` : `0`}`,
        description: `${movie.description ? `${movie.description}` : `Описание отсутствует.`}`,
        image: `${movie.image && movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : `https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg`}`,
        trailer: `${movie.trailerLink ?  `${movie.trailerLink}` : `https://youtube.com`}`,
        thumbnail: `${movie.image && movie.image.formats && movie.image.formats.thumbnail && movie.image.formats.thumbnail.url ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}` : `https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg`}`,
        nameRU: `${movie.nameRU}` || `Название отсутствует.`,
        nameEN: `${movie.nameEN}` || `Название отсутствует.`
      }
    });
    /*setAdjustedMovies(newMovies);*/
    localStorage.setItem('moviesTotal', JSON.stringify(newMovies) );
  }

  /* функция для логина */

  const handleLogin = (password, email) => {
    MainApi.authorize(password, email)
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
        history.push('/movies');
      }
    })
    .catch((err) => {
      setInfoTooltipPopupOpen(true);
      if (err === 400) {
        setErrMessage( `Ошибка 400: Введены неверные данные пользователя, оба поля должны быть заполнены корректно.` );
      }
      if (err === 401) {
        setErrMessage( 'Ошибка 401: Пользователь с таким email не найден.' );
      } else {
        setErrMessage('Что-то пошло не так.');
      }
    })
  }


  /* функция для регистрации */

  const handleRegister = (password, email, name) => {
    MainApi.register(password, email, name)
      .then((res) => {
        if (res.status !== 400) {
          handleLogin(password, email);
          history.push('/movies');
          setErrMessage(`Регистрация прошла успешно!`);
          setInfoTooltipPopupOpen(true);
        }
      })
      .catch((err) => {
        setInfoTooltipPopupOpen(true);
        if (err === 400) {
          setErrMessage( `Ошибка 400: Введены неверные данные пользователя, оба поля должны быть заполнены корректно.` );
        }
        if (err === 409) {
          setErrMessage( `Ошибка 409: Пользователь с такими данными уже зарегистрирован.` )
        }
        else {
          setErrMessage('Что-то пошло не так...')
        }
      })
  }


  /* функция для обновления данных пользователя */

  function handleUpdateUser({name, email}) {

    MainApi.updateUserInfo(name, email).then((res) => {

      setCurrentUser(res);
      setErrMessage('Обновление прошло успешно!');
      setInfoTooltipPopupOpen(true);

    })
    .catch((err) => {
      setInfoTooltipPopupOpen(true);
      setErrMessage(err);
    })
  }


  /* функция добавления/удаления фильмов из сохранённых на странице /movies */

  function handleSaveMovie(movie) {
    const isSavedMovie = savedMovies.some(i => i.movieId === movie.movieId);

    if (!isSavedMovie) {

      MainApi.addNewMovie(movie)
        .then((newMovie) => {

          setSavedMovies([newMovie, ...savedMovies]);
          setIsCurentlySaved(true);
          localStorage.setItem('moviesSaved', JSON.stringify([newMovie, ...savedMovies]) );
      })
      .catch((err) => {
        setErrMessage(err);
        setInfoTooltipPopupOpen(true);
      })
    }
  }

  /* функция удаления фильмов */
  function handleDeleteMovie(movie) {
    const savedMovieToDelete = savedMovies.find(i => i.movieId === movie.movieId);

    MainApi.deleteCard(savedMovieToDelete._id)
      .then(() => {

        const newMovies = savedMovies.filter((movieSaved) => {
          return movieSaved.movieId !== savedMovieToDelete.movieId;
        });
        setSavedMovies(newMovies);
        setIsCurentlySaved(false);
        localStorage.setItem('moviesSaved', JSON.stringify(newMovies) );
    })
    .catch((err) => {
      setErrMessage(err);
      setInfoTooltipPopupOpen(true);
    })
  }

  /* функция для клика по кнопке сохранить/удалить */

  function handleCLickMovieButton(movie) {
    const isSavedMovie = savedMovies.some(i => i.movieId === movie.movieId);
    if (!movie._id && !isSavedMovie) {
      handleSaveMovie(movie);
    } else {
      handleDeleteMovie(movie);
    }
  }

  /* эффект для загрузки и сохранения данных
  пользователя при входе на сайт */

  React.useEffect(() =>{
    if (!isLoggedIn) return;
    const jwt = localStorage.getItem('jwt');
    tokenCheck();
    MainApi.getContent(jwt)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  /* эффект для редиректа, если пользователь уже залогинен */

  React.useEffect(() => {
    if(!isLoggedIn) return;
    if(isLoggedIn) {
      history.push('/movies');
    }

  }, [isLoggedIn, history]);

  /* функция для получения фильмов с сервера BeatFilm */

  function getInitialMovies (dataMovie) {

    setIsLoading(true);
    MoviesApi.getMovies()
      .then((data) => {
        adjustData(data);
        searchMovies(dataMovie);
      })
      .catch((err) => {
        setFindingErr(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setFindingErr(false);
      })

  }

  /* эффект для загрузки и сохранения сохранённых фильмов
  пользователя при входе на сайт */

  React.useEffect(() => {
    if (!isLoggedIn) return;
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      MainApi.getSavedMovies()
      .then((res) => {
        if (res) {
          setSavedMovies(res);
          localStorage.setItem('moviesSaved', JSON.stringify(res) );
        }
      })
      .catch((err) => {
        setInfoTooltipPopupOpen(true);
        if (err === 400) {
          setErrMessage( `Ошибка 400: Токен не передан или передан не в том формате.` );
        }
        if (err === 401) {
          setErrMessage( 'Ошибка 401: Переданный токен некорректен.' );
        } else {
          setErrMessage('Что-то пошло не так');
        }
      })
    }

  }, [isLoggedIn]);

  function searchMovies (dataMovie) {

    const localMovies = JSON.parse(localStorage.getItem('moviesTotal'));

    const moviesFoundArray = localMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(dataMovie);
    });

    setMoviesFound(moviesFoundArray);
    localStorage.setItem('moviesFound', JSON.stringify(moviesFoundArray) );

  }

  /* функция фильтра фильмов на странице /movies*/

  function filterMovies () {

    const filteredMovies =  moviesFound.filter((i) => i.duration <= 40);
    setMoviesFound(filteredMovies);

  }

  function searchSavedMovies (movieToFind) {
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
    const foundMoviesArray = localSavedMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(movieToFind);
    });
    setSavedMovies(foundMoviesArray);
  }

  /* функция фильтра фильмов на странице /saved-movies*/

  function filterSavedMovies() {
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
    const moviesFilteredArray = localSavedMovies.filter(movie => {
      return movie.duration <= 40;
    });
    setSavedMovies(moviesFilteredArray);
  }

  /* функция для открытия информационного попапа */

  function openErrorMessagePopup () {
    setInfoTooltipPopupOpen(true);
  }

  /* функция для закрытия всех попапов */

  function closeAllPopups() {

    setInfoTooltipPopupOpen(false);
    setErrMessage('');

  }

  /* функция для выхода с сайта и удаления данных из локльного хранилища */

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('moviesFound');
    localStorage.removeItem('moviesSaved');
    localStorage.removeItem('moviesTotal');
    setIsLoggedIn(false);
    history.push('/signup');
  }

  function checkIfSaved (movie) {
    const isAddedMovie = savedMovies ? savedMovies.find((i) => i.movieId === movie.movieId) : ``;
    if (isAddedMovie) {
      setIsCurentlySaved(true);
    } else {
      setIsCurentlySaved(false);
    }
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header
          isLoggedIn={isLoggedIn}/>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>

          <ProtectedRoute exact path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            onSearch={searchMovies}
            initialMovies={getInitialMovies}
            foundMovies={moviesFound}
            isSaved={false}
            onSavedMovie={handleCLickMovieButton}
            isLoading={isLoading}
            onFilter={filterMovies}
            onErr={isFindingErr}
            isCurrentlySaved={isCurrentlySaved}
            checkIfSaved={checkIfSaved}
            savedMovies={savedMovies}
          />

          <ProtectedRoute exact path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            foundMovies={savedMovies}
            isSaved={true}
            isLoading={isLoading}
            onDeleteMovie={handleDeleteMovie}
            onSearch={searchSavedMovies}
            onFilter={filterSavedMovies}
          />

          <ProtectedRoute exact path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            onUpdateUser={handleUpdateUser}
            onSignOut={onSignOut}
          />

          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              onError={errMessage}/>
          </Route>

          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              onError={errMessage}/>
          </Route>

          <Route>
            { isLoggedIn ? <Redirect to="/movies"/> : <Redirect to="/signin" /> }
          </Route>

          <Route path="*">
            <PageNotFound/>
          </Route>

        </Switch>

        <Footer/>

        <PopupErrors
          isOpen={isInfoTooltipPopupOpen}
          openPopup={openErrorMessagePopup}
          onClose={closeAllPopups}
          onError={errMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
