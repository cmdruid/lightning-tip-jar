import Head from 'next/head'
import styles from '../styles/Home.module.css'

import OfferCode from 'components/OfferCode/index.js'
import PaymentStream from 'components/PaymentStream/index.js'
import Landing from 'components/Landing/index.js'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Just The Tip Jar</title>
        <meta name="description" content="Just The Tip Jar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Landing />
        <OfferCode />
        <PaymentStream />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by plebs
        </a>
      </footer>
    </div>
  )
}
