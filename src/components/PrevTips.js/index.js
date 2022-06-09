import Head from 'next/head'
import Image from 'next/image'
import styles from './styles.module.css'
import React from 'react'

function index() {
    return (
        <div className={styles.main}>
            <Head>
                <title></title>
            </Head>
            <main className={styles.main}>
                <div>
                    <h1>Resturant Title</h1>
                    <p>This is the resurant info the will be in the desc</p>
                </div>

                <div>
                    {/* qr code ln */}
                    
                </div>

                {/* tips */}

                <div>
                    <h3>Prior Tips</h3>
                    <div>
                        <span>Amount - 100 sats</span>
                        <span>Note - this is a tipsß</span>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default index