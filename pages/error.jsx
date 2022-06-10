import Head from 'next/head'
import Footer from '@/components/Footer/index.js'
import Error from '@/components/Error/index.js'
import { FaBolt } from 'react-icons/fa'
import styles from '@/styles/index.module.css'

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
        <Error />
      </main>
      <Footer />
    </div>
  )
}
