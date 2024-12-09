export const handleFileChange = (event, setFieldValue, setPreview) => {
  const file = event.currentTarget.files[0]; 
  if (file) {
    setFieldValue("photo", file);     
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); 
    };
    reader.readAsDataURL(file); 
  }
};
