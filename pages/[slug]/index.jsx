import Head          from 'next/head'
import useSWR        from 'swr'
import { useRouter } from 'next/router'
import { fetcher }   from '@/lib/utils'

import styles  from './styles.module.css'
import Loading from '@/components/Loading/index.js'
import Error   from '@/components/Error/index.js'
import MerchantTip    from '@/components/MerchantTip/index.js'
import NewAccountForm from '@/components/NewAccountForm'
import TempDisabled   from '@/components/TempDisabled'
import { useUserContext } from "@/context/UserContext";

export default function AccountPage() {
  const [ user, setUser ] = useUserContext();

  return (
    <div>
      {GetPageContent(user)}
    </div>
  )
}

function GetPageContent({ user }) {
  const router = useRouter();
  const { slug } = router.query
  const { data, error } = useSWR(`/api/account/loadAccount?slug=${slug}`, fetcher)

  switch(true) {
    case Boolean(error):
      return <Error />
    case Boolean(data && data.slug):
      return <MerchantTip account={data} />
    case Boolean(data && !data.slug):
      return <NewAccountForm slug={slug} user={ user }/> // <TempDisabled />
    default:
      return <Loading />
  }
}