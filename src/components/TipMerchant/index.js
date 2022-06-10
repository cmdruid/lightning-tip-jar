import styles from "./styles.module.css"
import PrevTips from '@/components/PrevTips/index.js'
import PlebQRCode from '@/components/PlebQrCode'
import PrevTipHeader from '@/components/PrevTipHeader'
import Footer from '@/components/Footer/index.js'
// import useSWR from 'swr'

function TipMe({user}) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <PrevTipHeader
          title={user.title}
          desc={user.description}
        />
        {/* qrcode */}
        <PlebQRCode 
          payRequest={user.payRequest}
        />
        {/* recent tips */}
        <PrevTips
          invoiceKey={user.invoiceKey}
         />
      </main>
      <Footer />
    </div>
  )
}

export default TipMe