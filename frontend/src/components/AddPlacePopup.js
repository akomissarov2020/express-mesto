import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [name, setName] = React.useState({value: ""});
    const [link, setLink] = React.useState({value: ""});

    function handleNameChange(e) {
        setName(({value: e.target.value}));
    }

    function handleLinkChange(e) {
        setLink(({value: e.target.value}));
    }

    React.useEffect(() => {
        setName({value: ""});
        setLink({value: ""});
    }, [props.isOpen]);
    
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateCards({name: name.value,
            link: link.value});
    } 

    return (
        <PopupWithForm 
            name="add-place" 
            title="Новое место" 
            buttonText="Создать" 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
            loadingText="Загружается..."
        >
            <input value={name.value} onChange={handleNameChange} type="text" className="form__field" placeholder="Название" name="add-place-name" required minLength="2" maxLength="30" />
            <span className="form__error-message add-place-name-error"></span>
            <input value={link.value} onChange={handleLinkChange} type="url" className="form__field" placeholder="Ссылка на картинку" name="add-place-link" required />
            <span className="form__error-message add-place-link-error"></span>
        </PopupWithForm>
  );
}

export default AddPlacePopup;