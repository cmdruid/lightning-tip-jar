import { useRouter }  from 'next/router';
import { useEffect  } from 'react';
import { useBalance } from '@/hooks/useAPI'

import styles  from './styles.module.css'
import Error   from '@/components/Widgets/Error'
import Loading from '@/components/Widgets/Loading'

export default function ShowBalance({ balance, setBalance}) {
  const { slug } = useRouter().query;
  const { data, isLoading, isError } = useBalance(slug);

  useEffect(() => {
    if (data?.balance && balance !== data.balance) {
      setBalance(data.balance)
    }
  }, [ data?.balance, balance, setBalance ])
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Account Balance</h2>
      { isError
        ? <Error /> 
        : isLoading
          ? <Loading />
          : typeof(data?.balance) === 'number'
            ? <p className={styles.amount}>{balance} sats</p>
            : <Error />
      }
    </div>
  )
}