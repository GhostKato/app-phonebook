const sendAction = (actionType, contactInfo) => {
  if (actionType === "email") {
   
    const mailtoUrl = `mailto:${contactInfo}`;
    window.location.href = mailtoUrl; 
  } else if (actionType === "call") {
    
    const phoneUrl = `tel:${contactInfo}`;
    window.location.href = phoneUrl; 
  }
};

export default sendAction;