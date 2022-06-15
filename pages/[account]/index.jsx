import Head        from 'next/head'
import useSWR      from 'swr'
import { fetcher } from '@/lib/utils'

import styles  from './styles.module.css'
import Loading from '@/components/Loading/index.js'
import Error   from '@/components/Error/index.js'
import LoginWidget    from '@/components/LoginWidget'
import MerchantTip    from '@/components/MerchantTip/index.js'
import NewAccountForm from '@/components/NewAccountForm'
import TempDisabled   from '@/components/TempDisabled'
import { useUserContext } from "@/context/UserContext";


export default function AccountPage() {
  const [ user, setUser ] = useUserContext();

  let slug;

  if (typeof window !== 'undefined') {
    const url = window.location.href.split('/');
    slug = url.pop();
  }

  const { data, error } = useSWR(`/api/account/loadAccount?slug=${slug}`, fetcher)

  return (
    <>
      <Head>
        <title>{`${slug} - sats4.tips`}</title>
      </Head>
      <section>
        {getPageContent(error, data, user, slug)}
      </section>
    </>
  )
}

function getPageContent(error, data, user, slug) {
  switch(true) {
    case Boolean(error):
      return <Error />
    case Boolean(!data):
      return <Loading />
    case Boolean(data && data.slug):
      return <MerchantTip account={data} />
    case Boolean(user && user.key):
      return <NewAccountForm slug={slug} user={user}/> // <TempDisabled />
    default:
      console.log(user)
      return <LoginWidget />
  }
}