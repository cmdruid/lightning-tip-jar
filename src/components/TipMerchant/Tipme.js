import React from 'react'
// import PrevTips from '@/components/PrevTips.js/index'
import useSWR from 'swr'
import PlebQRCode from '@/components/PlebQrCode'
import PrevTipHeader from '@/components/PrevTipHeader'
function tipme() {


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
        {/* <PrevTips
         /> */}
      </main>
    </>

  )
}

export default tipme