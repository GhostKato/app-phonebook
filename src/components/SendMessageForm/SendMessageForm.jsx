import s from './SendMessageForm.module.css';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../redux/user/operations';
import { IoClose } from "react-icons/io5";

import sendMessageSchema from '../../validation/sendMessageSchema';

const SendMessageForm = ({ contactName, contactEmail, onClose }) => {
  const dispatch = useDispatch();
  
  const initialValues = {
    message: '',
  };

  const handleSubmit = async (values, actions) => {
    const data = {
      name: contactName,
      email: contactEmail,
      message: values.message,
    };
    console.log(data);
    dispatch(sendMessage(data));
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

        <h1 className={s.title}>Send a message to the mail</h1>
        <Formik
          validationSchema={sendMessageSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form className={s.form}>
            
            <label className={s.label}>
              <span>Message</span>
              <Field
                as="textarea"
                className={s.textarea}
                name="message"
                placeholder="Enter your message"
              />
              <ErrorMessage name="message" component="span" className={s.error} />
            </label>
            
            <button type="submit" className={s.btn}>
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SendMessageForm;
