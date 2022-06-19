import Image from 'next/image'
import { FaBitcoin }       from 'react-icons/fa'
import { AiOutlineQrcode } from 'react-icons/ai'

import styles              from './styles.module.css'
import bitcoinGiving       from '@/public/bitcoingiving.svg'

export default function CallToAction() {
  return (
    <div className={styles.ctaContainer}>
      <div className={styles.iconContainer}>
        <AiOutlineQrcode 
          className={styles.icon}
          size={90}
        />
        <h4 className={styles.callToAction}>Create a Code</h4>
        <div className={styles.callToActionText}>
          <p>Create a customized tips page with a single QR code.</p>
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
  )
}