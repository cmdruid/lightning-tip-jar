import { randHex } from '@/lib/utils'
import qr from 'qrcode'

export default async function getinfo(req, res) {
  const qrimage = await qr.toDataURL(randHex(32))
  res.status(200).json({image: qrimage})
}

// LNURL Authentication Spec
// https://github.com/fiatjaf/lnurl-rfc/blob/luds/04.md

// https://site.com?tag=login&k1=hex(32 bytes of random data)&action=login
// <LNURL_hostname_and_path>?<LNURL_existing_query_parameters>&sig=<hex(sign(hexToBytes(k1), linkingPrivKey))>&key=<hex(linkingKey)>