export default async function login(req, res) {
  console.log(req)
  res.status(200).json({response: "ok!"})
}

// LNURL Authentication Spec
// https://github.com/fiatjaf/lnurl-rfc/blob/luds/04.md

// https://site.com?tag=login&k1=hex(32 bytes of random data)&action=login
// <LNURL_hostname_and_path>?<LNURL_existing_query_parameters>&sig=<hex(sign(hexToBytes(k1), linkingPrivKey))>&key=<hex(linkingKey)>