import styles from './styles.module.css'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer/index.js'
import { FaBolt } from 'react-icons/fa'

export default function Error() {
  const router = useRouter()

    return (
        <div className={styles.container}>
        <main className={styles.error}>
              <FaBolt size={100} />
              <h1 className={styles.title}>
                  Sats4Tips
              </h1>
              <h2 className={styles.subTitle}>Something went wrong...</h2>
              <button onClick={() => router.push(`/`)} className={styles.homeButton}>Home</button>
          </main>
        <Footer />
      </div>
    )
}