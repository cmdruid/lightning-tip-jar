import { bech32 } from 'bech32';
import { webcrypto as crypto } from 'crypto'

export function randHex(size) {
  let randArr = crypto.getRandomValues(new Uint8Array(Number(size)));
  return [ ...randArr ].map(x => x.toString(16).padStart(2, '0')).join('');
}

export function encodeLnurl(string) {
  console.log(string)
  const words = bech32.toWords(Buffer.from(string, 'utf8'))
  console.log(words)
  return bech32.encode('lnurl', words, 3000)
}

export function decodeLnurl(string) {
  return
}