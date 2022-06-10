import { errorHandler } from "@/lib/error";

const hostURL = process.env.LNBITS_URL,
      hostKEY = process.env.LNBITS_KEY

export async function createWallet(walletName) {

  const endpoint = '/usermanager/api/v1/wallets'

  const body = {
    "user_id": hostKEY,
    "wallet_name": walletName,
    "admin_id": hostKEY
  }

  const opt = {
    method  : 'POST',
    headers : { "Content-Type": "application/json", "X-Api-Key": hostKEY },
    body    : JSON.stringify(body)
  };

  console.log(opt)

  return fetchEndpoint(endpoint, opt)
}

export async function createPayRequest(name, walletKey, payTemplate) {

  const { 
    memo = `Tipped ${name}`, 
    min  = 10, 
    max  = 999999999, 
    successMsg = `You tipped ${name}!`
  } = payTemplate || {}

  const endpoint = '/lnurlp/api/v1/links'

  const body = {
    "description": memo,
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
  
  console.log(opt)
  return fetchEndpoint(endpoint, opt)
}

export async function getPayRequest(invoiceKey, index) {
  const endpoint = '/lnurlp/api/v1/links/' + index

  const opt = {
    method  : 'GET',
    headers : { "Content-Type": "application/json", "X-Api-Key": invoiceKey }
  };

  console.log(opt)

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

export async function payInvoice(bolt11, invoiceKey) {

  const endpoint = '/api/v1/payments'

  const body = { "out": true, "bolt11": bolt11 }

  const opt = {
    method  : 'POST',
    headers : { "Content-Type": "application/json", "X-Api-Key": invoiceKey },
    body    : JSON.stringify(body)
  };
  

  return fetchEndpoint(endpoint, opt)
}

async function fetchEndpoint(endpoint, opt) {
  const url = `https://${hostURL + endpoint}`
  console.log(url)
  return fetch(url, opt)
    .then(res => res.json())
    .catch((req, res, err) => res.json(err))
}