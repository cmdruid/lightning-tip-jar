import { FaBolt } from 'react-icons/fa'
import styles from './styles.module.css'

export default function LogoHeader() {
  return (
    <div className={styles.logoheader}>
      <FaBolt size={100} />
      <h1 className={styles.title}>
        Sats4Tips
      </h1>
    </div>
  )
}