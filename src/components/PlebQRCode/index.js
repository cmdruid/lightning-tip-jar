import useSWR from 'swr'

import Image  from 'next/image'
// import styles from './styles.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function PlebQrCode() {
  
    // const data = {
    //     image: 'https://i.imgur.com/XqQZQZU.png',
    // }
  
    const { data, error } = useSWR('/api/plebqr/qr', fetcher)
  
  if (error) return <div>failed to load!</div>
  if (!data) return <div>loading...</div>
  if (!data.image) return <div>Unable to fetch QR code!</div>

  return (
    <div className="yoo">
      <Image src={data.image} alt="Login Code" width={300} height={300} />
    </div>
  )
}