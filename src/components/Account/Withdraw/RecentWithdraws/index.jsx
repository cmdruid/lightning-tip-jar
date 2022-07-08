import dayjs         from 'dayjs'
import relativeTime  from 'dayjs/plugin/relativeTime'
import { useRouter } from 'next/router'

import styles        from './styles.module.css'
import Loading       from '@/components/Widgets/Loading'
import Error         from '@/components/Widgets/Error'
import { useRecentWithdraws } from '@/hooks/useAPI'

dayjs.extend(relativeTime)

export default function RecentWithdraws() {
  const { slug } = useRouter().query;
  const { data, isLoading, isError } = useRecentWithdraws(slug)

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Recent Withdraws</h3>
      { isError 
        ? <Error />
        : isLoading 
          ? <Loading />
          : data.withdraws.length === 0 
            ? <p className={styles.nowithdraws}>No recent withdraws.</p>
            : <div className={styles.transactions}>
                {data.withdraws.map((item, idx) => <Transaction item={ item } key={ idx }/> )}
              </div>
      }
    </div>
  )
}

function Transaction({ item }) {
  const timeAgo = dayjs.unix(item.date).fromNow();
  return (
    <div className={styles.transaction}>
      <p className={styles.msg}>{item.msg}</p>
      <div className={styles.meta}>
        <div className={styles.metaData}>
          <p className={styles.amt}>{item.amt / 1000} sats ⚡</p>
          <p className={styles.fee}>-{item.fee / 1000} sat 🤌</p>
          <p className={styles.date}>{timeAgo}</p>
        </div>
      </div>
    </div>
  )
}
