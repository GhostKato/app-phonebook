import { useState, useEffect } from 'react';

const useResponsiveName = (name, maxLength = 10) => {
  const [responsiveName, setResponsiveName] = useState(name);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 430) {
        setResponsiveName(
          name.length > maxLength ? `${name.slice(0, maxLength)}...` : name
        );
      } else {
        setResponsiveName(name);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [name, maxLength]);

  return responsiveName;
};

export default useResponsiveName;
