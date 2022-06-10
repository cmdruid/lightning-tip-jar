import styles from './styles.module.css'
import Footer from '@/components/Footer/index.js'
import LogoHeader from '@/components/LogoHeader'

export default function TempDisabled({slug}) {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <LogoHeader />
                <h1 className={styles.title}>Signups are temporarily disabled. :-(</h1>
                <p className={styles.description}>This page has not yet been claimed, but we have disabled signups until withdraws are in place. We are implementing withdraws ASAP, then will re-open account creation!</p>
                <p>Existing tip pages will still work! If you have any issues, reach out to sats4tips@proton.me</p>
            </main>
            <Footer />
        </div>
    )
}