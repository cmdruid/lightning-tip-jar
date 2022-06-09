import Head from 'next/head'
import styles from '../styles/Connect.module.css'
import Link from 'next/link'

export default function Connect() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Just The Tip Jar</title>
        <meta name="description" content="Just The Tip Jar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
            Connect
        </h1>
        <div>
            <br></br>
            QRCODE
            <br></br>
        </div>
        <p>Use your lightning wallet to login or signup</p>
        <Link href='/'>
            <button className={styles.homeButton}>Home</button>
        </Link>
      </main>
    </div>
  )
}
