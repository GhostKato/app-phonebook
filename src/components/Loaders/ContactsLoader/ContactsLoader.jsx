import { PropagateLoader } from "react-spinners"
import s from './ContactsLoader.module.css'
import { useSelector } from "react-redux";
import { selectIsLoading } from '../../../redux/contacts/selectors';

const ContactsLoader = () => {

    const isLoading = useSelector(selectIsLoading);
  return (
    <div className={s.loaderCont}>
        <PropagateLoader size={20} color='#14c57c' loading={isLoading}/>
      </div>
  )
}

export default ContactsLoader