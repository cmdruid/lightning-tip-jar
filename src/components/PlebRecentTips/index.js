import useSWR from 'swr'
import Image  from 'next/image'
import { useState } from 'react'
import useClipboard from "react-use-clipboard";

// import styles from './styles.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function PlebRecentTips() {

  const { data, error } = useSWR('/api/merch-txs/get-recent-txs', fetcher)
  
  if (error) return <div>failed to load!</div>
  if (!data) return <div>loading...</div>
  if (!data.payments) return <div>Unable to fetch Recent Tips</div>

  return (
    <div className="recent-tips-container" style={{"border": "solid 4px", "margin": "10px"}}>
    
      {
        data.payments.length === 0 ?
        <p>Joe Tips So far</p>
        : (
          data.payments.map((payment, index) => (
            <div className="payment-container" key={index}>
              <span>
              {payment.amount} | 
              {payment.msg} | 
              {payment.date} 
              </span>
            </div>
        ))
        )
        // data.payments.map( payment => {
        //   return (
        //     <div className="recent-tip-container">
        //       <div className="recent-tip-amount">
        //         {payment.amount}
        //       </div>
        //     )
        // })
      }
      
    </div>
  )
}