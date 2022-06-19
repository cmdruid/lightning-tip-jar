import styles         from './styles.module.css'
import QrCode         from '@/components/Widgets/QrCode'
import AccountProfile from './AccountProfile'
import PrintVersion   from './PrintVersion'
import RecentTipsBox  from './RecentTipsBox'

export default function AccountView({ data, editMode }) {

  return (
    <div className={styles.container}>
      <AccountProfile
        editMode={ editMode }
        data={ data }
      />
      <QrCode data={ data.payRequest }/>
      <RecentTipsBox invoiceKey={ data.invoiceKey }/>
      <PrintVersion slug={data.slug}/>
    </div>
  )
}