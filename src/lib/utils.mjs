import { webcrypto as crypto } from 'crypto'

export function randHex(size) {
  let randArr = crypto.getRandomValues(new Uint8Array(Number(size)/2));
  return [ ...randArr ].map(x => x.toString(16).padStart(2, '0')).join('');
}