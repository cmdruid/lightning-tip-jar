import LogoHeader  from '@/components/LogoHeader'
import LoginWidget from '@/components/LoginWidget'
import styles from '@/styles/page.module.css'

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LogoHeader />
      <main className={styles.main} >
        <LoginWidget />
      </main>
    </div>
  )
}