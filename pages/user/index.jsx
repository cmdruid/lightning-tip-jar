import useSWR from 'swr'
import styles from '@/styles/index.module.css'
import { fetcher }   from '@/lib/utils'

export default function LoginPage() {

  const { data, error } = useSWR('/api/auth/user', fetcher)

  return (
    <div className={styles.container}>
      <main className={styles.main} style={{justifyContent:'normal'}}>
        <p>User Session Object (stored encrypted on client browser)</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <p>Use /api/auth/logout endpoint to clear session.</p>
      </main>
    </div>
  )
}