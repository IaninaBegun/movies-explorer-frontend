import React from 'react';

import { Link, Switch, Route } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import NavigationMainPage from '../NavigationMainPage/NavigationMainPage';

import './Header.css';

function Header () {
  return (
    <header className="header page__section">
      <Switch>
          <Route exact path="/">
            <Link to="/" className="header__logo-link"/>
            <NavigationMainPage/>
          </Route>
          <Route path="/movies">
            <Link to="/" className="header__logo-link"/>
            <Navigation/>
          </Route>
          <Route path="/saved-movies">
            <Link to="/" className="header__logo-link"/>
            <Navigation/>
          </Route>
          <Route path="/profile">
            <Link to="/" className="header__logo-link"/>
            <Navigation/>
          </Route>
          <Route path="/signin">
            <Link to="/" className="header__logo-link page__section_small"/>
          </Route>
          <Route path="/signup">
            <Link to="/" className="header__logo-link page__section_small"/>
          </Route>
      </Switch>
    </header>
  )
}

export default Header;
