import { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function AuthPage({ user, setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <main>
      <h1>AuthPage</h1>
      {/* Toggle between LoginForm and SignUpForm */}
      {showSignUp ? <SignUpForm setUser={setUser} /> : <LoginForm />}

      {/* Button to switch between forms */}
      <button onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp
          ? 'Already have an account? Log In'
          : 'Need an account? Sign Up'}
      </button>
    </main>
  );
}
