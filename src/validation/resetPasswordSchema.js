import * as Yup from 'yup';

const resetPasswordSchema = Yup.object({
    newPassword: Yup.string()
      .required('Password is required')
      .min(5, 'Password must be more than 3 characters!')
      .max(20, 'Password must be less than 20 characters!'),
});
  
export default resetPasswordSchema