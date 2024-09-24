import styles from './Unauthorized.module.css';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
    const navigate = useNavigate();
    return (
        <div className={styles.unauthorizedContainer}>
            <div className={styles.unauthorizedBox}>
                <h2>You are not authorized to visit this page</h2>
                <p>Please log in or create an account to continue.</p>
                <div className={styles.buttons}>
                    <button
                        className={styles.loginButton}
                        onClick={() => navigate('/login')}>
                        Log In
                    </button>
                    <button
                        className={styles.signupButton}
                        onClick={() => navigate('/signup')}>
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};


