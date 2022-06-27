import qr     from 'qrcode'
import Image  from 'next/image'
import useClipboard from 'react-use-clipboard'
import { useEffect, useState } from 'react'

import styles from './styles.module.css'

export default function LnurlQRCode({ title, data }) {
  const [ imgData, setImgData ] = useState();

  useEffect(() => {
    if (data) {
      (async function() { 
        setImgData(await qr.toDataURL(data))
        console.log('qrcode:', data)
      })()
    }
  }, [ data ])

  return imgData && <QrComponent title={ title } data={ data } imgData={ imgData }/>
}

function QrComponent({ title, data, imgData }) {
  const [ isCopied, setCopied ] = useClipboard(
    data, { successDuration: 1000 }
  );

  return (
    <div className={styles.qrcode}>
      { title && 
        <div 
          className={styles.title}
          style={{borderRadius: title ? '10px 10px 0 0' : ''}}
          >
            {title}
          </div> }
      <Image
        className={styles.image}
        style={{borderRadius: title ? '' : '10px 10px 0 0'}}
        src={imgData}
        alt="QR Code"
        width={300}
        height={300}
      />
      <div
        className={styles.button}
        onClick={setCopied}>
          { isCopied ? "Copied to clipboard!" : "Copy Lightning-URL Code"}
      </div>
    </div>
  )
}