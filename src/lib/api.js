
const hostURL = process.env.LNBITS_URL,
      hostUID = process.env.LNBITS_UID,
      hostKEY = process.env.LNBITS_KEY


export async function createWallet(walletName) {

  const endpoint = '/usermanager/api/v1/wallets'

  const body = {
    "user_id": hostUID,
    "wallet_name": walletName,
    "admin_id": hostUID
  }

  const req = {
    method  : 'POST',
    headers : { "Content-Type": "application/json", "X-Api-Key": hostKEY },
    body    : JSON.stringify(body)
  };

  return fetchEndpoint(req, endpoint)
}

export async function listPayments() {

  const url = '2241c12358.d.voltageapp.io'
  const endpoint = 'api/v1/payments'
const admkey = '94d382e39e4048789004524275bb6ab1'

const response = await fetch(`https://${url}/${endpoint}`, opts)
  return
}

function fetchEndpoint(req, endpoint) {
  try {
    let res = await fetch(`https://${hostURL + endpoint}`, opts)
    return res.json()
  } catch(err) { res.setStatus(500).json(err) } 
}