import MainMenu from '../MainMenu/MainMenu'
import UserMenu from '../UserMenu/UserMenu'
import s from './Header.module.css'

const Header = () => {
  return (
    <div className={s.container}>
      <MainMenu />
      <UserMenu/>
    </div>
  )
}

export default Header