import * as Yup from 'yup';

const addContactSchema = Yup.object({
  name: Yup.string()
    .required('This field is required!')
    .min(3, 'Name must be more than 3 characters!')
    .max(20, 'Name must be less than 20 characters!'),

  number: Yup.string()
    .required('This field is required!')
    .min(3, 'Number must be more than 3 characters!')
    .max(20, 'Number must be less than 20 characters!'),

  contactType: Yup.string()
    .oneOf(['work', 'home', 'personal'], 'Invalid contact type!')
    .required('This field is required!'),

  email: Yup.string()
    .email('Invalid email format')
    .min(11, 'Email must be more than 11 characters!')
    .max(30, 'Email must be less than 30 characters')
    .optional(),
});

export default addContactSchema;