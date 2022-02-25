import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
        <section className="profile page__container">
          <div className="profile__avatar-overlay">
            <img src={currentUser.avatar} alt="Аватарка пользователя" className="profile__avatar" />
            <button className="profile__edit-avatar-button" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">
              {currentUser.name}
            </h1>
            <button type="button" className="profile__edit-button"  onClick={props.onEditProfile}></button>
            <p className="profile__title">
              {currentUser.about}
            </p>
          </div>
          <button type="button" className="profile__add-button"  onClick={props.onAddPlace}></button>
        </section>
        <section>
          <ul className="elements page__elements">
            {props.cards.map((card) => (
              <Card key={card._id} 
                    card={card} 
                    onCardClick={props.onCardClick} 
                    onCardLike={props.onCardLike} 
                    onCardDelete={props.onCardDelete} 
              />
            ))};
          </ul>
        </section>
    </main>
  );   
}

export default Main;
