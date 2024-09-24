import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function LoginPage() {
  const navigate = useNavigate(); 
  const cookies = new Cookies(null, { path: '/' });

  // States for Fields
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Logged in or not
  const [loggedIn, isLoggedIn] = useState<boolean>(false);

  // Error Message
  const [error, setError] = useState<string | null>(null);

  // Get token from cookies and validate with the server
  useEffect(() => {
    const clientToken = cookies.get('BYTEBOX_TOKEN');

    if (clientToken) {
      const validateToken = async () => {
        try {
          const response = await fetch('http://localhost:8080/auth/validate', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${clientToken}`
            }
          });

          if (response.ok) {
            // If valid, redirect to dashboard
            isLoggedIn(true);
          } else {
            // Remove the malformed token
            cookies.remove('BYTEBOX_TOKEN');
          }
        } catch (err) {
          console.error('Token validation failed:', err);
        }
      };

      validateToken();
    }
  }, []); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed! Please check your credentials.');
      }

      // Get token from response and set as cookie
      const { token } = await response.json();
      cookies.set('BYTEBOX_TOKEN', token);

      // Redirect to dashboard after login
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (!loggedIn) {
    return (
      <div className={styles.loginPageBody}>
        <div className={styles.card}>
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          {error && <p className={styles.error_message}>{error}</p>}

          <p>
            New user? <a href="/signup">Create an account</a>.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.loginPageBody}>
        <div className={styles.card}>
          <h2>You are already logged in</h2>
          <p>
            Go to your <a href="/dashboard">dashboard</a>.
          </p>
        </div>
      </div>
    );
  }
}
