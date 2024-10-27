import { Field, Form, Formik } from 'formik';
import s from './LoginPage.module.css';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { selectLoading } from '../../redux/auth/selectors';
import * as Yup from 'yup';

const LoginPage = () => {
  const isLoggedIn = useSelector(selectLoading);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  const handleSubmit = (values, options) => {    
    dispatch(logIn(values));
    options.resetForm();
  };

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={s.form}>
            <label className={s.label}>
              <span>Email</span>
              <Field className={s.input} name='email' placeholder='Enter your email' />
              {errors.email && touched.email && <div className={s.error}>{errors.email}</div>}
            </label>
            <label className={s.label}>
              <span>Password</span>
              <Field className={s.input} name='password' type='password' placeholder='Enter your password' />
              {errors.password && touched.password && <div className={s.error}>{errors.password}</div>}
            </label>
            <button className={s.btn} type='submit'>Log In</button>
            <p>You don't have an account? <Link className={s.link} to='/register'>Sign up!</Link></p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
