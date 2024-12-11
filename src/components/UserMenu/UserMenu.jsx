import { useDispatch, useSelector } from 'react-redux'
import s from './UserMenu.module.css'
import { selectUser } from '../../redux/auth/selectors'
import { logOut } from '../../redux/auth/operations';
import useResponsiveName from '../../hooks/useResponsiveName';
import { GiExitDoor } from "react-icons/gi";
import { MdExitToApp } from "react-icons/md";

const UserMenu = () => {  

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const responsiveName = useResponsiveName(user.name);

  return (
    <div className={s.container}>      
      <p title={user.name}> {responsiveName}</p>                          
      <button onClick={() => dispatch(logOut())} className={s.btn} type='button'><MdExitToApp className={s.logoutIcon} /></button>
    </div>
  )
}

export default UserMenu