import { useSelector } from 'react-redux'
import AuthNav from '../AuthNav/AuthNav'
import Navigation from '../Navigation/Navigation'
import UserBar from '../UserBar/UserBar'
import s from './AppBar.module.css'
import { selectIsLoggedIn } from '../../redux/auth/selectors'

const AppBar = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={s.container}>
      <Navigation />
      {isLoggedIn ?
        < UserBar />
        :
        <AuthNav />
      }
    </div>
  )
}

export default AppBar