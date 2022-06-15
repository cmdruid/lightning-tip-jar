/**
 * Receive a claim for withdraw that contains an encrypted json object.
 * The decrypted object should contain the user key, plus the account name 
 * and timestamp. All information should be verified before processing the
 * withdraw request. A k1 challenge should be generated and stored, then
 * returned to wallet for a response. The response will contain an invoice 
 * that is decoded and verified, then sent for payment.
 */

/**
 * Authenticate the user, then return an lnurl containing the withdraw endpoint, 
 * plus an encrypted json object with the account name, user's key, and timestamp.
 */

import { getCollection } from '@/lib/controller'
import { AccountModel }  from '@/models/account'
import { utils }         from '@noble/secp256k1'
import { decrypt }       from '@/lib/crypto';
import { errorHandler }  from '@/lib/error';
import { getBalance, payInvoice } from '@/lib/api';

const pending = new Map();
 
export default async function claimWithdraw(req, res) {
  /* Process to claim a withdraw.
  */

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(405).end();

  // Grab our required params from host body.
  const { host } = req.headers;
  const { s, ref, k1, pr } = req.query;

  if (ref && k1 && pr) return processWithdraw(req, res)

  if (!s) {
    return res.status(400).json({
      'status': 'ERROR', 'reason': 'Missing parameters!'
    })
  }
 
  try {
    // Fetches the collection, and checks if the slug exists.

    const { slug, key } = JSON.parse(await decrypt(s));

    const accounts = await getCollection(AccountModel),
          account  = await accounts.findOne({ slug });
    
    if (!account) {
      return res.status(200).json({ 
        'status': 'ERROR', 'reason': 'Account does not exist!'
      });
    }

    const { adminKey, invoiceKey, walletKey } = account;

    if (adminKey !== key) {
      return res.status(200).json({ 
        'status': 'ERROR', 'reason': 'You are not authorized to do that!'
      });
    }

    const { balance } = await getBalance(invoiceKey);

    if (!balance) {
      return res.status(500).json({ 
        'status': 'ERROR', 'reason': 'Failed to fetch a balance! Try again later.'
      });
    }

    const ref = Buffer.from(utils.randomBytes(5)).toString('base64url'),
          msg = utils.bytesToHex(utils.randomBytes(32));

    pending.set(ref, { msg, walletKey })
        
    return res.status(200).json({
      'tag': 'withdrawRequest', // type of LNURL
      'callback': `https://${host}/api/withdraw/claim?ref=${ref}`,
      'k1': msg,
      'defaultDescription': `Withdraw from ${slug} on sats4.tips`,
      'minWithdrawable': 10,
      'maxWithdrawable': balance - 10
    });

  } catch(err) { errorHandler(req, res, err) }
}

async function processWithdraw(req, res) {
  const { ref, k1, pr } = req.query;

  if (pending.has(ref)) {
    const { msg, walletKey } = pending.get(ref)
    if (msg === k1) {
      const { payment_hash } = await payInvoice(pr, walletKey);
      if (payment_hash) {
        pending.delete(ref)
        return res.status(200).json({ 'status': 'OK' });
      }
    }
  }

  return res.status(400).json({
    'status': 'ERROR', 'reason': 'Failed to withdraw invoice!'
  })
}