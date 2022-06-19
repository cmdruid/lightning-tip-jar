import LogoHeader from '@/components/Widgets/LogoHeader'
import Landing    from '@/components/Landing'
import styles     from '@/styles/page.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <LogoHeader />
      <Landing />
    </div>
  )
}