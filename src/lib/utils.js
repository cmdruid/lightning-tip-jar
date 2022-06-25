import { bech32 } from 'bech32';

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

export function arrayOrString(data) {
  if (!data) return ''
  if (Array.isArray(data)) return data[0]
  if (typeof(data) === 'string') return data
  throw new Error('Unexpected data type:', typeof(data))
}

export async function submitData(data, endpoint, callback) {
  try {
    const res = await fetch(endpoint, { 
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!res.ok) {
      return callback('Invalid input!')
    }

    const json = await res.json()
    if (json.err) return callback(json.err)

    return callback(null, json)
  }

  catch(err) { 
    console.error(err)
    return callback('Something went wrong!')
  }
}