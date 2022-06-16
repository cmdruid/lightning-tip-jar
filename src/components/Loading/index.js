import styles from './styles.module.css'
import LogoHeader from '@/components/LogoHeader'

export default function Loading() {

  return (
    <div className={styles.loadContainer}>
      <div className={styles.loadSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <p className={styles.loadText}>Loading ...</p>
    </div>
  )
}