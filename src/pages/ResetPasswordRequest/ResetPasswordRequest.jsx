import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://nodejs-hw-mongodb-nls0.onrender.com/auth/send-reset-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Не вдалося надіслати лист для скидання пароля');
      }

      const data = await response.json();
      setMessage(data.message || 'Лист надіслано успішно!');

      const token = data.token;
      if (token) {
        navigate(`/auth/reset-password?token=${token}`);
      }

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Запит на скидання пароля</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Введіть вашу електронну пошту:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Надіслати лист для скидання пароля</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordRequest;
