import { toast } from 'react-toastify';

export const showToastSuccess = (message) => { 
  if (message) {    
      toast(message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        type: "success",
      });
    
  }
};


export const showToastError = (message) => {
  if (message) {    
    toast(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      type: "error",
    });
    
  }
};

