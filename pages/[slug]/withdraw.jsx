import Loading from '@/components/Widgets/Loading'
import Error   from '@/components/Widgets/Error'
import AccountWithdraw       from '@/components/Account/Withdraw'
import { useAccountContext } from "@/context/AccountContext";

export default function Edit() {
  const { account, setAccount, isLoading, isError } = useAccountContext();

  return (
    <>
      { isError
        ? <Error />
        : isLoading
          ? <Loading />
          : <AccountWithdraw account={ account } setAccount={ setAccount }/>
      }
    </>
  )
}