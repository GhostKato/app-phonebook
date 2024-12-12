import { useDispatch, useSelector } from 'react-redux';
import s from './UserMenu.module.css'
import { logOut } from '../../redux/auth/operations';
import { closeModal, openModal } from '../../redux/modal/slice';
import { useEffect } from 'react';
import { selectMenuUser } from '../../redux/modal/selectors';

const UserMenu = () => {

    const isOpenMenuUser = useSelector(selectMenuUser);
    const dispatch = useDispatch();    

    const handleLogout = () => {
        dispatch(logOut());
        dispatch(closeModal({ contactId: null, modalType: 'menuUser' }));    
    };
    
    const handleUpdateUser = () => {
        dispatch(openModal({ contactId: null, modalType: 'updateUser' }));
        dispatch(closeModal({ contactId: null, modalType: 'menuUser' }));    
    };
    
    useEffect(() => {
    
    if (isOpenMenuUser) {
      setTimeout(() => {
        dispatch(closeModal({ contactId: null, modalType: 'menuUser' }));
      }, 3000);
    }
  }, [isOpenMenuUser, dispatch]);
    
    return (
       
      <div className={s.container}>
          <button onClick={handleUpdateUser} className={s.btn}>Update</button>
          <button onClick={handleLogout} className={s.btn}>Logout</button>
            </div>
           
  )
}

export default UserMenu