import { bech32 } from 'bech32';

export function encodeLnurl(string) {
  const words = bech32.toWords(Buffer.from(string, 'utf8'))
  return bech32.encode('lnurl', words, Number.MAX_SAFE_INTEGER)
}

export function decodeLnurl(string) {
  const words = bech32.toWords(Buffer.from(string, 'utf8'))
  return bech32.decode('lnurl', words, Number.MAX_SAFE_INTEGER)
}

export function convertToSlug(str) {
  if (typeof(str) !== 'string') {
    return false;
  }
  return str
    .replace(/[^\w\s\-]/g, '')
    .trim()
    .replace(/[\s]/g, '-')
    .slice(0, 48)
    .toLowerCase()
}

export function parseFormData(formEntries) {
  const data = new Object();
  const formData = Object.fromEntries(new FormData(formEntries));

  Object.entries(formData).forEach(([ k,v ]) => {
    if (v) {
      if (k.includes('.')) {
        let keys = k.split('.', 2);
        data[keys[0]] = { ...data[keys[0]], [keys[1]]: v }
      } else { data[k] = v }
    }
  })

  return data;
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