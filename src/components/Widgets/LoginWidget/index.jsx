import { useRouter } from 'next/router'

import styles        from './styles.module.css'
import { useLogin }  from '@/hooks/useAPI'
import Loading       from '@/components/Widgets/Loading'
import Error         from '@/components/Widgets/Error'
import QrCode        from '@/components/Widgets/QrCode'

export default function LoginWidget({ user }) {
  const router = useRouter();
  const { source } = router.query || ''
  const { data, isLoading, isError } = useLogin();

  switch (true) {
  case Boolean(source && user?.key):
    router.push(`/${source}`)
    return
  case Boolean(data && data.lnurl):
    return <QrCode data={data.lnurl}/>
  case Boolean(isError):
    return <Error />
  default:
    return <Loading />
  }
}
