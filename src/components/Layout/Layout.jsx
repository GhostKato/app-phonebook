import { Outlet } from 'react-router-dom'
import AppBar from '../AppBar/AppBar'
import s from './Layout.module.css'
import Footer from '../Footer/Footer'

const Layout = () => {
  return (
    <div className={s.layout}>
      <AppBar />
      <div className={s.main}>
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default Layout