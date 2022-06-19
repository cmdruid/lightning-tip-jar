import { useRouter }      from 'next/router'
import { useEffect }      from 'react'
import { useAccount }     from '@/hooks/useAPI'
import Loading            from '@/components/Widgets/Loading'
import Error              from '@/components/Widgets/Error'
import AccountView        from '@/components/Account/View'
import AccountClaim       from '@/components/Account/Claim'
import AccountWithdraw    from '@/components/Account/Withdraw'
import { useUserContext }    from '@/context/UserContext'
import { useAccountContext } from "@/context/AccountContext";

export default function SlugRouter() {
  const router   = useRouter();
  const [ state ] = useUserContext();
  const { data: user } = state || {}
  const [ account, setAccount ]   = useAccountContext();
  const [ slug, page, ...params ] = router.query.slug || []

  const isPreloaded = (slug && account.slug && slug === account.slug)
  console.log('preload', isPreloaded)
  const { data, isLoading, isError } = useAccount(slug, !isPreloaded);

  if (data && !isPreloaded) setAccount(data)

  console.log('data', account)

  switch (true) {
     case Boolean(account.slug):
      return <AccountPages data={ account } page={ page } params={ params }/>
    case Boolean(data && !data.slug):
      return <AccountClaim slug={ slug } user={ user }/>
    case Boolean(isError):
      return <Error />
    case Boolean(isLoading):
      return <Loading />
    default:
      return <Loading />

  }
}

function AccountPages({ data, page, params }) {
  
  switch(page) {
    case 'edit':
      return <AccountView editMode data={ data }/>
    case 'withdraw':
      return <AccountWithdraw data={ data }/>
    default:
      return <AccountView data={ data }/>
  }
}
