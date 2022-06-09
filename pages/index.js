import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import Landing from '@/components/Landing/index.js'
import Footer from '@/components/Footer/index.js'
import { FaBolt } from 'react-icons/fa'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sats4Tips</title>
        <meta name="description" content="Just The Tip Jar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <FaBolt size={100} />
        <h1 className={styles.title}>
          Sats4Tips
        </h1>
        <Landing />
      </main>
      <Footer />
    </div>
  )
}
