import { PropagateLoader } from "react-spinners"
import s from './AuthLoader.module.css'
import { useSelector } from "react-redux";
import { selectIsLoading } from '../../../redux/auth/selectors';

const AuthLoader = () => {

    const isLoading = useSelector(selectIsLoading);
  return (
    <div className={s.loaderCont}>
        <PropagateLoader size={20} color='#14c57c' loading={isLoading}/>
      </div>
  )
}

export default AuthLoader