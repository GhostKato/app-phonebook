import { useDispatch, useSelector } from 'react-redux'
import s from './UserBar.module.css'
import { selectUser } from '../../redux/auth/selectors'
import { logOut } from '../../redux/auth/operations';
import useResponsiveName from '../../hooks/useResponsiveName';
import { MdExitToApp } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';
import { selectMenuUser, selectUpdateUser } from '../../redux/modal/selectors';
import UpdateUserForm from '../UpdateUserForm/UpdateUserForm';
import { closeModal, openModal } from '../../redux/modal/slice';
import { useEffect } from 'react';
import UserMenu from '../UserMenu/UserMenu';

const UserBar = () => { 
  
  const isOpenUpdateUser = useSelector(selectUpdateUser);
  const isOpenMenuUser = useSelector(selectMenuUser);

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const responsiveName = useResponsiveName(user.name);
  
  const isLargeScreen = useMediaQuery({ minWidth: 430 });

  const handleUpdateUserToggle = () => {
    if (isOpenUpdateUser) {
      dispatch(closeModal({ contactId: null, modalType: 'updateUser' }));
    } else {
      dispatch(openModal({ contactId: null, modalType: 'updateUser' }));
      dispatch(closeModal({ contactId: null, modalType: 'addContact' }));
       dispatch(closeModal({ contactId: null, modalType: 'menuUser' }));
    }
  };

  const handleMenuUserToggle = () => {
    if (isOpenMenuUser) {
      dispatch(closeModal({ contactId: null, modalType: 'menuUser' }));
    } else {
      dispatch(openModal({ contactId: null, modalType: 'menuUser' }));
      dispatch(closeModal({ contactId: null, modalType: 'addContact' }));     
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      dispatch(closeModal({ contactId: null, modalType: 'updateUser' })); 
      dispatch(closeModal({ contactId: null, modalType: 'menuUser' }));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenUpdateUser]);

  return (
    <div className={s.container}>      
      <p title={user.name}> {responsiveName}</p>      
          <img onClick={isLargeScreen ? handleUpdateUserToggle : handleMenuUserToggle} className={s.photo} src={user.photo} alt="User photo" />      
      {isLargeScreen &&
        <button onClick={() => dispatch(logOut())} className={s.btn} type='button'><MdExitToApp className={s.logoutIcon} /></button>
      }
      {isOpenUpdateUser && <UpdateUserForm onClose={handleUpdateUserToggle} />}
      {isOpenMenuUser && <UserMenu onClose={handleMenuUserToggle}/>}
    </div>
  )
}

export default UserBar



