import './App.css';
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// Ліниве завантаження компонентів
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage/ResetPasswordPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() { 
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>          
          <Route path='/' element={<h1>Головна сторінка</h1>} />        
          <Route path='/auth/reset-password' element={<ResetPasswordPage />} /> {/* Маршрут для скидання пароля */}
          <Route path='*' element={<NotFoundPage />} /> {/* Обробка невірних маршрутів */}
        </Routes>
      </Suspense>      
    </>
  );
}

export default App;
