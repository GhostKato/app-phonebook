import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { sendResetEmail } from '../../redux/auth/operations';
// import { selectMessage, selectError, selectLoading } from '../../redux/auth/selectors';
import s from './ResetPasswordRequestPage.module.css';
import { Link } from 'react-router-dom';

const ResetPasswordRequest = () => {
  const dispatch = useDispatch();

  const message = useSelector(selectMessage);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(sendResetEmail(values.email));
    setSubmitting(false);
  };

  return (
    <div>
      <h1 className={s.title}>Request to reset password</h1>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
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
              {loading ? 'Sending...' : 'Send'}
            </button>
            <p>Go to <Link className={s.link} to='/'>Home</Link></p>
          </Form>
        )}
      </Formik>
      {message && <p className={s.message}>{message}</p>}
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};

export default ResetPasswordRequest;