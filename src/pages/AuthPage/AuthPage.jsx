import { useState } from 'react';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import SignUpForm from '../../components/Auth/SignUpForm/SignUpForm';
import './AuthPage.css';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <main className="auth-container">
      <h1>{showSignUp ? 'Sign Up' : 'Log In'}</h1>
      {showSignUp ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
      <button
        className="toggle-button"
        onClick={() => setShowSignUp(!showSignUp)}
      >
        {showSignUp
          ? 'Already have an account? Log In'
          : 'Need an account? Sign Up'}
      </button>
    </main>
  );
}
