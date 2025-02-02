import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersService from '../../../utilities/users-service';
import './LoginForm.css';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
      navigate('/');
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className="login-form-container">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        <button type="submit">LOG IN</button>
      </form>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
