import { useDispatch, useSelector } from 'react-redux'
import s from './UserMenu.module.css'
import { selectUser } from '../../redux/auth/selectors'
import { logOut } from '../../redux/auth/operations';

const UserMenu = () => {  

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  return (
    <div className={s.container}>      
      <p> {user.name}</p>                          
      <button onClick={() => dispatch(logOut())} className={s.btn} type='button'>logout</button>
    </div>
  )
}

export default UserMenu