/** components/layout.js
 *  This file serves as the default boilerplate for each page.
 *  HTML for other pages will be wrapped within this layout component.
 */

import Head    from 'next/head'
import TopBar  from './TopBar'
import FootBar from './FootBar'
import styles  from './layout.module.css'

export const siteTitle = 'sats4tips'
 
export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Your own personalized space for collecting tips in Bitcoin."
        />
        <title>{siteTitle}</title>
      </Head>

      <header className={styles.header}>
        <TopBar />
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
         <FootBar />
      </footer>

    </div>
  )
}