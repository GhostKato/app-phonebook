import { Link, Navigate } from 'react-router-dom';
import s from './RegistrationPage.module.css'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations'
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import registrationUserSchema from '../../validation/registrationUserSchema';
import AuthLoader from '../../components/Loaders/AuthLoader/AuthLoader';
import GoogleButton from '../../components/GoogleButton/GoogleButton';

const RegistrationPage = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    
    dispatch(register(values));
    actions.resetForm();
  }

  if (isLoggedIn) {
    return <Navigate to='/'/>
  }

  return (
    <div className={s.container}>
      <Formik validationSchema={registrationUserSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <label className={s.label}>
            <span>Name</span>
            <Field className={s.input} name='name' placeholder='Enter your name' />
          </label>
          <label className={s.label}>
            <span>Email</span>
            <Field className={s.input} name='email' placeholder='Enter your email' />
          </label>
           <label className={s.label}>
            <span>Password</span>
            <Field className={s.input} name='password' type='password' placeholder='Enter your password' />
            </label>
          <button className={s.btn} type='submit'>Send</button>
          <p>You already have account? <Link className={s.link} to='/login'>Sing in</Link></p>
        </Form>
      </Formik>
      <div className={s.containerBtn}>
        <GoogleButton position='googleRegistration' />
      </div>
      <AuthLoader/>
    </div>
  )
}

export default RegistrationPage