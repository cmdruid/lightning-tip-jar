import Head from 'next/head'
import LogoHeader from '@/components/LogoHeader'
import Landing from '@/components/Landing/index.js'
import Footer from '@/components/Footer/index.js'
import styles from '@/styles/index.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sats4Tips</title>
        <meta name="description" content="Just The Tip Jar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <LogoHeader />
        <Landing />
      </main>
      <Footer />
    </div>
  )
}
