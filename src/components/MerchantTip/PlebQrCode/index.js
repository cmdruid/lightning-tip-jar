import useSWR from 'swr'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import useClipboard from "react-use-clipboard";
import qr from 'qrcode'
import styles from './styles.module.css'


export default function PlebQrCode({payRequest}) {
  
  const [qrImage, setQrImage] = useState('')
  
  const [isCopied, setCopied] = useClipboard(payRequest, {
    successDuration: 1000,
  });
  
  useEffect(() => {
    qr.toDataURL(payRequest, {}, (err,data) => {
      if (!err) {
        setQrImage(data)
      }
    })
  }, [payRequest])

  
  return (
    <div className={styles.qrcode}>

      <div className="payment-container">

        {qrImage 
          ? <Image className={styles.qrImage} src={qrImage} alt="Login Code" width={250} height={250} />
          : null
        }

        <div className={styles.copylnurldiv}>
          <button className={styles.copylnurl} onClick={setCopied}>
            { isCopied ? "Copied!" : "Copy LN-URL"}
          </button>

        </div>
      </div>
    </div>
  )
}