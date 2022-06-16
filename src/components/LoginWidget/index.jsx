import useSWR from 'swr'
import styles from './styles.module.css'
import Loading from '@/components/Loading'
import Error   from '@/components/Error'
import QrCode  from '@/components/QrCode'
import { fetcher }   from '@/lib/utils'

export default function LoginWidget() {
  const { data, error } = useSWR('/api/auth/login', fetcher, { refreshInterval: 5000 })

  // useEffect(() => {
  //   if (data?.user) window.location.reload()
  // }, [ data ])

  return (
    <div className={styles.container}>
      { 
        error && <Error error={ error } />
        || !data && <Loading error={ error }/>
        || data.lnurl && <QrCode data={data.lnurl}/>
      }
    </div>
  )
}

