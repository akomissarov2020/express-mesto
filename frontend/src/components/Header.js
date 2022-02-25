import React from 'react';
import {Routes, Route, Link } from 'react-router-dom';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import headerLogoPath from '../images/logo.svg';

function Header(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header page__header">
        <Link to="/" className="header__logo" target="_self">
          <img src={headerLogoPath} alt="Логотип проекта Место" />
        </Link>
        <Routes>
          <Route path="/" element={
            <div className="header__info">
              <p className="header__status">{currentUser.email}</p>
              <Link to="/" onClick={props.onLogout} className="header__link" target="_self">
              Выйти
              </Link>)
            </div>
          } />
          <Route path="/signin" element={
            <Link to="/signup" className="header__status" target="_self">
            Регистрация
          </Link>
          } />
          <Route path="/signup" element={
            <Link to="/signin" className="header__status" target="_self">
            Войти
          </Link>
          } />  
        </Routes>
    </header>
  );
}

export default Header;
