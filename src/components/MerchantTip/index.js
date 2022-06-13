import styles from "./styles.module.css"
import Footer from '@/components/Footer/index.js'
import HomeButton from '@/components/HomeButton/index.js'
import MerchantHeader from './MerchantHeader/index.js'
import PayUrlQr from './PayUrlQr/index.js'
import RecentTipsBox from './RecentTipsBox/index.js'


function MerchantTip({user}) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HomeButton />
        <MerchantHeader
          title={user.title}
          desc={user.description}
        />
        <PayUrlQr 
          payRequest={user.payRequest}
        />
        <RecentTipsBox
          invoiceKey={user.invoiceKey}
         />
      </main>
      <Footer />
    </div>
  )
}

export default MerchantTip