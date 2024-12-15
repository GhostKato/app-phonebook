import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { exchangeAuthCodeForToken } from '../../redux/auth/operations'; 
import AuthLoader from '../Loaders/AuthLoader/AuthLoader';
import s from './GoogleAuthCallback.module.css'

const GoogleAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); 
    
    if (!code) {
      console.error('No authorization code found in URL.');
      navigate('/login');
      return;
    }

    const decodedCode = decodeURIComponent(code);
    
    dispatch(exchangeAuthCodeForToken(decodedCode))
      .unwrap()  
      .then((data) => {        
        console.log('Token exchanged successfully:', data);
        navigate('/'); 
      })
      .catch((error) => {        
        console.error('Error exchanging code for token:', error);
        navigate('/login');
      });
  }, [dispatch, navigate]);

  return (
    <div className={s.container}>
      <AuthLoader/> 
    </div>
  );
};

export default GoogleAuthCallback;
