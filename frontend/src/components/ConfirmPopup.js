import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(props.cardToDelete);
    }

    return (
        <PopupWithForm 
            name="with-confirm" 
            title="Вы уверены?" 
            buttonText="Да" 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
            loadingText="Удаляется..."
        />
  );
}

export default ConfirmPopup;