import { getGoogleAuthUrl } from '../../redux/auth/operations';
import s from './GoogleButton.module.css'
import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({position}) => {

  const handleGoogle = async () => {
    try {
      const url = await getGoogleAuthUrl();          
      window.location.href = url;
    } catch (error) {
      console.error('Authorization initialization failed', error);
    }
  };

  return (
    <button className={`${s.googleBtn} ${s[position]}`} onClick={handleGoogle}>
      <FcGoogle className={s.googleIcon}/>
    </button>
  );
};

export default GoogleButton;
