export const createFormData = (body) => {
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
