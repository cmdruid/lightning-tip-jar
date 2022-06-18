import LogoHeader  from '@/components/LogoHeader'
import styles from '@/styles/page.module.css'

export default function Status404Page() {
  return (
    <div className={styles.container}>
      <LogoHeader />
      <main className={styles.main} >
        <h2 className={styles.title}>404</h2>
        <p className={styles.description}>Resource not found!</p>
      </main>
    </div>
  )
}