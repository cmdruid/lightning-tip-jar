import Loading      from '@/components/Widgets/Loading'
import Error        from '@/components/Widgets/Error'
import AccountEdit  from '@/components/Account/Edit'
import { useAccountContext } from "@/context/AccountContext";

export default function Edit() {
  const { account, setAccount, isLoading, isError } = useAccountContext();

  return (
    <>
      { isError
        ? <Error />
        : isLoading
          ? <Loading />
          : <AccountEdit account={ account } setAccount={ setAccount }/>
      }
    </>
  )
}