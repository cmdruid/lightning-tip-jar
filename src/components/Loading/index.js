import styles from './styles.module.css'
import LogoHeader from '@/components/LogoHeader'

export default function Loading() {

  return (
    <div>
      <LogoHeader />
      <main className={styles.loading}>
          <div className={styles.ldsSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </main>
    </div>
  )
}