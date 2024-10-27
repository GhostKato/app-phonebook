import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { resetPassword } from '../../redux/auth/operations';
import { selectMessage, selectError, selectLoading } from '../../redux/auth/selectors';
import s from './ResetPasswordPage.module.css';

const ResetPasswordPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const message = useSelector(selectMessage);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  const token = new URLSearchParams(location.search).get('token');

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if (token) {
      dispatch(resetPassword({ token, password: values.newPassword }));
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h1 className={s.title}>Reset your password</h1>
      {token ? (
        <Formik
          initialValues={{ newPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={s.form}>
              <label className={s.label}>
                <span className={s.span}>New password:</span>
                <Field
                  className={s.input}
                  type="password"
                  name="newPassword"
                  placeholder='Enter your password'
                />
                <ErrorMessage name="newPassword" component="div" className={s.error} />
              </label>
              <button className={s.btn} type="submit" disabled={isSubmitting || loading}>
                {loading ? 'Processing...' : 'Send'}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <p className={s.message}>Token not given.</p>
      )}
      {message && <p className={s.message}>{message}</p>}
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};

export default ResetPasswordPage;
