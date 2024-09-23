import styles from './Nav.module.css';

export default function Nav() {
    return (
        <>
            <div className={styles.nav}>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/Contact">Contact</a></li>
                </ul>
            </div>
        </>
    );
}
