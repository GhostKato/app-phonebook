import { useState, useEffect } from 'react';

const useResponsiveEmail = (email, maxLength = 20) => {
  const [responsiveEmail, setResponsiveEmail] = useState(email);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 430) {
        setResponsiveEmail(
          email.length > maxLength ? `${email.slice(0, maxLength)}...` : email
        );
      } else {
        setResponsiveEmail(email);
      }
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [email, maxLength]);

  return responsiveEmail;
};

export default useResponsiveEmail;
