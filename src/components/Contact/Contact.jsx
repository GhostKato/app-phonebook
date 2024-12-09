import { FaUser, FaPhone, FaHeart } from "react-icons/fa6";
import { MdEmail, MdPermContactCalendar } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { useEffect } from 'react';
import s from './Contact.module.css';
import useVisibilityToggle from '../../hooks/useVisibilityToggle';
import UpdateContactForm from '../UpdateContactForm/UpdateContactForm';
import { useDispatch } from "react-redux";
import { updateFavourite } from "../../redux/contacts/operations";
import useResponsiveEmail from '../../hooks/useResponsiveEmail';
import sendAction from "../../utils/sendAction";
import SendMessageForm from "../SendMessageForm/SendMessageForm";

const Contact = ({ id, name, number, email, type, photo, isFavourite }) => {
  
  const [isOpenUpdate, toggleUpdate] = useVisibilityToggle(false); 
  const [isOpenSendMessage, toggleSendMessage] = useVisibilityToggle(false);
 

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      if (isOpenUpdate) toggleUpdate();
      if (isOpenSendMessage) toggleSendMessage(); 
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenUpdate]); 

  const dispatch = useDispatch();
  
  const handleFavourite = () => {
    dispatch(updateFavourite({ id, body: { isFavourite: !isFavourite } }));      
  };
  
  const responsiveEmail = useResponsiveEmail(email);

  return (
    <div className={s.container}>
      <img className={s.photo} src={photo} alt="Contact photo" />
      <ul className={s.contact}>        
        <li className={s.containerPart}>
          <div className={s.containerItem}>
            <FaUser className={s.icon} />
            <p className={s.name}>{name}</p>
          </div>
          <div className={s.containerItem}>
            <FaPhone className={s.icon} />
            <p className={s.number}>{number}</p>
          </div>
        </li>
        <li className={s.containerPart}>
          <div className={s.containerItem}>
            <MdPermContactCalendar className={s.icon} />
            <p className={s.number}>{type}</p>
          </div>
          <div className={s.containerItem}>
            <MdEmail className={s.icon} />
            <p className={s.number} title={email}>{responsiveEmail}</p>
          </div>
        </li>
      </ul>   
      
      <button
        className={s.btnFav}
        onClick={handleFavourite}
      >
        <FaHeart className={`${s.iconFav} ${isFavourite ? s.iconFavActive : ''}`} />
      </button>

      <button
        className={s.btnEdit}
        onClick={() => toggleUpdate()}
      >
        <RxUpdate className={s.iconEdit} />
      </button>

      
      <button className={`${s.btnTelEmail} ${s.btnTel}`} onClick={() => sendAction("call", number)}>
        <FaPhone className={`${s.iconTelEmail} ${s.iconTel}`} />
      </button>
      
      <button className={`${s.btnTelEmail} ${s.btnEmail}`} onClick={() => toggleSendMessage()}>
        <MdEmail className={`${s.iconTelEmail} ${s.iconEmail}`} />
      </button>
      
      {isOpenUpdate && (
        <UpdateContactForm contactId={id} onClose={toggleUpdate} />
      )} 
      
      {isOpenSendMessage && (
        <SendMessageForm contactEmail={email} onClose={toggleSendMessage} />
      )}      
      
    </div>
  );
};

export default Contact;
