import { NavLink } from 'react-router-dom'
import s from './Navigation.module.css'
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import clsx from 'clsx';
import { FaHeart } from "react-icons/fa";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  return (
    <ul className={s.list}>
      <li>
        <NavLink className={buildLinkClass} to='/'>Home</NavLink>        
      </li>
      <li>
        {isLoggedIn &&
          <NavLink className={buildLinkClass} to='/contacts'>Contacts</NavLink>
        }
      </li>
      <li>
        {isLoggedIn &&
          <NavLink className={buildLinkClass} to='/favourite'><FaHeart /></NavLink>
        }
      </li>
    </ul>
  )
}

export default Navigation