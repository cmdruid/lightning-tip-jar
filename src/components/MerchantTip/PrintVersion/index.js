import React from 'react'
import styles from './styles.module.css'
import wallets from './wallets'


function PrintVersion({slug}) {
    console.log(wallets)
    return (
        <>
        <div className={styles.printurlsection}>
            <p>or visit:</p>
            <h4 className={styles.url}>{`https://sat4.tips/${slug}`}</h4>
        </div>

        <div className={styles.printwalletssection}>
            <p>Accepted Wallets:</p>
            
            {wallets.map((wallet, idx) => (
                <h4 key={idx} className={styles.walletcard}>
                    {wallet.displayName}
                    {/* TODO - add android/iphone icons */}
                </h4>
            ))}
            <h4 className={styles.walletcard}>Maybe Yours?</h4>
        </div>
        </>
    )
}

export default PrintVersion