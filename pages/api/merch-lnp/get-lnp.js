// import { randHex } from '@/lib/utils'
import qr from 'qrcode'

const hostUrl = process.env.VERCEL_URL;
console.log(hostUrl)
const getAuthStr = k1 => `https://${hostUrl}/auth/login?tag=login&k1=${k1}&action=login`

export default async function foo(req, res) {
//   const url = "https://www.btcplusplus.dev/"
  const lnUrl = "LNURL1DP68GURN8GHJ7V3JXSCKXVFJXV6NSTNY9EMX7MR5V9NK2CTSWQHXJME0D3H82UNVWQHKZURF9AMRZTMVDE6HYMP0XSEEUKDK"
  const qrimage = await qr.toDataURL(lnUrl)
  res.status(200).json({
      image: qrimage,
      lnUrl: lnUrl,
    })
}

// LNURL Authentication Spec
// https://github.com/fiatjaf/lnurl-rfc/blob/luds/04.md

// https://site.com?tag=login&k1=hex(32 bytes of random data)&action=login
// <LNURL_hostname_and_path>?<LNURL_existing_query_parameters>&sig=<hex(sign(hexToBytes(k1), linkingPrivKey))>&key=<hex(linkingKey)>