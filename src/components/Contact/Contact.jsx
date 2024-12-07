import { FaUser, FaPhone, FaHeart } from "react-icons/fa6";
import { MdEmail, MdPermContactCalendar, MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { useEffect } from 'react';
import s from './Contact.module.css';
import useToggle from '../../hooks/visibilityToggle';
import UpdateContactForm from '../UpdateContactForm/UpdateContactForm';
import ConfirmDeletion from '../ConfirmDeletion/ConfirmDeletion';
import { useDispatch } from "react-redux";
import { editFavourite } from "../../redux/contacts/operations";

const Contact = ({ id, name, number, email, type, photo, isFavourite }) => {
  
  const [isOpenUpdate, toggleUpdate] = useToggle(false);   
  const [isOpenDelete, toggleDelete] = useToggle(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isOpenUpdate) {
      toggleUpdate();
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
  dispatch(editFavourite({ id, body: { isFavourite: !isFavourite } }));  
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
            <p className={s.number}>{email}</p>
          </div>
        </li>
      </ul>   
      
      <button
        className={`${s.favBtn} ${isFavourite ? s.favActive : ''}`}
        onClick={handleFavourite}
      >
        <FaHeart className={s.iconFav} />
      </button>
      
      <button className={`${s.btn} ${s.btnUpdate}`} onClick={() => toggleUpdate()}>
        <RxUpdate className={s.iconUpDel} />
      </button>
      
      <button className={`${s.btn} ${s.btnDelete}`} onClick={() => toggleDelete()}>
        <MdDelete className={s.iconUpDel} />
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
