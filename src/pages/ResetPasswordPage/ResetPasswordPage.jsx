import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import s from './ResetPasswordPage.module.css'

const ResetPasswordPage = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');

  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;

    try {
      const response = await fetch('https://nodejs-hw-mongodb-nls0.onrender.com/auth/reset-pwd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Не вдалося скинути пароль');
      }

      const data = await response.json();
      setMessage(data.message || 'Пароль успішно скинуто!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Reset your password</h1>
      {token ? (
        <form className={s.form} onSubmit={handleSubmit}>
          <label className={s.label}>
            <span className={s.span}>New password:</span>
            <input className={s.input} type="password" name="newPassword" required />
            </label>
          <button className={s.button} type="submit">Send</button>
        </form>
      ) : (
        <p className={s.message}>Token not given.</p>
      )}
      {message && <p className={s.message}>{message}</p>}
    </div>
  );
}

export default ResetPasswordPage;
