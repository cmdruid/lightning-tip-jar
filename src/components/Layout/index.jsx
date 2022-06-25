/** components/layout.js
 *  This file serves as the default boilerplate for each page.
 *  HTML for other pages will be wrapped within this layout component.
 */

import Head from 'next/head'
import { useRouter } from 'next/router'

import styles  from './layout.module.css'
import TopBar  from '@/components/Layout/TopBar'
import FootBar from '@/components/Layout/FootBar'
import { useAccountContext } from '@/context/AccountContext'

export const siteTitle = 'sats4tips'
 
export default function Layout({ children, home }) {
  const { slug } = useRouter().query
  const { account } = useAccountContext();
  // const bgColor = account?.styles?.bgColor;

  // console.log(account?.styles, bgColor)

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

      <main 
        className={styles.main}
        // style={{backgroundColor: (slug && bgColor) ? bgColor : ''}}
      >
        {children}
      </main>

      <footer className={styles.footer}>
         <FootBar />
      </footer>

    </div>
  )
}