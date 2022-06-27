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

  const { 
    bgColor1, bgColor2, fgColor1, fgColor2, fontColor 
  } = account?.styles || {};

  return (
    <div 
      className={styles.container}
      // style={{
      //   "--bgColor1"  : (slug && bgColor1) ? bgColor1 : '',
      //   "--bgColor2"  : (slug && bgColor2) ? bgColor2 : '',
      //   "--fgColor1"  : (slug && fgColor1) ? fgColor1 : '',
      //   "--fgColor2"  : (slug && fgColor2) ? fgColor2 : '',
      //   "--fontColor" : (slug && fontColor) ? fontColor : ''
      //   }}
    >

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