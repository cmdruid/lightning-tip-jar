import { randHex, encodeLnurl } from '@/lib/utils'
import qr from 'qrcode'

const hostUrl = 'sats4tips-cmdruid.vercel.app'

export default async function createWithdraw(req, res) {

  const { slug, key } = req.query

  if (!(slug && key)) res.setStatus(403).end()

  // fetch balance

  const getCallback =`https://${hostUrl}/api/withdraw/getinvoice?slug=${slug}&key=${key}`
  
  res.json({
    "tag": "withdrawRequest",
    "callback": `https://${hostUrl}/api/withdraw/payinvoice`,
    "k1": randHex(32),
    "defaultDescription": `Withdraw for ${slug}`,
    "minWithdrawable": 100, // Min amount (in millisatoshis) the user can withdraw from LN SERVICE, or 0
    "maxWithdrawable": number
  })
}



  
  

export default async function login(req, res) {
  const challenge = getAuthStr(randHex(32))
  const lnurl = encodeLnurl(challenge)
  console.log(lnurl)
  const qrimage = await qr.toDataURL(lnurl)
  res.status(200).json({image: qrimage})
}





  