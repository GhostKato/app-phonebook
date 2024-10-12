import { useLocation } from 'react-router-dom';
import { useState } from 'react';

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
    <div>
      <h1>Скидання пароля</h1>
      {token ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="newPassword">Новий пароль:</label>
          <input type="password" id="newPassword" name="newPassword" required />
          <button type="submit">Скинути пароль</button>
        </form>
      ) : (
        <p>Токен не надано.</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPasswordPage;
