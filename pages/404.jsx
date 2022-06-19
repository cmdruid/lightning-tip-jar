import LogoHeader  from '@/components/Widgets/LogoHeader'
import styles from '@/styles/page.module.css'

export default function Status404Page() {
  return (
    <div className={styles.container}>
      <LogoHeader />
      <h2 className={styles.title}>404</h2>
      <h4 className={styles.subtitle}>Resource not found!</h4>
      <p className={styles.description}>
        The page that your browser requested was not found on this server.
      </p>
      <p className={styles.description}>
        Please check your browser and make sure that you are navigating to the correct page.
      </p>
    </div>
  )
}