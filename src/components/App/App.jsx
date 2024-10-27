import './App.css';
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ResetPasswordRequestPage from '../../pages/ResetPasswordRequestPage/ResetPasswordRequestPage';
import Header from '../Header/Header';
import HomePage from '../../pages/HomePage/HomePage';
import Footer from '../Footer/Footer';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import Loading from '../loading/Loading';
const ResetPasswordPage = lazy(() => import('../../pages/ResetPasswordPage/ResetPasswordPage'));

function App() { 
  return (
    <Suspense fallback={<Loading/>}>
      <Header/>
      <Routes>         
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />            
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/request-reset' element={<ResetPasswordRequestPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer/>
    </Suspense>      
  );
}

export default App;
