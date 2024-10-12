import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ResetPasswordRequest.module.css'

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
        throw new Error('Unable to send a password reset email');
      }

      const data = await response.json();
      setMessage(data.message || 'Letter sent successfully!');

      const token = data.token;
      if (token) {
        navigate(`/auth/reset-password?token=${token}`);
      }

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Request to reset password</h1>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          <span className={s.span}>Enter your e-mail:</span>
        <input
          className={s.input}
          type="email"          
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          </label>
        <button className={s.button} type="submit">Send</button>
      </form>
      {message && <p className={s.message}>{message}</p>}
    </div>
  );
};

export default ResetPasswordRequest;
