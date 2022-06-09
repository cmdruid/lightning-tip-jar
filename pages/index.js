import Head from 'next/head'
import styles from '../styles/Home.module.css'
import OfferCode from 'components/OfferCode/index.js'
import PaymentStream from 'components/PaymentStream/index.js'
import Landing from 'components/Landing/index.js'
import { FaGithub } from 'react-icons/fa'

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
          href="https://github.com/cmdruid/lightning-tip-jar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Powered by plebs</p> <FaGithub size={25}/>
        </a>
      </footer>
    </div>
  )
}
