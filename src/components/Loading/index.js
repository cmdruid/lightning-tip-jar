import styles from './styles.module.css'
import { FaBolt } from 'react-icons/fa'
import Footer from '@/components/Footer/index.js'

export default function Loading() {

    return (
    <div className={styles.container}>
      <main className={styles.main}>
        <FaBolt size={100} />
        <h1 className={styles.title}>
          Sats4Tips
        </h1>
        <main className={styles.loading}>
            <div className={styles.ldsSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </main>
      </main>
      <Footer />
    </div>
    )
}