import React, {useState} from 'react'
import styles from './styles.module.css'
import { FaBitcoin, FaNetworkWired } from 'react-icons/fa'
import bitcoinGiving from '@/public/bitcoingiving.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Typed from "react-typed"

export default function Landing() {
  const [ formData, setFormData ] = useState()
  const router = useRouter()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const regex = new RegExp(/[^\w\-\s]/, 'g')
    let domain = formData.replace(regex, "").trim().toLowerCase().replace(" ", "-")
    router.push(`/${domain}`)
  }

    return (
        <main className={styles.landing}>
          <p className={styles.title}>Your own personalized space for collecting tips in Bitcoin.</p>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <Typed
              style={{width: "100%"}}
              strings={['Shiners Saloon', 'Satoshi Steakhouse', 'Nakamoto Bank']}
              typeSpeed={150}
              attr="placeholder"
              loop
            >
              <input className={styles.input} type="text" value={formData} onChange={(e) => setFormData(e.target.value)}/>
            </Typed>
            <div className={styles.buttonContainer}>
              <button type='submit' className={styles.visitButton}>Visit a tip jar</button>
            </div>
          </form>
          <div className={styles.callToActionContainer}>
              <div className={styles.iconContainer}>
                <FaNetworkWired style={{marginBottom: -1, marginTop: '1%'}} size={90} className={styles.icon} />
                <h4 className={styles.callToAction}>Connect</h4>
                <div className={styles.callToActionText}>
                    <p>Connect with the local Bitcoin community.</p>
                </div>
              </div>
              <div className={styles.iconContainer}>
                <Image alt='Bitcoin giving' src={bitcoinGiving} width={100} height={100} />
                <h4 className={styles.callToAction}>Earn tips</h4>
                <div className={styles.callToActionText}>
                    <p>Start accepting tips from your favorite patrons.</p>
                </div>
              </div>
              <div className={styles.iconContainer}>
                <FaBitcoin style={{marginBottom: -1, marginTop: '2%'}} size={90} />
                <h4 className={styles.callToAction}>HODL</h4>
                <div className={styles.callToActionText}>
                    <p>Share a single QR code and stack sats from anywhere!</p>
                </div>
              </div>
          </div>
        </main>
    )
  }