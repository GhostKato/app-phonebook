import UserAuth from '../UserAuth/UserAuth'
import UserInfo from '../UserInfo/UserInfo'
import s from './UserMenu.module.css'

const UserMenu = () => {
  return (
      <div>
          <UserInfo />
          <UserAuth/>
    </div>
  )
}

export default UserMenu