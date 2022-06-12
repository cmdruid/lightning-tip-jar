import { useRouter } from 'next/router'
import styles from './styles.module.css'

export default function HomeButton() {
    const router = useRouter()
    return <button onClick={() => router.push('/')} className={styles.floatingButton}>Home</button>
}