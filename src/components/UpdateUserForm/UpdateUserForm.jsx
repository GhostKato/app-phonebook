import s from './UpdateUserForm.module.css';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import updateUserSchema from '../../validation/updateUserSchema';
import { handleFileChange } from '../../utils/fileUtils';
import { MdAddPhotoAlternate } from "react-icons/md";
import { useState, useEffect } from 'react';
import { selectUser } from '../../redux/auth/selectors';
import { updateUser } from '../../redux/user/operations';

const UpdateUserForm = ({ contactId, onClose }) => {
    
    const dispatch = useDispatch();    
    const [preview, setPreview] = useState(null);    
    const user = useSelector(selectUser);   
  
  useEffect(() => {
    if (user?.photo) {
      setPreview(user.photo);
    }
  }, [user]);

  const initialValues = {
    name: user?.name || '',  
    email: user?.email || '',
    password: '',
    photo: '',
  };

  const handleSubmit = async (values, actions) => {
    const newUser = {
      name: values.name,     
      email: values.email,
      password: values.password,
      photo: values.photo,
    };
    
    dispatch(updateUser({ id: contactId, body: newUser }));
    actions.resetForm();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={s.background}>
      <div className={s.modal}>
        <button type="button" onClick={onClose} className={s.btnClose}>
          <IoClose className={s.iconClose} />
        </button>
        
        <h1 className={s.title}>Update a user</h1>
        <Formik validationSchema={updateUserSchema} initialValues={initialValues} onSubmit={handleSubmit}>
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
                <span className={s.span}>Email</span>
                <Field className={s.input} name="email" />
                <ErrorMessage name="email" component="span" className={s.error} />
              </label>

              <label className={s.label}>
                <span className={s.span}>Password</span>
                <Field className={s.input} name="password" type="email" />
                <ErrorMessage name="password" component="span" className={s.error} />
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

export default UpdateUserForm;
