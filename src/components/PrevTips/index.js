import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './styles.module.css'
import React from 'react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function PrevTips() {
    const { data, error } = useSWR('/api/merch-txs/get-recent-txs', fetcher)
    if (error) return <div>failed to load!</div>
    if (!data) return <div>loading...</div>
    if (!data.payments) return <div>Unable to fetch Recent Tips</div>

    return (

        <div className={styles.prevtipsmdiv} >
            <h3 className={styles.priortipsh3}>Tips History!</h3>
            {data.payments.length === 0 ?
                <p className={styles.notips}>No Tips at the moment</p>
                : (
                    <InfiniteScroll
                        dataLength={data.payments.length} //This is important field to render the next data
                        loader={<h4>Loading...</h4>}
                        height={'35vh'}
                    >
                        {
                            data.payments.map((tip, idx) => (
                                <>
                                    <div className={styles.transInfo}>
                                        <p className={styles.transpinfo}><span className={styles.transpan}>Amount in sats</span> - ₿{tip.amount}</p>
                                        <p className={styles.transpinfo}><span className={styles.transpan}>Note</span> - {tip.msg}</p>
                                    </div>
                                </>
                            ))
                        }
                    </InfiniteScroll>
                )
            }
        </div>
    )
}

export default PrevTips