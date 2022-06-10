
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

  const opt = {
    method  : 'POST',
    headers : { "Content-Type": "application/json", "X-Api-Key": hostKEY },
    body    : JSON.stringify(body)
  };

  return fetchEndpoint(endpoint, opt)
}

export async function createPayRequest(name, walletKey, payTemplate) {

  const { 
    desc = `Tipped ${name}`, 
    min  = 100, 
    max  = 21e15, 
    successMsg = `You tipped ${name}!`
  } = payTemplate || {}

  const endpoint = '/lnurlp/api/v1/links'

  const body = {
    "description": desc,
    "max": max,
    "min": min,
    "comment_chars": 120,
    "success_text": successMsg
  }

  const opt = {
    method  : 'POST',
    headers : { "Content-Type": "application/json", "X-Api-Key": walletKey },
    body    : JSON.stringify(body)
  };
  

  return fetchEndpoint(endpoint, opt)
}

export async function getPayRequest(invoiceKey, index) {
  const endpoint = '/lnurlp/api/v1/links/' + index

  const opt = {
    method  : 'GET',
    headers : { "Content-Type": "application/json", "X-Api-Key": invoiceKey }
  };

  return fetchEndpoint(endpoint, opt)
}

export async function listPayments(walletKey) {

  const endpoint = '/api/v1/payments'

  const opt = {
    method  : 'GET',
    headers : { "Content-Type": "application/json", "X-Api-Key": walletKey }
  };

  return fetchEndpoint(endpoint, opt)
}

export async function getBalance(invoiceKey) {

  const endpoint = '/api/v1/wallet'

  const opt = {
    method  : 'GET',
    headers : { "Content-Type": "application/json", "X-Api-Key": invoiceKey }
  };

  return fetchEndpoint(endpoint, opt)
}

export async function payInvoice(bolt11, walletKey) {

  const endpoint = '/api/v1/payments'

  const body = { "out": true, "bolt11": bolt11 }

  const opt = {
    method  : 'POST',
    headers : { "Content-Type": "application/json", "X-Api-Key": walletKey },
    body    : JSON.stringify(body)
  };
  

  return fetchEndpoint(endpoint, opt)
}

async function fetchEndpoint(endpoint, opt) {
  return fetch(`https://${hostURL + endpoint}`, opt)
    .then(res => res.json())
    .catch((err, res) => res.json(err))
}