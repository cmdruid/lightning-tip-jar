import LogoHeader from '@/components/LogoHeader'
import Landing    from '@/components/Landing/index.js'
import styles from '@/styles/page.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <LogoHeader />
      <main className={styles.main} >
        <Landing />
      </main>
    </div>
  )
}