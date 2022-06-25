import styles         from './styles.module.css'
import QrCode         from '@/components/Widgets/QrCode'
import AccountProfile from './AccountProfile'
import PrintVersion   from './PrintVersion'
import RecentPayments from './RecentPayments'

export default function AccountView({ account }) {
  const { slug, payRequest, info, viewKey } = account;

  return (
    <div className={styles.container}>
      <AccountProfile info={ info } />
      <QrCode data={ payRequest } />
      <RecentPayments viewKey={ viewKey }/>
      <PrintVersion slug={ slug }/>
    </div>
  )
}