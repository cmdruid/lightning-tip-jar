import styles from "./styles.module.css"
import PrevTips from '@/components/PrevTips/index.js'
import PlebQRCode from '@/components/PlebQrCode'
import PrevTipHeader from '@/components/PrevTipHeader'
import Footer from '@/components/Footer/index.js'
import HomeButton from '@/components/HomeButton/index.js'
// import useSWR from 'swr'

function TipMerchant({user}) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HomeButton />
        <PrevTipHeader
          title={user.title}
          desc={user.description}
        />
        <PlebQRCode 
          payRequest={user.payRequest}
        />
        <PrevTips
          invoiceKey={user.invoiceKey}
         />
      </main>
      <Footer />
    </div>
  )
}

export default TipMerchant