import styles from "./styles.module.css"
import Footer from '@/components/Footer/index.js'
import HomeButton     from '@/components/HomeButton/index.js'
import MerchantHeader from './MerchantHeader/index.js'
import PayUrlQr       from './PayUrlQr/index.js'
import RecentTipsBox  from './RecentTipsBox/index.js'


function MerchantTip({ account }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HomeButton />
        <MerchantHeader
          title={account.title}
          desc={account.description}
        />
        <PayUrlQr 
          payRequest={account.payRequest}
        />
        <RecentTipsBox
          invoiceKey={account.invoiceKey}
         />
      </main>
      <Footer />
    </div>
  )
}

export default MerchantTip