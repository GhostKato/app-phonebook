import { FaUser, FaPhone, FaHeart } from "react-icons/fa6";
import { MdEmail, MdPermContactCalendar, MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { useEffect } from 'react';
import s from './Contact.module.css';
import useToggle from '../../hooks/visibilityToggle';
import UpdateContactForm from '../UpdateContactForm/UpdateContactForm';
import ConfirmDeletion from '../ConfirmDeletion/ConfirmDeletion';
import { useDispatch } from "react-redux";
import { changeFavourite } from "../../redux/contacts/operations";
import useResponsiveEmail from '../../hooks/useResponsiveEmail';

const Contact = ({ id, name, number, email, type, photo, isFavourite }) => {
  
  const [isOpenUpdate, toggleUpdate] = useToggle(false);   
  const [isOpenDelete, toggleDelete] = useToggle(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      if (isOpenUpdate) toggleUpdate();
      if (isOpenDelete) toggleDelete();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenUpdate, isOpenDelete]); 

  const dispatch = useDispatch();
  
  const handleFavourite = () => {
  dispatch(changeFavourite({ id, body: { isFavourite: !isFavourite } }));  
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
        className={`${s.btnFav} ${isFavourite ? s.btnFavActive : ''}`}
        onClick={handleFavourite}
      >
        <FaHeart className={s.iconFav} />
      </button>
      
      <button className={`${s.btnUpDel} ${s.btnUpdate}`} onClick={() => toggleUpdate()}>
        <RxUpdate className={`${s.iconUpDel} ${s.iconUpdate}`} />
      </button>
      
      <button className={`${s.btnUpDel} ${s.btnDelete}`} onClick={() => toggleDelete()}>
        <MdDelete className={`${s.iconUpDel} ${s.iconDelete}`} />
      </button>
      
      {isOpenUpdate && (
        <UpdateContactForm contactId={id} onClose={toggleUpdate} />
      )}
      
      {isOpenDelete && (
        <ConfirmDeletion contactId={id} onClose={toggleDelete} />
      )}
    </div>
  );
};

export default Contact;
