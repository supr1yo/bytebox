import styles from './Signup.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate(); 

  // States for Fields
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Displaying messages
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed! Please check your input.');
      }

      // Redirect to Login page after successful registration
      setMessage('Account created successfully. Redirecting you to login page in 5 seconds.');
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className={styles.signupPageBody}>
      <div className={styles.card}>
        <h2>Sign up</h2>
        <form onSubmit={handleSignup}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input 
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign up</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        {error && <p className={styles.error_message}>{error}</p>}
        <p>
          Already have an account? <a href="/login">Log in.</a>
        </p>
      </div>
    </div>
  );
}
