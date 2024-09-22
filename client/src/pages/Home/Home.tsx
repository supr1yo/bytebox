import Nav from '../../components/Nav/Nav';
import styles from './Home.module.css';

export default function Home() {
    return (
        <>
        <Nav />
            <div className={styles.hero}>
                <img src="./favicon.svg" alt="" width={100} />
                <h1>ByteBox</h1>
            </div>
        </>
    )
}