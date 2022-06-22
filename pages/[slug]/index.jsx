import Loading      from '@/components/Widgets/Loading'
import Error        from '@/components/Widgets/Error'
import AccountView  from '@/components/Account/View'
import AccountClaim from '@/components/Account/Claim'
import { useAccountContext } from "@/context/AccountContext";

export default function View() {
  const { account, setAccount, isLoading, isError } = useAccountContext();

  return (
    <>
      { isError
        ? <Error />
        : isLoading
          ? <Loading />
          : account.slug
            ? <AccountView account={ account } />
            : account.isAvailable
              ? <AccountClaim setAccount={ setAccount } />
              : <Error />
      }
    </>
  )
}