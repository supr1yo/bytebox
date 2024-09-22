import styles from './Nav.module.css';

export default function Nav() {
    return (
        <>
        <div className={styles.nav}>
            <ul>
                <li>Home</li>
                <li>Sign up</li>
                <li>Log in</li>
                <li>About</li>
                <li>Contact us</li>
            </ul>
        </div>
        </>
    )
}