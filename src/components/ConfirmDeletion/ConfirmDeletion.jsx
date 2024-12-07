import { useDispatch } from 'react-redux';
import s from './ConfirmDeletion.module.css';
import { IoClose } from "react-icons/io5";
import { deleteContacts } from '../../redux/contacts/operations';

const ConfirmDeletion = ({ contactId, onClose }) => {
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch(deleteContacts(contactId));
    onClose();
  };

  return (
    <div className={s.background}>
      <div className={s.modal}>
        <button type="button" onClick={onClose} className={s.btnClose}>
          <IoClose className={s.icon} />
        </button>
        <h1 className={s.title}>Are you sure you want to delete this contact?</h1>
        
        <div className={s.btnCont}>
          <button type="button" onClick={onClose} className={`${s.btn} ${s.btnNo}`}>
            No
          </button>
          <button type="button" onClick={handleDelete} className={`${s.btn} ${s.btnYes}`}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletion;
