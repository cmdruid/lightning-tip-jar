import { FaBolt } from 'react-icons/fa'

import styles from './styles.module.css'

export default function LogoHeader({ slug }) {

  console.log('slug', slug)

  const title = slug ? `sats4.tips/${slug}` : 'sats4.tips'

  return (
    <div className={styles.container}>
      <FaBolt className={styles.logo} size={100} />
      <h1 className={styles.title}>
        { title }
      </h1>
    </div>
  )
}