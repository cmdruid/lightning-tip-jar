import React, {useState} from 'react'
import styles from './styles.module.css'
import { FaBitcoin } from 'react-icons/fa'
import { AiOutlineQrcode } from 'react-icons/ai'
import bitcoinGiving from '@/public/bitcoingiving.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Typed from "react-typed"

export default function Landing() {

  return (
    <div className={styles.container}>
      <p className={styles.title}>Your own personalized space for <br/>collecting tips in Bitcoin.</p>
      <AccountForm />
      <div className={styles.ctaContainer}>
        <div className={styles.iconContainer}>
          <AiOutlineQrcode 
            className={styles.icon}
            size={90}
          />
          <h4 className={styles.callToAction}>Create a Code</h4>
          <div className={styles.callToActionText}>
            <p>Create a customized tips page with a single, static QR code.</p>
          </div>
        </div>
        <div className={styles.iconContainer}>
          <Image 
            className={styles.icon}
            alt='Bitcoin giving' 
            src={bitcoinGiving}
            width={90} height={90} 
          />
          <h4 className={styles.callToAction}>Earn Tips</h4>
          <div className={styles.callToActionText}>
            <p>Start collecting Bitcoin from your favorite patrons.</p>
          </div>
        </div>
        <div className={styles.iconContainer}>
          <FaBitcoin 
            className={styles.icon}
            size={90}
            style={{paddingBottom: '0.5rem'}}
          />
          <h4 className={styles.callToAction}>Split Withdraws</h4>
          <div className={styles.callToActionText}>
            <p>Split and withdraw funds to any compatible wallet.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AccountForm() {
  const [ formData, setFormData ] = useState()
  const router = useRouter()
  
  const handleSubmit = e => {
    e.preventDefault()
    const regex = new RegExp(/[^\w\-\s]/, 'g')
    let domain = formData.replace(regex, "").trim().toLowerCase().replace(" ", "-")
    router.push(`/${domain}`)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <Typed
        strings={['Shiners Saloon', 'Satoshi Steakhouse', 'Nakamoto Bank']}
        typeSpeed={150}
        attr="placeholder"
        loop
      >
        <input className={styles.input} type="text" value={formData} onChange={(e) => setFormData(e.target.value)}/>
      </Typed>
      <div className={styles.buttonContainer}>
        <button type='submit' className={styles.submitButton}>Create tips page</button>
      </div>
    </form>
  )
}