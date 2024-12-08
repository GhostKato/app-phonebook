import { toast } from 'react-toastify';

export const showToastSuccess = (message) => { 
  if (message) {    
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        type: "success",
      });
    
  }
};


export const showToastError = (message) => {
  if (message) {    
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      type: "error",
    });
    
  }
};

