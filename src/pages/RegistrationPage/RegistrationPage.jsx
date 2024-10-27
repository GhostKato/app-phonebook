import { Link, Navigate } from 'react-router-dom';
import s from './RegistrationPage.module.css';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { selectLoading } from '../../redux/auth/selectors';
import * as Yup from 'yup';

const RegistrationPage = () => {
  const isLoggedIn = useSelector(selectLoading);
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values, options) => {
    dispatch(register(values));
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
              <span>Name</span>
              <Field className={s.input} name='name' placeholder='Enter your name' />
              {errors.name && touched.name && <div className={s.error}>{errors.name}</div>} 
            </label>
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
            <button className={s.btn} type='submit'>Send</button>
            <p>You already have an account? <Link className={s.link} to='/login'>Sign in</Link></p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegistrationPage;
