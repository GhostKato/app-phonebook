import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { resetPassword } from '../../redux/auth/operations';
import { selectMessage, selectError, selectLoading } from '../../redux/auth/selectors';
import s from './ResetPasswordPage.module.css';
import resetPasswordSchema from '../../validation/resetPasswordSchema';

const ResetPasswordPage = () => {
  const location = useLocation();
   const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  const token = new URLSearchParams(location.search).get('token');  

  const handleSubmit = (values, { setSubmitting }) => {
    if (token) {
      dispatch(resetPassword({ token, password: values.newPassword }))
        .then((result) => {
          if (!result.error) {
            navigate('/login');
          }
        });
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h1 className={s.title}>Reset your password</h1>
      {token ? (
        <Formik
          initialValues={{ newPassword: '' }}
          validationSchema={resetPasswordSchema}
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