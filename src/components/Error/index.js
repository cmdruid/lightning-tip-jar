import styles from './styles.module.css'
import { useRouter } from 'next/router'

export default function Error() {
  const router = useRouter()

    return (
        <main className={styles.error}>
            <h2 className={styles.title}>Something went wrong...</h2>
            <button onClick={() => router.push(`/`)} className={styles.homeButton}>Home</button>
        </main>
    )
}