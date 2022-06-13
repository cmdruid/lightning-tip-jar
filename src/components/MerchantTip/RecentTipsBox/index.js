import styles from './styles.module.css'
import React from 'react'
import useSWR from 'swr'
import TimeAgo from 'react-timeago'
import moment from 'moment'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function RecentTipsBox({ invoiceKey }) {

    const { data, error } = useSWR(`/api/user/getTransactions?invoiceKey=${invoiceKey}`, fetcher, { refreshInterval: 5000 })

    const unixToString = (date) => moment.unix(date);

    return (
        <div className={styles.prevtipsmdiv}>
            <h3 className={styles.priortipsh3}>Recent Tips</h3>
            { !data
                ? <p className={styles.notips}>Loading</p>
                : data.payments.length === 0 ?
                    <p className={styles.notips}>No Tips at the moment</p>
                    : (
                        data.payments.map((tip, idx) => (
                            <>
                                <div id={idx} className={styles.transInfo}>
                                    <p className={styles.transpinfo}><span className={styles.transpan}>Amount in sats</span> - ⚡{tip.amount / 1000}</p>
                                    <p className={styles.transpinfo}><span className={styles.transpan}>Note</span> - {tip.msg}</p>
                                    {tip.date && (
                                        
                                        <p className={styles.transpinfo}><span className={styles.transpan}>Date</span> - <TimeAgo date={unixToString(tip.date)} /></p>
                                    )}
                                </div>
                            </>
                        ))   
                )
            }
        </div>
    )
}

export default RecentTipsBox