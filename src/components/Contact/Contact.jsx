import { FaUser, FaPhone, FaHeart } from "react-icons/fa6";
import { MdEmail, MdPermContactCalendar } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updateFavourite } from "../../redux/contacts/operations";
import useResponsiveEmail from '../../hooks/useResponsiveEmail';
import sendAction from "../../utils/sendAction";
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import UpdateContactForm from '../UpdateContactForm/UpdateContactForm';
import { selectSendMessage, selectUpdateContact } from "../../redux/modal/selectors";
import { closeModal, openModal } from "../../redux/modal/slice";
import { useEffect } from "react";
import s from './Contact.module.css'

const Contact = ({ id, name, number, email, type, photo, isFavourite }) => {
  const dispatch = useDispatch();
  
  const isOpenUpdateContact = useSelector((state) => selectUpdateContact(state, id));
  const isOpenSendMessage = useSelector((state) => selectSendMessage(state, id));

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      if (isOpenUpdateContact) dispatch(closeModal({ contactId: id, modalType: 'updateContact' }));
      if (isOpenSendMessage) dispatch(closeModal({ contactId: id, modalType: 'sendMessage' }));
    }
  }; 

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenUpdateContact, isOpenSendMessage]);

  const handleFavourite = () => {
    dispatch(updateFavourite({ id, body: { isFavourite: !isFavourite } }));
  };

  const responsiveEmail = useResponsiveEmail(email);

  const handleUpdateToggle = () => {
    if (isOpenUpdateContact) {
      dispatch(closeModal({ contactId: id, modalType: 'updateContact' }));
    } else {
      dispatch(openModal({ contactId: id, modalType: 'updateContact' }));
      dispatch(closeModal({ contactId: null, modalType: 'addContact' }));
      dispatch(closeModal({ contactId: null, modalType: 'menuUser' }));
    }
  };

  const handleMessageToggle = () => {
    if (isOpenSendMessage) {
      dispatch(closeModal({ contactId: id, modalType: 'sendMessage' }));
    } else {
      dispatch(openModal({ contactId: id, modalType: 'sendMessage' }));
      dispatch(closeModal({ contactId: null, modalType: 'addContact' }));
      dispatch(closeModal({ contactId: null, modalType: 'menuUser' }));
    }
  };

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

      <button className={s.btnFav} onClick={handleFavourite}>
        <FaHeart className={`${s.iconFav} ${isFavourite ? s.iconFavActive : ''}`} />
      </button>

      <button className={s.btnEdit} onClick={handleUpdateToggle}>
        <RxUpdate className={s.iconEdit} />
      </button>

      <button className={`${s.btnTelEmail} ${s.btnTel}`} onClick={() => sendAction("call", number)}>
        <FaPhone className={`${s.iconTelEmail} ${s.iconTel}`} />
      </button>

      <button className={`${s.btnTelEmail} ${s.btnEmail}`} onClick={handleMessageToggle}>
        <MdEmail className={`${s.iconTelEmail} ${s.iconEmail}`} />
      </button>

      {isOpenUpdateContact && (
        <UpdateContactForm contactId={id} onClose={handleUpdateToggle} />
      )}

      {isOpenSendMessage && (
        <SendMessageForm contactName={name} contactEmail={email} onClose={handleMessageToggle} />
      )}
    </div>
  );
};

export default Contact;
