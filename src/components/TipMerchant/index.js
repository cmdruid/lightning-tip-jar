import React from 'react'
import PrevTips from '@/components/PrevTips/index.js'
//import PlebQRCode from '@/components/PlebQrCode'
import PrevTipHeader from '@/components/PrevTipHeader'
// import useSWR from 'swr'

function TipMe({userString}) {
console.log(userString)

  return (
    <>
      <main className="main-tip-me-container">
        {/* header prop */}
        <PrevTipHeader
        title={"Shinners"}
        desc={"Hello we are shinenrs a local bar in austin who likes buying that corn, please support us with some corn!"}
         />
        {/* qrcode */}
        <PlebQRCode />
        {/* recent tips */}
        <PrevTips
         />
      </main>
    </>

  )
}

export default TipMe