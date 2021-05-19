import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../MainPage/Main/Main';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import PopupErrors from '../PopupErrors/PopupErrors';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import * as MoviesApi from '../../utils/MoviesApi';
import * as MainApi from '../../utils/MainApi';

function App() {

  const history = useHistory();

  const [ isLoggedIn, setIsLoggedIn ] = React.useState(null);
  const [ currentUser, setCurrentUser ] = React.useState([]);
  const [ movies, setMovies ] = React.useState([]);
  const [ isSaved, setIsSaved ] = React.useState(false);
  const [ isInfoTooltipPopupOpen, setInfoTooltipPopupOpen ] = React.useState(false);
  const [ userData, setUserData ] = React.useState({
    email: '',
    name: ''
  });
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ moviesFound, setMoviesFound ] = React.useState([]);

  const [ errMessage, setErrMessage ] = React.useState('');

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const savedMovies = localStorage.getItem('moviesFound');
    console.log(savedMovies);
    if (jwt) {
      setIsLoggedIn(true);
      setMoviesFound(JSON.parse(savedMovies));
    }
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
      if (jwt){
      MainApi.getContent(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUserData({
            email: res.email,
            name: res.name
          })

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

  React.useEffect(() =>{
    if (!isLoggedIn) return;
    const jwt = localStorage.getItem('jwt');
    MainApi.getContent(jwt)
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    MoviesApi.getMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [isLoggedIn]);


  const handleLogin = (password, email) => {
    MainApi.authorize(password, email)
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        tokenCheck();
        setIsLoggedIn(true);
        history.push('/movies');
      }
    })
    .catch((err) => {
      if (err === 400) {
        setErrMessage( `Ошибка 400: Введены неверные данные пользователя, оба поля должны быть заполнены корректно.` );
      }
      if (err === 401) {
        setErrMessage( 'Ошибка 401: Пользователь с таким email не найден.' );
      } else {
        setErrMessage('Что-то пошло не так.');
      }
    });
  }

  const handleRegister = (password, email, name) => {
    MainApi.register(password, email, name)
      .then((res) => {
        if (res.status !== 400) {
          history.push('/signin');
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
      });
  }

  function handleUpdateUser({name, email}) {

    setIsLoading(true);

    MainApi.updateUserInfo(name, email).then((res) => {

      setCurrentUser(res);
      closeAllPopups();

    })
    .catch((err) => {
      setErrMessage(err);
    })
    .finally(() => setIsLoading(false))
  }



  React.useEffect(() => {

    if(isLoggedIn) {
      history.push('/movies');
    }
  }, [isLoggedIn, history]);

  function checkIfSaved () {
    if (setIsSaved(true)) {
      return !isSaved;
    } else {
      return isSaved;
    }
  }

  function searchedMovies (dataMovie) {
    const moviesFoundArray = movies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(dataMovie);
    });
    setMoviesFound(moviesFoundArray);
    localStorage.setItem('moviesFound', JSON.stringify(moviesFoundArray) );

  }

  function openErrorMessagePopup () {
    setInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {

    setInfoTooltipPopupOpen(false);

  }

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/signup');
    setUserData({
      email: ''
    })
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

          <Route exact path="/" component={Main}>
            <SearchForm
              onSearch={searchedMovies}
            />
            <FilterCheckbox/>
            <MoviesCardList
              foundMovies={moviesFound}
            />
          </Route>

          <Route path="/saved-movies">
            <SearchForm/>
            <FilterCheckbox/>
            <MoviesCardList
              isSavedMovies={checkIfSaved}/>
          </Route>

          <Route path="/profile">
            <Profile
              onUpdateUser={handleUpdateUser}
              onSignOut={onSignOut}/>
          </Route>

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
            { isLoggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" /> }
          </Route>

          <Route path="*">
            <PageNotFound/>
          </Route>

        </Switch>

        <Footer/>

        <PopupErrors
          isOpen={isInfoTooltipPopupOpen}
          openPopup={openErrorMessagePopup}
          onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
