// import qr from 'qrcode'
// import { webcrypto }  from 'crypto'
// import { getBalance } from '@/lib/api'
// import { UserModel }  from '@/models/user'
// import { randHex, encodeLnurl } from '@/lib/utils'
// import { withIronSession, Session } from "next-iron-session";

// const hostUrl   = process.env.HOST_URL
// const secretKey = process.env.SECRET_KEY || '';

// if (!secretKey) throw new Error('Key not configured!');

// export default withIronSession(createWithdraw, {
//   password: secretKey,
//   cookieName: 'withdraw-token',
//   ttl: 300,
//   cookieOptions: { 
//     secure: process.env.NODE_ENV === 'production'
//   }
// })

// async function createWithdraw(req, res) {

//   const { slug, key, action } = req.query

//   switch(action) {
//     case 'getparams':
//       let { ik, sk } = req.query
//       if (!(ik && sk && sk === sessionKey)) return res.status(404).end()
//       let balance = getBalance(ik)
//       if (!balance) return res.status(404).end()
//       return res.status(200).json(getParams(slug, balance, sk))
//     case 'payrequest':
//       let { pk, pr } = req.query
//       if (!(pk && pr && pk === sessionKey)) return res.status(404).end()
//       payInvoice(pk)
//       return payInvoice
//     default:
//       console.log(req.session)
//       const { invoiceKey, walletKey } = getUser(slug, key)
//       req.session.set('wallet', {acc, net});
//       await req.session.save();
      
//       if (!invoiceKey) return res.status(404).end()
//       sessionKey = webcrypto.randomUUID()
//       return res.status(200).json({ lnurl: getEncodedUrl(slug, sessionKey, invoiceKey) })
//   }

//   if (!(slug && key)) res.setStatus(403).end()

//   // fetch balance

  
  
  
// }

// // Fetches the collection, and checks if the slug exists.
// async function getAuthUser(slug, key) {
//   const users = await getCollection(UserModel),
//         user  = await users.findOne({ slug }),
//         withdrawKey = user?.withdrawKey
//   if (withdrawKey && withdrawKey === key) return user
//   return null
// }

// function getEncodedUrl(slug, sessionKey, invoiceKey) {
//   const callback =`https://${hostUrl}/api/withdraw/getwithdraw?slug=${slug}&pk=${sessionKey}&ik=${invoiceKey}&action=getparams`
//   return encodeLnurl(callback)
// }

// function getParams(slug, balance, sessionKey) {
//   return {
//     "tag": "withdrawRequest",
//     "callback": `https://${hostUrl}/api/withdraw/getwithdraw?sk=${sessionKey}`,
//     "k1": randHex(32),
//     "defaultDescription": `Withdraw for ${slug}`,
//     "minWithdrawable": 100, // Min amount (in millisatoshis) the user can withdraw from LN SERVICE, or 0
//     "maxWithdrawable": balance
//   }
// }
