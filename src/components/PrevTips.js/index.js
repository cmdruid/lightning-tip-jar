import Head from 'next/head'
import Image from 'next/image'
import styles from './styles.module.css'
import React from 'react'
import PlebQRCode from '@/components/PlebQRCode'

function index() {
    return (
        <div className={styles.main}>
            <Head>
                <title></title>
            </Head>
            <main>
                <div className={styles.divtext}>
                    <h1 className={styles.tipeh1}>Resturant Title</h1>
                    <p>This is the resurant info the will be in the desc</p>
                </div>

                <div className={styles.qrcode}>
                    <PlebQRCode />
                </div>

                <div className={styles.prevtipsmdiv}>
                    <h3 className={styles.priortipsh3}>Prior Tips</h3>
                    <div className={styles.transInfo}>
                        <p className={styles.transpinfo}><span className={styles.transpan}>Amount</span> - 100 sats</p>
                        <p className={styles.transpinfo}><span className={styles.transpan}>Date</span> - 100 sats</p>
                        <p className={styles.transpinfo}><span className={styles.transpan}>Note</span> - 100 sats</p>
                    </div>
                    <div className={styles.transInfo}>
                        <p className={styles.transpinfo}><span className={styles.transpan}>Amount</span> - 100 sats</p>
                        <p className={styles.transpinfo}><span className={styles.transpan}>Amount</span> - 100 sats</p>
                        <p className={styles.transpinfo}><span className={styles.transpan}>Amount</span> - 100 sats</p>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default index