import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import LoginQrCode from '@/components/LoginQrCode'
import Landing from '@/components/Landing/index.js'
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
        <h1 className={styles.title}>
          Welcome to Just The Tip Jar
        </h1>

        <p className={styles.description}>
          Testing the API with our lightning node!
        </p>

        <LoginQrCode />
        <Landing />
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
