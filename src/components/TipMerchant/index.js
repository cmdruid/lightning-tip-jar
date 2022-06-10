import styles from "./styles.module.css"
import PrevTips from '@/components/PrevTips/index.js'
import PlebQRCode from '@/components/PlebQrCode'
import PrevTipHeader from '@/components/PrevTipHeader'
import Footer from '@/components/Footer/index.js'
// import useSWR from 'swr'

function TipMe({userString}) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <PrevTipHeader
        title={userString.title}
        desc={userString.description}
        />
        <PlebQRCode />
        <PrevTips />
      </main>
      <Footer />
    </div>
  )
}

export default TipMe