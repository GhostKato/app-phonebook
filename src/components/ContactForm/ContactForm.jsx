import s from './ContactForm.module.css';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addContacts } from '../../redux/contacts/operations';

const ContactForm = () => {
   
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
  });

  const initialValues = {    
    name: '',
    number: '',  
    };

  const handleSubmit = (values, actions) => { 
    const newContact = {name: values.name, number: values.number}
    dispatch(addContacts(newContact));
    actions.resetForm();
  };

  return (
    <Formik validationSchema={registerSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit} >      
        <Form className={s.form}>
          <label className={s.label}>
            <span>Name</span>          
          <Field            
            className={s.input}           
            name='name'                     
            required
          />
          <ErrorMessage name='name' component='span' className={s.error} />
          </label>
          <label className={s.label}>
            <span className={s.span}>Number</span>          
          <Field            
            className={s.input}            
            name='number'                       
            required
          />
          <ErrorMessage name='number' component='span' className={s.error} />
          </label>
          <button type='submit' className={s.btn}>
           Add contact
          </button>
        </Form>      
    </Formik>
  );
};

export default ContactForm;
