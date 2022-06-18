import LogoHeader  from '@/components/LogoHeader'
import styles from '@/styles/page.module.css'

export default function Status500Page() {
  return (
    <div className={styles.container}>
      <LogoHeader />
      <main className={styles.main} >
        <h2 className={styles.title}>500</h2>
        <p className={styles.description}>Server error!</p>
      </main>
    </div>
  )
}