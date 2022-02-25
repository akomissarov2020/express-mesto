import tooltip_ok from '../images/tooltip_ok.png';
import tooltip_failed from '../images/tooltip_failed.png';

function InfoTooltip(props) {

    const ok_message = "Вы успешно зарегистрировались!";
    const failed_message = "Что-то пошло не так! Попробуйте ещё раз.";

    const classesForPopup = `popup popup_type_tooltip ${props.isOpen ? "popup_opened" : "popup_hidden" }`;
    
    return (
      <div className={classesForPopup}>
        <div className="popup__container">
          <button type="button" className="popup__close-button" onClick={props.onClose}></button>
          <img className="popup__tooltip-image" alt="Результат запроса" src={props.status ? tooltip_ok : tooltip_failed} />
          <p className="popup__tooltip-text">{props.status ? ok_message : failed_message}</p>
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;
  