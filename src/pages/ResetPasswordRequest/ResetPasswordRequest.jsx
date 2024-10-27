import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail } from '../../redux/auth/operations';
import { clearMessage } from '../../redux/auth/slice';
import s from './ResetPasswordRequest.module.css';

const ResetPasswordRequest = () => {
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(sendResetEmail(email));
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
        <button className={s.button} type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {message && <p className={s.message}>{message}</p>}
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};

export default ResetPasswordRequest;
