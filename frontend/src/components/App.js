import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';
import auth from '../utils/auth';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import profileAvatarPath from '../images/avatar.png';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  const [intoToolTipStatus, setIntoToolTipStatus] = React.useState(false);
  const [cardIdToBeDeleted, setCardIdToBeDeleted] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({
                                                    avatar: profileAvatarPath,
                                                    email: '',
                                                    _id: ''});
  const [cards, setCards] = React.useState([]);
  const [isLoadingSomething, setIsLoadingSomething] = React.useState(false);

  React.useEffect(()=>{
    setIsLoadingSomething(true);

    auth.user()
      .then((res)=> {
        setCurrentUser(prevState => ({
          ...prevState,
          avatar: res.avatar,
          email: res.email,
          _id: res._id,
          name: res.name,
          about: res.about,
        }));
        setLoggedIn(true);
        redirectToRoot();
      })
      .catch((err) => {
        if (err.status === 400) {
            console.log(`Токен не передан или передан не в том формате`);
        } else if (err.status === 401) {
            console.log(`Переданный токен некорректен`);
        } else {
          console.log(`Error: ${err.status}`);
        }
        setLoggedIn(false);
      })

    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      setCurrentUser(prevState => ({
        ...prevState,
        avatar: userData.avatar,
        name: userData.name,
        about: userData.about,
        _id: userData._id
      }));
      setCards(initialCards);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false)
    });
  }, []);

  function redirectToRoot() {
    navigate("/");
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleConfirmation(card) {
    setCardIdToBeDeleted({_id: card._id});
    setIsConfirmPopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setCardIdToBeDeleted({});
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleUpdateUser(user) {
    setIsLoadingSomething(true);
    api.updateUserInfo(user)
    .then(
      (data) => {
        setCurrentUser(prevState => ({
          ...prevState,
          name: data.name,
          about: data.about
        }));
        closeAllPopups();
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false)
    });
  }

  function handleUpdateAvatar(user) {
    setIsLoadingSomething(true);
    api.updateAvatar(user)
    .then(
      (currentUserdata) => {
        setCurrentUser(prevState => ({
          ...prevState,
          avatar: currentUserdata.avatar
        }));
        closeAllPopups();
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false)
    });
  }

  function handleCardLike(card) {
    setIsLoadingSomething(true);
    const hasOwnLike = card.likes.some(like => like === currentUser._id);
    (hasOwnLike ? api.deleteLike(card._id) : api.putLike(card._id))
    .then(
      (newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false)
    });
  }

  function handleCardDelete(card) {
    setIsLoadingSomething(true);
    api.deletePhoto(card._id)
    .then(
      () => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false);
    });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoadingSomething(true);
    api.insertNewCard(card)
    .then(
      (newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingSomething(false)
    });
  }

  function handleRegisterClick(data) {

    setIsLoadingSomething(true);
    auth.register(data)
      .then((data) => {
        setIntoToolTipStatus(true);
        setIsTooltipPopupOpen(true);
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log(`некорректно заполнено одно из полей`);
        } else {
          console.log(`Error: ${err.status}`);
        }
        setIntoToolTipStatus(false);
        setIsTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsLoadingSomething(false)
      });
  }

  function closeIntoTooltip() {
    if (intoToolTipStatus) {
      setIsTooltipPopupOpen(false);
      navigate('/signin');
    } else {
      setIsTooltipPopupOpen(false);
    }
  }

  function handleLoginClick(data) {
    setIsLoadingSomething(true);
    auth.login(data)
      .then((data) => {
        setLoggedIn(true);
        redirectToRoot();
      })
      .catch((err) => {
        if (err.status === 400) {
            console.log(`не передано одно из полей`);
        } else if (err.status === 401) {
            console.log(`пользователь с email не найден`);
        } else {
          console.log(`Error: ${err.status}`);
        }
        setIntoToolTipStatus(false);
        setIsTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsLoadingSomething(false)
      });
  }

  function handleLogout() {
    auth.logout();
    setLoggedIn(false);
    navigate('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onLogout={handleLogout} />
      <Routes>
        <Route path="/signup" element={
          <Register onRegister={handleRegisterClick} />
          } />
        <Route exact path="/" element={
          <ProtectedRoute isLoggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmation}
            />
            <Footer />
          </ProtectedRoute>
        } />
        <Route path="/signin" element={<Login
              onLogin={handleLoginClick}
        />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoadingSomething}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoadingSomething}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onUpdateCards={handleAddPlaceSubmit}
        isLoading={isLoadingSomething}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        isLoading={isLoadingSomething}
        cardToDelete={cardIdToBeDeleted}
      />
      <InfoTooltip
        status={intoToolTipStatus}
        onClose={closeIntoTooltip}
        isOpen={isTooltipPopupOpen}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
