/** components/layout.js
 *  This file serves as the default boilerplate for each page.
 *  HTML for other pages will be wrapped within this layout component.
 */

import Head   from 'next/head'
import Image  from 'next/image'
import Link   from 'next/link'
import Footer from './Footer'
import styles from './layout.module.css'

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
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className
              height={144}
              width={144}
              alt='name'
            />
            <h1 className>name</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className
                  height={108}
                  width={108}
                  alt='name'
                />
              </a>
            </Link>
            <h2 className>
              <Link href="/">
                <a className>name</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <Footer />
    </div>
  )
}