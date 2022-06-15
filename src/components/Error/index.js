import styles from './styles.module.css'
import { useRouter } from 'next/router'
import LogoHeader from '@/components/LogoHeader'

export default function Error() {
  const router = useRouter()

  return (
    <div>
      <main>
        <LogoHeader />
        <h2 className={styles.subTitle}>Something went wrong...</h2>
        <button 
          onClick={() => router.push(`/`)} 
          className={styles.homeButton}>
            Home
        </button>
      </main>
    </div>
  )
}