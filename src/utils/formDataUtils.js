export const createContactFormData = (body) => {
  const formData = new FormData();  
  
  formData.append('name', body.name);
  formData.append('phoneNumber', body.phoneNumber);
  formData.append('contactType', body.contactType);
  formData.append('email', body.email); 
    
  if (body.photo) {
    formData.append('photo', body.photo);
  }
  
  return formData;
};

export const createUserFormData = (body) => {
  const formData = new FormData();  
  
  formData.append('name', body.name);
  formData.append('email', body.email);   

  if (body.password) {
    formData.append('password', body.password);
  }
       
  if (body.photo) {
    formData.append('photo', body.photo);
  }
  
  return formData;
};
