import { useDispatch } from 'react-redux';
import { deleteContacts } from '../../redux/contacts/operations';
import s from './Contact.module.css';
import { FaUser, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";
import useToggle from '../../hooks/visibilityToggle';
import { useEffect } from 'react';
import UpdateContactForm from '../UpdateContactForm/UpdateContactForm';

const Contact = ({ id, name, number, email, type }) => {
  
  const dispatch = useDispatch();
  const [isOpen, toggle] = useToggle(false);   

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isOpen) {
      toggle();
    } 
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);  

  const handleClose = () => {
    toggle();    
  };

  return (
    <div className={s.container}>    
      <div className={s.contact}>
        <div className={s.containerPart}>
          <div className={s.containerItem}>
            <FaUser className={s.icon} />
            <p className={s.name}>{name}</p>
          </div>
          <div className={s.containerItem}>
            <FaPhone className={s.icon}/>
          <p className={s.number}>{number}</p>
          </div>
        </div>
        <div className={s.containerPart}>
          <div className={s.containerItem}>
            <MdPermContactCalendar className={s.icon}/>
          <p className={s.number}>{type}</p>
          </div>
          <div className={s.containerItem}>
            <MdEmail className={s.icon}/>
          <p className={s.number}>{email}</p>
          </div>
        </div>
      </div>
      <div className={s.btnCont}>
        <button className={`${s.btn} ${s.btnUpdate}`} onClick={() => toggle()}>Update</button>
        <button className={`${s.btn} ${s.btnDelete}`} onClick={() => dispatch(deleteContacts(id))}>Delete</button>
      </div>
      {isOpen && (
        <UpdateContactForm contactId={id} onClose={handleClose} />
      )}
    </div>
  )
}
export default Contact
