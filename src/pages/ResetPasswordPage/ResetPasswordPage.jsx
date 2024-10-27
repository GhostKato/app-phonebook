// src/pages/ResetPasswordPage/ResetPasswordPage.jsx

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/auth/operations';
import { clearMessage } from '../../redux/auth/slice';
import s from './ResetPasswordPage.module.css';

const ResetPasswordPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.auth);

  const [newPassword, setNewPassword] = useState('');

  const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      dispatch(resetPassword({ token, password: newPassword }));
    }
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Reset your password</h1>
      {token ? (
        <form className={s.form} onSubmit={handleSubmit}>
          <label className={s.label}>
            <span className={s.span}>New password:</span>
            <input
              className={s.input}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <button className={s.button} type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Send'}
          </button>
        </form>
      ) : (
        <p className={s.message}>Token not given.</p>
      )}
      {message && <p className={s.message}>{message}</p>}
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};

export default ResetPasswordPage;
