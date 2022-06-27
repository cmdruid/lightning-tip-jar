import styles      from '@/styles/page.module.css'
import LoginWidget from '@/components/Widgets/LoginWidget'

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loginTitle}>
        Login Page
      </div>
      <p className={styles.loginDescription}>
        Scan the QR Code below using a compatible Lightning Wallet.
      </p>
      <LoginWidget />
    </div>
  )
}