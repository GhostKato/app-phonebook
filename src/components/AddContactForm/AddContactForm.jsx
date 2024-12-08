import { useState } from 'react';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import s from './AddContactForm.module.css';
import { handleFileChange } from '../../utils/fileUtils'; 
import { useDispatch } from 'react-redux';
import { addContacts } from '../../redux/contacts/operations';
import addContactSchema from '../../validation/addContactSchema';
import { BASE_URL_PHOTO } from '../../constants';
import { MdAddPhotoAlternate } from "react-icons/md";

const AddContactForm = () => {

  const dispatch = useDispatch();

  const [preview, setPreview] = useState(null);

  const initialValues = {
    name: '',
    number: '',
    contactType: 'personal',
    email: '',
    photo: BASE_URL_PHOTO,  
  };

  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name,
      phoneNumber: values.number,
      contactType: values.contactType,
      email: values.email || '',
      photo: values.photo,
    };

    dispatch(addContacts(newContact));   
    
    actions.resetForm();
    
  };

  return (
    <Formik validationSchema={addContactSchema} initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form className={s.form}>
          <label className={s.btnFileCont}>
            <span className={s.btnFile}><MdAddPhotoAlternate className={s.btnFileIcon}/></span>
            <input
            className={s.inputFile}  
              type="file"
              name="photo"
              accept="image/*"
              onChange={(event) => handleFileChange(event, setFieldValue, setPreview)}  
            />
            <ErrorMessage name="photo" component="span" className={s.error} />
          </label>   
          {preview ? (
            <img src={preview} alt="Preview" className={s.previewImage} />
          ) : (
            <img src={BASE_URL_PHOTO} alt="Default" className={s.previewImage} />
          )}
          
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
      )}
    </Formik>
  );
};

export default AddContactForm;
