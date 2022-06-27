import { useRouter } from 'next/router'
import dayjs         from 'dayjs'
import relativeTime  from 'dayjs/plugin/relativeTime'
import { FaTwitter } from 'react-icons/fa'

import styles  from './styles.module.css'
import Loading from '@/components/Widgets/Loading'
import Error   from '@/components/Widgets/Error'
import { useRecentPayments } from '@/hooks/useAPI'

dayjs.extend(relativeTime)

export default function RecentPayments({ viewKey }) {
  const { data, error } = useRecentPayments(viewKey)

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Recent Tips</h3>
      { error && <Error /> }
      { !data
        ? <Loading />
        : data.payments.length === 0 
          ? <p className={styles.notips}>No Tips at the moment</p>
          : <div className={styles.transactions}>
              {data.payments.map((tip, idx) => <Transaction tip={ tip } key={ idx }/> )}
            </div>
      }
    </div>
  )
}

function Transaction({ tip }) {
  const timeAgo = dayjs.unix(tip.date).fromNow();
  return (
    <div className={styles.transaction}>
      { tip.msg 
        ?  <TipMessage msg={ tip.msg } />
        :  <p className={styles.nomsg}>Anonymous tip</p> 
      }
      <div className={styles.meta}>
        <div className={styles.metaData}>
          <p className={styles.amt}>{tip.amt / 1000} sats ⚡</p>
          <p className={styles.date}>{timeAgo}</p>
        </div>
      </div>
    </div>
  )
}

function TipMessage({ msg }) {
  return (
    <div className={styles.msgBox}>
      <p className={styles.msg}>{msg}</p>
      <TweetMessage msg={ msg }/>
    </div>
  )
}

function TweetMessage({ msg }) {
  const { query } = useRouter()
  const tweetMsg  = `${msg} %23${query.slug}%0A%0Asats4.tips/${query.slug}`
  const tweetHref = `https://twitter.com/intent/tweet?text=${tweetMsg}`
  return (
    <a 
      target="_blank"
      rel="noopener noreferrer" 
      href={tweetHref} 
      className={styles.twitterLink}
    >
      <FaTwitter size={25} className={styles.twitterIcon}/>
    </a>
  )
}