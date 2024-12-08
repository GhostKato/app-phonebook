import { Route, Routes } from 'react-router-dom';
import s from './App.module.css';
import Layout from '../Layout/Layout';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import { useDispatch } from 'react-redux';
import { lazy, Suspense, useEffect } from 'react';
import { refreshUser } from '../../redux/auth/operations';
import { PrivateRoute } from '../../Routes/PrivateRoute';
import { PublicRoute } from '../../Routes/PublicRoute';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ResetPasswordRequestPage from '../../pages/ResetPasswordRequestPage/ResetPasswordRequestPage';
import MainLoader from '../Loaders/MainLoader/MainLoader';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = lazy(() =>
  import('../../pages/HomePage/HomePage')
);
const ContactsPage = lazy(() =>
  import('../../pages/ContactsPage/ContactsPage')
);
const FavouritePage = lazy(() =>
  import('../../pages/FavouritePage/FavouritePage')
);

function App() {  
  
  const dispatch = useDispatch();  

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  
  return  (
    <div className={s.container}>
      <ToastContainer />
      <Suspense fallback={<MainLoader/>}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/register' element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>} />
          <Route path='/login' element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>} />
          <Route path='/contacts' element={
            <PrivateRoute>
              <ContactsPage />
            </PrivateRoute>} />
          <Route path='/favourite' element={
            <PrivateRoute>
              <FavouritePage />
            </PrivateRoute>} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/request-reset' element={<ResetPasswordRequestPage />} />
          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
        </Routes>
        </Suspense>
    </div>
  );
}

export default App;
