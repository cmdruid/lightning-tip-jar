import useSWR from 'swr'
import Image from 'next/image'
import { useState } from 'react'
import useClipboard from "react-use-clipboard";
import styles from './styles.module.css'


// import styles from './styles.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function PlebQrCode() {

  const { data, error } = useSWR('/api/merch-lnp/get-lnp', fetcher)

  const [isCopied, setCopied] = useClipboard(
    data ? data.lnUrl : "",
    { successDuration: 1000 },
  )

  if (error) return <div>could not load recent payments</div>
  if (!data) return <div>loading...</div>
  if (!data.image) return <div>Unable to fetch recent payments</div>

  return (
    <div className={styles.qrcode}>

      <div className="payment-container">

        <Image src={data.image} alt="Login Code" width={250} height={250} />
        {/* <p>{data.lnUrl}</p> */}

        <div className={styles.copylnurldiv}>
          <button className={styles.copylnurl} onClick={setCopied}>
            {isCopied ? "Copied!" : "Copy LN-URL"}
          </button>
        </div>
      </div>
    </div>
  )
}