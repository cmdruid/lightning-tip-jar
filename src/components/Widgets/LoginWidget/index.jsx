import { useRouter } from 'next/router'
import { useEffect } from 'react'

import styles        from './styles.module.css'
import { useLogin }  from '@/hooks/useAPI'
import Loading       from '@/components/Widgets/Loading'
import Error         from '@/components/Widgets/Error'
import QrCode        from '@/components/Widgets/QrCode'

export default function LoginWidget() {
  const { slug } = useRouter().query;
  const { data, isLoading, isError } = useLogin();

  console.log('slug', slug)

  switch (true) {
    case Boolean(isError):
      return <Error />
    case Boolean(isLoading):
      return <Loading />
    case Boolean(data && data.lnurl):
      return <LoginPrompt data={ data.lnurl }/>
    case Boolean(data && data.session):
      return <Redirect path={ slug }/>
    default:
      return <Loading />
  }
}

function LoginPrompt({ data }) {
  const title = 'Login using Lightning Wallet'
  return (
    <div className={styles.container}>
      <QrCode title={ title } data={ data }/>
    </div>
  )
}

function Redirect({ path }) {
  path = path ? path : ''

  useEffect(() => {
    if (window !== 'undefined') {
      window.location = `/${path}`
    }
  })
}
