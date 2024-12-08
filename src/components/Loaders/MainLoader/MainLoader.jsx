import { RiseLoader } from "react-spinners"
import s from './MainLoader.module.css'

const MainLoader = () => {
  return (
    <div className={s.loaderCont}>
        <RiseLoader size={20} color='#14c57c' />
      </div>
  )
}

export default MainLoader