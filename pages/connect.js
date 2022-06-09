import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Connect() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Just The Tip Jar</title>
        <meta name="description" content="Just The Tip Jar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          Hello
      </main>
    </div>
  )
}
