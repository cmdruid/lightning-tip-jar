import qr     from 'qrcode'
import Image  from 'next/image'
import styles from '@/styles/index.module.css'
import { useEffect, useState } from 'react'

export default function LnurlQRCode({ data }) {
  const [ imgData, setImgData ] = useState();

  useEffect(() => {
    if (data) {
      (async function() { 
        setImgData(await qr.toDataURL(data))
        console.log('qrdata:', data)
      })()
    }
  }, [ data ])

  return (
    <div className={styles.qrcode}>
      {imgData &&
        <Image
          className={styles.qrimage}
          src={imgData}
          alt="QR Code"
          width={300} 
          height={300} 
        />
      }
    </div>
  )
}
