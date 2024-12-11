import { useDispatch, useSelector } from 'react-redux'
import s from './UserMenu.module.css'
import { selectUser } from '../../redux/auth/selectors'
import { logOut } from '../../redux/auth/operations';
import useResponsiveName from '../../hooks/useResponsiveName';
import { MdExitToApp } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';

const UserMenu = () => {  

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const responsiveName = useResponsiveName(user.name);
  
  const isLargeScreen = useMediaQuery({ minWidth: 430 });

  return (
    <div className={s.container}>      
      <p title={user.name}> {responsiveName}</p>
      {isLargeScreen &&
          <img className={s.photo} src={user.photo} alt="User photo" />
        }
      <button onClick={() => dispatch(logOut())} className={s.btn} type='button'><MdExitToApp className={s.logoutIcon} /></button>
    </div>
  )
}

export default UserMenu



