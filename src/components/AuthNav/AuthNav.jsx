import { NavLink } from 'react-router-dom'
import s from './AuthNav.module.css'
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const AuthNav = () => {
  
  return (
    <ul className={s.list}>
      <li>
        <NavLink className={buildLinkClass} to='/login'>Log In</NavLink>        
      </li>
      <li>        
          <NavLink className={buildLinkClass} to='/register'>Register</NavLink>
        
      </li>
    </ul>
  )
}

export default AuthNav