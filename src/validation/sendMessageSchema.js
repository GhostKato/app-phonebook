import * as Yup from 'yup';

const sendMessageSchema = Yup.object({
  message: Yup.string()
    .required('This field is required!')    
});

export default sendMessageSchema;