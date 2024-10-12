import './App.css';
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ResetPasswordRequest from './pages/ResetPasswordRequest/ResetPasswordRequest';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage/ResetPasswordPage'));
// const ResetPasswordRequest = lazy(() => import('./pages/ResetPasswordRequest'));
// const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() { 
  return (
    <>
      <Suspense fallback={<h1>Завантаження...</h1>}>
        <Routes>          
          <Route path='/' element={<h1>Головна сторінка</h1>} />        
          <Route path='/auth/reset-password' element={<ResetPasswordPage />} />
          <Route path='/auth/request-reset' element={<ResetPasswordRequest />} /> {/* Новий маршрут */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>      
    </>
  );
}

export default App;

