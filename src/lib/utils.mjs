import { bech32 } from 'bech32';

export async function fetcher(...args) {
  return fetch(...args).then(res => res.json())
}

export function encodeLnurl(string) {
  const words = bech32.toWords(Buffer.from(string, 'utf8'))
  return bech32.encode('lnurl', words, 3000)
}

export function decodeLnurl(string) {
  return
}
