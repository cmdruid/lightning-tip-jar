import { randHex, encodeLnurl } from '@/lib/utils'
import { webcrypto } from 'crypto'
import qr from 'qrcode'

import { getBalance } from '@/lib/api'

const hostUrl = process.env.HOST_URL

let sessionKey;

export default async function createWithdraw(req, res) {

  const { slug, key, action } = req.query

  switch(action) {
    case 'getparams':
      let { ik, sk } = req.query
      if (!(ik && sk && sk === sessionKey)) return res.status(404).end()
      let balance = getBalance(ik)
      if (!balance) return res.status(404).end()
      return res.status(200).json(getParams(slug, balance, sk))
    case 'payrequest':
      let { pk, pr } = req.query
      if (!(pk && pr && pk === sessionKey)) return res.status(404).end()
      
      return
    default:
      const { invoiceKey } = getUser(slug, key)
      if (!invoiceKey) return res.status(404).end()
      sessionKey = webcrypto.randomUUID()
      return res.status(200).json({ lnurl: getEncodedUrl(slug, sessionKey, invoiceKey) })
  }

  if (!(slug && key)) res.setStatus(403).end()

  // fetch balance

  
  
  
}

function getEncodedUrl(slug, sessionKey, invoiceKey) {
  const callback =`https://${hostUrl}/api/withdraw/getwithdraw?slug=${slug}&pk=${sessionKey}&ik=${invoiceKey}&action=getparams`
  return encodeLnurl(callback)
}

function getParams(slug, balance, sessionKey) {
  return {
    "tag": "withdrawRequest",
    "callback": `https://${hostUrl}/api/withdraw/getwithdraw?sk=${sessionKey}`,
    "k1": randHex(32),
    "defaultDescription": `Withdraw for ${slug}`,
    "minWithdrawable": 100, // Min amount (in millisatoshis) the user can withdraw from LN SERVICE, or 0
    "maxWithdrawable": balance
  }
}



  
  

export default async function login(req, res) {
  const challenge = getAuthStr(randHex(32))
  const lnurl = encodeLnurl(challenge)
  console.log(lnurl)
  const qrimage = await qr.toDataURL(lnurl)
  res.status(200).json({image: qrimage})
}





  