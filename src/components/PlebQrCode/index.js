import useSWR from 'swr'
import Image from 'next/image'
import { useState } from 'react'
import useClipboard from "react-use-clipboard";
import qr from 'qrcode'
import styles from './styles.module.css'


export default function PlebQrCode({payRequest}) {
  
  const [qrImage, setQrImage] = useState('')
 
  async function makeQr(payRequest) {
    const qrimage = await qr.toDataURL(payRequest)
    setQrImage(qrimage)
  }
  // const { data, error } = useSWR('/api/merch-lnp/get-lnp', fetcher)

  const [isCopied, setCopied] = useClipboard(
    payRequest ? payRequest : "oops",
    { successDuration: 1000 },
  )

  makeQr(payRequest)

  return (
    <div className={styles.qrcode}>

      <div className="payment-container">

        {qrImage 
          ? <Image className={styles.qrImage} src={qrImage} alt="Login Code" width={250} height={250} />
          : null
        }
        {/* <p>{payRequest}</p> */}

        <div className={styles.copylnurldiv}>
          <button className={styles.copylnurl} onClick={setCopied}>
            {isCopied ? "Copied!" : "Copy LN-URL"}
          </button>
        </div>
      </div>
    </div>
  )
}