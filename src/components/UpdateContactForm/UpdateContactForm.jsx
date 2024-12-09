import s from './UpdateContactForm.module.css';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import { selectFilteredContacts } from '../../redux/filters/selectors';
import { IoClose } from "react-icons/io5";
import updateContactSchema from '../../validation/updateContactSchema';
import { handleFileChange } from '../../utils/fileUtils';
import { MdAddPhotoAlternate } from "react-icons/md";
import { useState, useEffect } from 'react';
import { deleteContacts } from '../../redux/contacts/operations';
import { MdDelete } from "react-icons/md";


const UpdateContactForm = ({contactId, onClose}) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  
  const contact = useSelector((state) =>
    selectFilteredContacts(state).find((item) => item._id === contactId)
  );
  
  useEffect(() => {
    if (contact?.photo) {
      setPreview(contact.photo);
    }
  }, [contact]);

  const initialValues = {
    name: contact?.name || '',
    number: contact?.phoneNumber || '',
    contactType: contact?.contactType || 'personal',
    email: contact?.email || '',
    photo: contact?.photo || null,
  };

  const handleSubmit = async (values, actions) => {
    const newContact = {
      name: values.name,
      phoneNumber: values.number,
      contactType: values.contactType,
      email: values.email,
      photo: values.photo,
    };
    dispatch(updateContact({ id: contactId, body: newContact }));
    actions.resetForm();
    if (onClose) {
      onClose();
    }
  };

  const handleDelete = () => {
    dispatch(deleteContacts(contactId));
    onClose();
  };

  return (
    <div className={s.background}>
      <div className={s.modal}>
        <button type="button" onClick={onClose} className={s.btnClose}>
          <IoClose className={s.iconClose} />
        </button>
        <button type="button" onClick={handleDelete} className={s.btnDelete}>
          <MdDelete className={s.iconDelete} />
        </button>
        <h1 className={s.title}>Update a contact</h1>
        <Formik validationSchema={updateContactSchema} initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form className={s.form}>
              <label className={s.btnFileCont}>
                <span className={s.btnFile}><MdAddPhotoAlternate className={s.btnFileIcon} /></span>
                <input
                  className={s.inputFile}
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(event) => handleFileChange(event, setFieldValue, setPreview)}
                />
                <ErrorMessage name="photo" component="span" className={s.error} />
              </label>

              {preview && <img src={preview} alt="Preview" className={s.previewImage} />}

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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateContactForm;
