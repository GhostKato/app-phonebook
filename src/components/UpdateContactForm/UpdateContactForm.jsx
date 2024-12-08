import s from './UpdateContactForm.module.css'
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import { selectFilteredContacts } from '../../redux/filters/selectors';
import { IoClose } from "react-icons/io5";
import updateContactSchema from '../../validation/updateContactSchema';

const UpdateContactForm = ({contactId, onClose}) => {
    const dispatch = useDispatch();   
      
  const contact = useSelector((state) =>
    selectFilteredContacts(state).find((item) => item._id === contactId)
  );
    
    const initialValues = {
    name: contact?.name || '',
    number: contact?.phoneNumber || '',
    contactType: contact?.contactType || 'personal',
    email: contact?.email || '',
  };  
    
  const handleSubmit = async (values, actions) => {
  const newСontact = {
    name: values.name,
    phoneNumber: values.number,
    contactType: values.contactType,
    email: values.email,
  };

  try {
    await dispatch(updateContact({ id: contactId, body: newСontact })).unwrap();    
    actions.resetForm();
    if (onClose) {
      onClose();
    }
  } catch (error) {
    console.error('Failed to update contact:', error);
  }
};
    
    return (
      <div className={s.background}>        
        <div className={s.modal}>
          <button type="button" onClick={() => onClose()} className={s.btnClose}><IoClose className={s.icon}/></button>
        <h1 className={s.title}>Update a contact</h1>
      <Formik validationSchema={updateContactSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <label className={s.label}>
            <span>Name</span>          
            <Field className={s.input} name="name" />
            <ErrorMessage name="name" component="span" className={s.error} />
          </label>
  
          <label className={s.label}>
            <span className={s.span}>Number</span>          
            <Field className={s.input} name="number" />
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
            Update
          </button>
        </Form>
              </Formik>
              </div>
       </div>
  )
}

export default UpdateContactForm