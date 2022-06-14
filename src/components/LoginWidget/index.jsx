import useSWR from 'swr'
import styles from './styles.module.css'
import LoginQrCode   from './LoginQrCode'
import { fetcher }   from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function LoginWidget() {
  const router = useRouter();

  const { data, error } = useSWR('/api/auth/login', fetcher, { refreshInterval: 5000 })

  useEffect(() => {
    if (data?.user) router.push('/user')
  }, [ data, router ])

  return (
    <div className={styles.container}>
      { 
        error && <div>Error fetching data!</div>
        || !data && <div>loading...</div>
        || data.auth && <LoginQrCode authData={data.auth}/>
        || <div>failed to load!</div>
      }
    </div>
  )
}

