import { FaBolt } from 'react-icons/fa'
import styles from './styles.module.css'

export default function LogoHeader() {
  return (
    <div className={styles.container}>
      <FaBolt size={100} />
      <h1 className={styles.title}>
        sats4.tips
      </h1>
    </div>
  )
}