import styles         from './styles.module.css'
import MerchantHeader from './MerchantHeader'
import QrCode         from '@/components/QrCode'
import PrintVersion   from './PrintVersion'
import RecentTipsBox  from './RecentTipsBox'

export default function MerchantTip({ account }) {

  return (
    <div className={styles.container}>
      <MerchantHeader
        title={account.title}
        desc={account.description}
      />
      <QrCode data={ account.payRequest }/>
      <RecentTipsBox invoiceKey={ account.invoiceKey }/>
      <PrintVersion slug={account.slug}/>
    </div>
  )
}