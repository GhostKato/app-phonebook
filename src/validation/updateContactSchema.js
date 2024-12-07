import * as Yup from 'yup';

const updateContactSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be more than 3 characters!')
    .max(20, 'Name must be less than 20 characters!')
    .optional(), 

  number: Yup.string()
    .min(3, 'Number must be more than 3 characters!')
    .max(20, 'Number must be less than 20 characters!')
    .optional(),

  contactType: Yup.string()
    .oneOf(['work', 'home', 'personal'], 'Invalid contact type')
    .optional(),

  email: Yup.string()
    .email('Invalid email format')
    .min(11, 'Email must be more than 11 characters!')
    .max(50, 'Email must be less than 50 characters!')
    .optional(),
});

export default updateContactSchema;