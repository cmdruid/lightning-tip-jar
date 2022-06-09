import React, {useState} from 'react'
import styles from './styles.module.css'
import Head from 'next/head'
import { FaBitcoin, FaNetworkWired, FaBolt } from 'react-icons/fa'
import bitcoinGiving from '@/public/bitcoingiving.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Typed from "react-typed"

export default function Landing() {
  const [formData, setFormData] = useState("")
  const router = useRouter()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const regex = new RegExp(/[^\w\-\s]/, 'g')
    let domain = formData.replace(regex, "").trim().toLowerCase().replace(" ", "-")
    router.push(`/${domain}`)
  }

    return (
        <main className={styles.landing}>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <Typed
              strings={['Shiners Saloon', 'Satoshi Steakhouse', 'Chase Bank']}
              typeSpeed={150}
              attr="placeholder"
              loop
              >
                <input className={styles.input} type="text" value={formData} onChange={(e) => setFormData(e.target.value)}/>
            </Typed>
            <button type='submit' className={styles.connectButton}>Claim your tip jar</button>
          </form>
          <div className={styles.callToActionContainer}>
              <div className={styles.iconContainer}>
                <FaNetworkWired className={styles.icon} size={85} />
                <h4 className={styles.callToAction}>Connect</h4>
                <div className={styles.callToActionText}>
                    <p>Connect with you local Bitcoin community to get setup for recieving Bitcoin payments</p>
                </div>
              </div>
              <div className={styles.iconContainer}>
                <Image src={bitcoinGiving} width={100} height={100} />
                <h4 className={styles.callToAction}>Earn tips</h4>
                <div className={styles.callToActionText}>
                    <p>Plug in our simple invoicing service to start accepting Bitcoin tips in addition to your current Bitcoin P.O.S.</p>
                </div>
              </div>
              <div className={styles.iconContainer}>
                <FaBitcoin size={85} />
                <h4 className={styles.callToAction}>HODL</h4>
                <div className={styles.callToActionText}>
                    <p>Build up your Bitcoin stack by serving your community</p>
                </div>
              </div>
          </div>
        </main>
    )
  }