import { FaBolt } from 'react-icons/fa'

import styles from './styles.module.css'

export default function LogoHeader({ slug }) {

  return (
    <div className={styles.container}>
      <FaBolt className={styles.logo} size={100} />
      <div className={styles.title}>
        <span className={styles.sitename}>sats4.tips</span>
        { slug && <span className={styles.slug}>{slug}</span> }
      </div>
    </div>
  )
}