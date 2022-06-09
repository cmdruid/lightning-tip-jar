import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import Landing from '@/components/Landing/index.js'
import Footer from '@/components/Footer/index.js'
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
        <Landing />
      </main>
      <Footer />
    </div>
  )
}
