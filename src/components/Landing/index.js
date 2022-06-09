import styles from './styles.module.css'
import Head from 'next/head'
import { FaBitcoin, FaNetworkWired } from 'react-icons/fa'
import bitcoinGiving from '@/public/bitcoingiving.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Landing() {
    return (
      <div>
        <Head>
          <title>Just The Tip Jar</title>
          <meta name="description" content="Just The Tip Jar" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.landing}>
          <h1 className={styles.title}>
            Welcome to Just The Tip Jar
          </h1>
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
          <Link href='/connect'>
            <button className={styles.connectButton}>Connect</button>
          </Link>
        </main>
      </div>
    )
  }