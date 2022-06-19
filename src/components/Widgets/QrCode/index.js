import qr     from 'qrcode'
import Image  from 'next/image'
import useClipboard from 'react-use-clipboard'
import { useEffect, useState } from 'react'

import styles from './styles.module.css'

export default function LnurlQRCode({ data }) {
  const [ imgData, setImgData ] = useState();

  useEffect(() => {
    if (data) {
      (async function() { 
        setImgData(await qr.toDataURL(data))
        console.log('qrcode:', data)
      })()
    }
  }, [ data ])

  return (
    <div className={styles.qrCode}>
      {imgData && <QrComponent data={ data } imgData={ imgData }/>}
    </div>
  )
}

function QrComponent({ data, imgData }) {
  const [isCopied, setCopied] = useClipboard(data, { successDuration: 1000 });

  return (
    <>
      <Image
        className={styles.qrImage}
        src={imgData}
        alt="QR Code"
        width={300}
        height={300}
      />
      <div
        className={styles.copyBtn}
        onClick={setCopied}>
          { isCopied ? "Copied to clipboard!" : "Copy Lightning-URL Code"}
      </div>
    </>
  )
}