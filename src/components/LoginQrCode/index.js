import qr     from 'qrcode'
import Image  from 'next/image'
import styles from '@/styles/index.module.css'
import { useEffect, useState } from 'react'
import { encodeLnurl } from '@/lib/utils'

export default function LoginQRCode({ authData }) {
  const [ imgData, setImgData ] = useState();

  useEffect(() => {
    if (authData) generateQR(authData, setImgData)
  }, [ authData ])

  return (
    <div className={styles.qrcode}>
      <p>Login using Lightning!</p>
      {imgData &&
        <Image
          className={styles.qrimage}
          src={imgData}
          alt="Login Code" 
          width={300} 
          height={300} 
        />
      }
    </div>
  )
}

async function generateQR({ ref, msg }, setter) {
  const baseUrl = `${window.origin}/api/auth/login`,
        fullUrl = `${baseUrl}?ref=${ref}&tag=login&k1=${msg}&action=login`,
        lnurl   = encodeLnurl(fullUrl);
  console.log('Login lnurl:', lnurl)
  setter(await qr.toDataURL(lnurl));
}