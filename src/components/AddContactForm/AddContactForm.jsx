import s from './AddContactForm.module.css';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addContacts } from '../../redux/contacts/operations';

const AddContactForm = () => {
  const dispatch = useDispatch(); 

  const registerSchema = Yup.object({
    name: Yup.string()
      .required('This field is required!')
      .min(3, 'Name must be more than 3 characters!')
      .max(50, 'Name must be less than 50 characters!'),

    number: Yup.string()
      .required('This field is required!')
      .min(3, 'Number must be more than 3 characters!')
      .max(50, 'Number must be less than 50 characters!'),

    contactType: Yup.string()
      .oneOf(['work', 'home', 'personal'], 'Invalid contact type')
      .required('This field is required!'),

    email: Yup.string()
      .email('Invalid email format')
      .max(50, 'Email must be less than 50 characters')
      .notRequired(),
  });

  const initialValues = {
    name: '',
    number: '',
    contactType: 'personal',
    email: '',
  };

  const handleSubmit = async (values, actions) => {
    const newContact = {
      name: values.name,
      phoneNumber: values.number,
      contactType: values.contactType,
      email: values.email,
    };
    try {
      await dispatch(addContacts(newContact)).unwrap();
      
    } catch (error) {
      console.error('Failed to add contact:', error);
    }
    actions.resetForm();
  };

  return (
    <Formik validationSchema={registerSchema} initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={s.form}>
        <label className={s.label}>
          <span>Name</span>          
          <Field className={s.input} name="name" required />
          <ErrorMessage name="name" component="span" className={s.error} />
        </label>

        <label className={s.label}>
          <span className={s.span}>Number</span>          
          <Field className={s.input} name="number" required />
          <ErrorMessage name="number" component="span" className={s.error} />
        </label>
        
        <label className={s.label}>
          <span className={s.span}>Email</span>          
          <Field className={s.input} name="email" type="email" />
          <ErrorMessage name="email" component="span" className={s.error} />
        </label>

        <label className={s.label}>
          <span className={s.span}>Contact Type</span>
          <div className={s.radioCont}>
            <label>
              <Field className={s.radioBtn} type="radio" name="contactType" value="personal" /> 
              <span className={s.span}>Personal</span>
            </label>
            <label>              
              <Field className={s.radioBtn} type="radio" name="contactType" value="work" />
              <span className={s.span}>Work</span>
            </label>
            <label>
              <Field className={s.radioBtn} type="radio" name="contactType" value="home" /> 
              <span className={s.span}>Home</span>
            </label>            
          </div>
          <ErrorMessage name="contactType" component="span" className={s.error} />
        </label>       

        <button type="submit" className={s.btn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default AddContactForm;
