import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {

  const [ isSaved, setIsSaved ] = React.useState(false);
  const [ isInfoTooltipPopupOpen, setInfoTooltipPopupOpen ] = React.useState(false);

  function checkIfSaved () {
    if (setIsSaved(true)) {
      return !isSaved;
    } else {
      return isSaved;
    }
  }

  function openErrorMessagePopup () {
    setInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {

    setInfoTooltipPopupOpen(false);

  }


  return (
    <div className="page">

      <Header/>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>

        <Route path="/movies">
          <SearchForm/>
          <FilterCheckbox/>
          <MoviesCardList/>
        </Route>

        <Route path="/saved-movies">
          <SearchForm/>
          <FilterCheckbox/>
          <MoviesCardList
            isSavedMovies={checkIfSaved}/>
        </Route>

        <Route path="/profile">
          <Profile/>
        </Route>

        <Route path="/signup">
          <Register/>
        </Route>

        <Route path="/signin">
          <Login/>
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
  );
}

export default App;
