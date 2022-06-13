import Head   from 'next/head'
import useSWR from 'swr'
import Footer from '@/components/Footer/index.js'
import styles from '@/styles/index.module.css'
import LoginQrCode   from '@/components/LoginQrCode'
import { fetcher }   from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter();

  const { data, error } = useSWR('/api/auth/login', fetcher, { refreshInterval: 5000 })

  useEffect(() => {
    console.log(data)
    if (data?.user) router.push('/user')
  }, [ data, router ])

  return (
    <div className={styles.container}>
      <Head>
        <title>Sats4Tips</title>
        <meta name="description" content="sats4tips" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        { 
          error && <div>Error fetching data!</div>
          || !data && <div>loading...</div>
          || data.auth && <LoginQrCode authData={data.auth}/>
          || <div>failed to load!</div>
        }
      </main>
      <Footer />
    </div>
  )
}

