import Head               from 'next/head'
import useSWR             from 'swr'
import { useRouter }      from 'next/router';
import { fetcher }        from '@/lib/utils'

import styles  from '@/styles/index.module.css'
import QrCode  from '@/components/QrCode'
import { siteTitle } from '@/components/layout'

export default function WithdrawPage() {
  const router            = useRouter(),
        { account }       = router.query,
        { data, error }   = useSWR(`/api/withdraw/create?slug=${account}`, fetcher);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <main>
          <p>Withdraw Module</p>
          {data && data.lnurl && <QrCode data={ data.lnurl }/> }
        </main>
      </section>
    </>
  )
}