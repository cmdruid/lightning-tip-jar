import { bech32 }       from 'bech32';
import { errorHandler } from '@/lib/error';

export function sanitize(string) {
  if (string instanceof String) {
    throw new TypeError('Must be a string!')
  }

  return String(string)
    .replace(/[^\w\- ]/g, '')
    .trim()
    .toLowerCase()
    .replace(' ', '-')
}

export function encodeLnurl(string) {
  const words = bech32.toWords(Buffer.from(string, 'utf8'))
  return bech32.encode('lnurl', words, 3000)
}

export function decodeLnurl(string) {
  return
}

export async function submitForm(e, endpoint, callback) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target))

  console.log(data)

  return fetch(endpoint, { 
    body: JSON.stringify(data),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(json => callback(json) )
    .catch(err => errorHandler(req, res, err))
}