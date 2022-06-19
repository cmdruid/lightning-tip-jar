import LogoHeader from '@/components/Widgets/LogoHeader'
import styles     from '@/styles/page.module.css'

export default function Status500Page() {
  return (
    <div className={styles.container}>
      <LogoHeader />
      <h2 className={styles.title}>500</h2>
      <h4 className={styles.subtitle}>Server Error</h4>
      <p className={styles.description}>There was an unexpected error with the server while processing your request.</p>
      <p className={styles.description}>Please refresh this page, or navigate back to the home page and try again.</p>
    </div>
  )
}