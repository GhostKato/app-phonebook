import { getGoogleAuthUrl } from '../../redux/auth/operations';
import s from './GoogleLoginButton.module.css'
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {

  const handleGoogleLogin = async () => {
    try {
      const url = await getGoogleAuthUrl();           
      
      window.location.href = url;
    } catch (error) {
      console.error('Authorization initialization failed', error);
    }
  };

  return (
      <button className={s.googleBtn} onClick={handleGoogleLogin}>
      <FcGoogle className={s.googleIcon}/>
    </button>
  );
};

export default GoogleLoginButton;
