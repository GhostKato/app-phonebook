import { useDispatch } from 'react-redux';
import { deleteContacts, updateContact } from '../../redux/contacts/operations';
import s from './Contact.module.css';
import { FaUser, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";

const Contact = ({ id, name, number, email, type }) => {
  
  const dispatch = useDispatch();  

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
        <button className={s.btn} onClick={() => dispatch(updateContact(id))}>Edit</button>
        <button className={s.btn} onClick={() => dispatch(deleteContacts(id))}>Delete</button>
      </div>
    </div>
  )
}
export default Contact
