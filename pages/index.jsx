import Head from 'next/head'
import LogoHeader from '@/components/LogoHeader'
import Landing    from '@/components/Landing/index.js'
import { siteTitle } from '@/components/layout'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <LogoHeader />
        <Landing />
      </section>
    </>
  )
}
