import './App.css';
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ResetPasswordRequestPage from './pages/ResetPasswordRequestPage/ResetPasswordRequestPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage/ResetPasswordPage'));

function App() { 
  return (
    <Suspense fallback={<h1>Завантаження...</h1>}>
      <Routes>
        
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/request-reset' element={<ResetPasswordRequestPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>      
  );
}

export default App;
