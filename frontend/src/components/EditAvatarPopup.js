import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const [avatar, setAvatar] = React.useState({value: ""});

    function handleAvatarChange(e) {
        setAvatar(({value: e.target.value}));
    }

    React.useEffect(() => {
        setAvatar({value: ""});
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({avatar: avatar.value});
    }

    return (
        <PopupWithForm 
            name="edit-avatar"
            title="Обновить аватар"
            buttonText="Сохранить" 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
            loadingText="Загружается..."
        >
            <input type="url" 
                   className="form__field" 
                   placeholder="Ссылка на картинку" 
                   name="avatar-link" 
                   value={avatar.value}
                   onChange={handleAvatarChange}
                   required />
            <span className="form__error-message avatar-link-error"></span>
        </PopupWithForm>
  );
}

export default EditAvatarPopup;