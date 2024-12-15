import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { sendResetEmail } from '../../redux/auth/operations';
import { selectIsLoading } from '../../redux/auth/selectors';
import s from './SendResetEmailPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import sendResetEmailSchema from '../../validation/sendResetEmailSchema';

const SendResetEmailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const loading = useSelector(selectIsLoading);  

   const handleSubmit = async (values, { setSubmitting }) => {
    const result = await dispatch(sendResetEmail(values.email));
    if (!result.error) {
      navigate('/login');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h1 className={s.title}>Request to reset password</h1>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={sendResetEmailSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <label className={s.label}>
              <span className={s.span}>Enter your e-mail:</span>
              <Field
                className={s.input}
                type="email"
                name="email"
                placeholder='Enter your email'
              />
              <ErrorMessage name="email" component="div" className={s.error} />
            </label>
            <button className={s.btn} type="submit" disabled={isSubmitting || loading}>
              Send
            </button>
            <p>Go to <Link className={s.link} to='/'>Home</Link></p>
          </Form>
        )}
      </Formik>      
    </div>
  );
};

export default SendResetEmailPage;