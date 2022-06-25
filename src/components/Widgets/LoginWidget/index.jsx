import { useEffect } from 'react'
import { useRouter } from 'next/router'

import styles        from './styles.module.css'
import { useLogin }  from '@/hooks/useAPI'
import Loading       from '@/components/Widgets/Loading'
import Error         from '@/components/Widgets/Error'
import QrCode        from '@/components/Widgets/QrCode'
import { useUserContext } from '@/context/UserContext'

export default function LoginWidget({ redirect }) {
  const router   = useRouter();
  const [ user ] = useUserContext();
  const { data, isLoading, isError } = useLogin(redirect);

  useEffect(() => {
    if (user?.key) {
      router.push('/profile')
    }
  }, [ data, user?.key, router ])

  return (
    <>
      { isError
        ? <Error />
        : isLoading
          ? <Loading />
          : data && data.lnurl
            ? <LoginPrompt data={ data.lnurl }/>
            : <Loading />
      }
    </>
  )
}

function LoginPrompt({ data }) {
  const title = 'Login using Lightning Wallet'

  return (
    <div className={styles.container}>
      <QrCode title={ title } data={ data }/>
    </div>
  )
}
