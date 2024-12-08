import * as Yup from 'yup';

const sendResetEmailSchema = Yup.object({
    newPassword: Yup.string()
      .email('Invalid email address')
      .min(11, 'Email must be more than 11 characters!')
      .max(35, 'Email must be less than 30 characters')
      .required('This field is required!'),
});
  
export default sendResetEmailSchema