import { useRouter } from 'next/router'

import styles from './styles.module.css'

export default function Error({ error, msg }) {
  const router = useRouter()

  if (!msg) msg = 'Failed to load!'

  console.error('Error:', error)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{msg}</h2>
      <p className={styles.description}>Click to refresh the page.</p>
      <button className={styles.button}
        onClick={() => router.reload(window.location.pathname)}>
          Refresh
      </button>
    </div>
  )
}