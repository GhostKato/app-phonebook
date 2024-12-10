import { Field, Form, Formik } from 'formik'
import s from './LoginPage.module.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import loginUserSchema from '../../validation/loginUserSchema';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';

const LoginPage = () => {

  const navigate = useNavigate();

  const handleResetPassword = () => {
    navigate('/request-reset');
  };

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {    
    dispatch(logIn(values));
    actions.resetForm();
  };

  if (isLoggedIn) {
    return <Navigate to='/'/>
  }

  return (
    <div className={s.container}>
      <Formik validationSchema={loginUserSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <label className={s.label}>
            <span>Email</span>
            <Field className={s.input} name='email' placeholder='Enter your email' />
          </label>
          <label className={s.label}>
            <span>Password</span>
            <Field className={s.input} name='password' type='password' placeholder='Enter your password' />
          </label>          
          <div className={s.containerBtn}>
            <button className={`${s.btn} ${s.btnLogin}`} type='submit'>Log In</button>
          </div>           
          <p className={s.text}>You don't have account? <Link className={s.link} to='/register'>Sing up!</Link></p>
        </Form>
      </Formik>
      <div className={s.containerBtn}>
        <GoogleLoginButton />
      </div>
      <button className={`${s.btn} ${s.btnReset}`} onClick={handleResetPassword}>Reset password</button>
    </div>
  )
}

export default LoginPage