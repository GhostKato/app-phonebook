import * as Yup from 'yup';

const updateUserSchema = Yup.object({
  name: Yup.string()    
    .min(3, 'Name must be more than 3 characters!')
    .max(20, 'Name must be less than 20 characters!'),

  email: Yup.string()
    .email('Invalid email format')
    .min(11, 'Email must be more than 11 characters!')
    .max(35, 'Email must be less than 30 characters'),    

  password: Yup.string()    
    .min(5, 'Password must be more than 3 characters!')
    .max(20, 'Password must be less than 20 characters!'), 
});

export default updateUserSchema;