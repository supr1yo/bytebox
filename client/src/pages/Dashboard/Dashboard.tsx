import styles from './Dashboard.module.css';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import Unauthorized from '../../components/Errors/Unauthorized';

export default function Dashboard(): JSX.Element {
  const cookies = new Cookies(null, { path: '/' });

  // State to check if the user is logged in
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  // Log out & remove token
  const logOutUser = (): void => {
    cookies.remove('BYTEBOX_TOKEN');
    setLoggedIn(false); 
  };

  // Token validation logic
  useEffect((): void => {
    const clientToken: string | undefined = cookies.get('BYTEBOX_TOKEN');
    
    if (clientToken) {
      const validateToken = async (): Promise<void> => {
        try {
          const response = await fetch('http://localhost:8080/auth/validate', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${clientToken}`,
            },
          });

          if (response.ok) {
            // If the token is valid, set user as logged in
            setLoggedIn(true);
          } else {
            // If the token is invalid, remove it
            cookies.remove('BYTEBOX_TOKEN');
            setLoggedIn(false);
          }
        } catch (err) {
          console.error('Token validation failed:', err);
          setLoggedIn(false); 
        }
      };

      validateToken();
    }
  }, [cookies]);

  if (loggedIn) {
    return (
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>ByteBox</h1>
          <input
            type="search"
            placeholder="Search your files..."
            className={styles.searchBar}
          />
          <button className={styles.Button}>Upload</button>
        </header>

        <nav className={styles.sidebar}>
          <ul>
            <li>
              <h1>Username</h1>
            </li>
            <li>
              <b>Storage left:</b>
            </li>
            <li>
              <button className={styles.Button} onClick={logOutUser}>
                Log out
              </button>
            </li>
          </ul>
        </nav>

        <main className={styles.mainContent}>
          <div className={styles.grid}></div>
        </main>
      </div>
    );
  } else {
    // If user is not logged in, show Unauthorized component
    return <Unauthorized />;
  }
}
