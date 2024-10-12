import './App.css';
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ResetPasswordRequest from './pages/ResetPasswordRequest/ResetPasswordRequest';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage/ResetPasswordPage'));

function App() { 
  return (
    <Suspense fallback={<h1>Завантаження...</h1>}>
      <Routes>
        
        <Route path='/auth/reset-password' element={<ResetPasswordPage />} />
        <Route path='/' element={<ResetPasswordRequest />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>      
  );
}

export default App;
