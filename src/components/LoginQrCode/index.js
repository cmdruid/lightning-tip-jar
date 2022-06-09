import useSWR from 'swr'

import Image  from 'next/image'
import styles from './styles.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function LoginQrCode() {
  const { data, error } = useSWR('/api/auth/getcode', fetcher)
  
  if (error) return <div>failed to load!</div>
  if (!data) return <div>loading...</div>
  if (!data.image) return <div>Unable to fetch QR code!</div>

  return (
    <div className={styles.qrcode}>
      <Image src={data.image} alt="Login Code" width={300} height={300} />
    </div>
  )
}