import { webcrypto as crypto } from 'crypto';

const IV_LENGTH  = 16,  // Length of init vector.
      SECRET_KEY = process.env.SECRET_KEY;

let cryptoKey;  // Cached CryptoKey object.

export async function encrypt(plaintext) {
  /* Encrypt a string using the server's encryption key. */
  const ec  = new TextEncoder(),
        iv  = crypto.getRandomValues(new Uint8Array(IV_LENGTH)),
        key = await getKey();

  const ciphertext = await crypto.subtle.encrypt({
    name: 'AES-CBC',
    iv,
  }, key, ec.encode(plaintext));

  const dataArr = concatArray(iv, new Uint8Array(ciphertext))

  return Buffer.from(dataArr).toString('base64url')
}

export async function decrypt(encodedtext) {
  /* Decrypt a string using the server's encryption key. */
  const dec  = new TextDecoder(),
        key  = await getKey(),
        data = new Uint8Array(Buffer.from(encodedtext, 'base64url'));
  const { arr1: iv, arr2: cipherArray } = splitArray(data, IV_LENGTH)

 const plaintext = await crypto.subtle.decrypt({
    name: 'AES-CBC',
    iv,
  }, key, cipherArray);

  return dec.decode(plaintext);
}

async function getKey(base64Str = SECRET_KEY) {
  /* Import a CryptoKey object, or fetch from cache. */
  if (!cryptoKey) {
    if (base64Str) { 
      cryptoKey = await importKey(base64Str)
    } else { 
      const errMsg  = 'SECRET_KEY environment variable not set! Here is a random key to use: ',
            randKey = await exportKey();
      throw errMsg + randKey
    }
  }
  return cryptoKey;
}

async function importKey(base64Str) {
  /* Import a key from raw format, encoded in base64url. */
  const opt = { name: 'AES-CBC' },
        use = [ 'encrypt', 'decrypt' ],
        arr = Buffer.from(base64Str, 'base64url');
  return crypto.subtle.importKey('raw', arr, opt, true, use)
}

async function generateKey(length = 256) {
  /* Nodejs boilerplate for generating an AES key. */
  const key = await crypto.subtle.generateKey({
    name: 'AES-CBC',
    length
  }, true, [ 'encrypt', 'decrypt' ])
  return key;
}

async function exportKey() {
  /* Export a key to raw format, encoded in base64url. */
  const key = await generateKey(),
        exp = await crypto.subtle.exportKey('raw', key);
  return Buffer.from(exp).toString('base64url')
}

function concatArray(arr1, arr2) {
  /* Concatenate two arrays. */
  let newArr = new Uint8Array(arr1.byteLength + arr2.byteLength);
  newArr.set(arr1, 0);
  newArr.set(arr2, arr1.byteLength);
  return newArr
}

function splitArray(arr, index) {
  /* Split an array in two. */
  let arr1 = arr.slice(0, index),
      arr2 = arr.slice(index, arr.byteLength + 1)
  return { arr1, arr2 }
}