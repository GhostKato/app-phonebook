import { useState } from 'react';

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/send-reset-email', {
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
