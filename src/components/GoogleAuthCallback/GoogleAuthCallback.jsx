import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { exchangeAuthCodeForToken } from '../../redux/auth/operations'; 
import { setToken } from '../../config/contactsApi';

const GoogleAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  
  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');   
    
    if (code) {
      
      const decodedCode = decodeURIComponent(code);       
      
      exchangeAuthCodeForToken(decodedCode)
        .then(data => {
          const token = data.token;
          
          setToken(token);         
                    
          navigate('/');  
        })
        .catch(error => {
          console.error('Error exchanging code for token:', error);          
          
          navigate('/login');
        });
    } else {
      console.error('No authorization code found in URL.');
      
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <h2>Завершення авторизації...</h2>
    </div>
  );
};

export default GoogleAuthCallback;
