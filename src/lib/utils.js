import { bech32 } from 'bech32';
import { useRouter } from 'next/router';

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
  return bech32.encode('lnurl', words, Number.MAX_SAFE_INTEGER)
}

export function decodeLnurl(string) {
  const words = bech32.toWords(Buffer.from(string, 'utf8'))
  return bech32.decode('lnurl', words, Number.MAX_SAFE_INTEGER)
}

export async function submitData(data, endpoint, callback) {
  try {
    const res = await fetch(endpoint, { 
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!res.ok) throw new Error(res.status)

    const json = await res.json()
    return callback(null, json)
    
  } catch(err) { callback(err, data) }
}