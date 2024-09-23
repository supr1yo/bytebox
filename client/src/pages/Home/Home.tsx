import Nav from '../../components/Nav/Nav';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    // Navigate to login page
    const loginRoute = () => {
        navigate('/login');
    };

    // Navigate to signup page
    const signupRoute = () => {
        navigate('/signup');
    };

    return (
        <div className={styles.homePageBody}>
            <Nav />
            <div className={styles.hero}>
                <div className={styles.titleImageContainer}>
                    <h1>ByteBox</h1>
                    <img src="./favicon.svg" alt="ByteBox Logo" width={100} />
                </div>
                <p className={styles.description}>
                    Your Digital Storage Solution, Simplified
                </p>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={loginRoute}>
                        Login
                    </button>
                    <button
                        className={styles.button}
                        onClick={signupRoute}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}
