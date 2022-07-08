/** withdraw/claim.js
 */

import bolt11            from 'bolt11'
import { getCollection } from '@/lib/controller'
import { AccountModel }  from '@/models/account'
import { utils }         from '@noble/secp256k1'
import { decrypt }       from '@/lib/crypto';
import { getBalance, payInvoice } from '@/lib/api';

const pending = new Map();
 
export default async function claimWithdraw(req, res) {
  /* Process to claim a withdraw.
  */

  // Reject all methods other than GET.
  if (req.method !== 'GET') return res.status(405).end();

  // Grab our required params from host body.
  const { host } = req.headers;
  const { s, ref, k1, pr } = req.query;

  if (ref && k1 && pr) return processWithdraw(req, res);

  if (!s) {
    return res.status(200).json({
      'status': 'ERROR', 
      'reason': 'Missing parameters!'
    })
  }
 
  try {
    // Fetches the collection, and checks if the slug exists.

    const { slug, apikey, memo, amt = 10 } = JSON.parse(await decrypt(s));

    const accounts = await getCollection(AccountModel),
          account  = await accounts.findOne({ slug });
    
    if (!account) {
      return res.status(200).json({ 
        'status': 'ERROR', 
        'reason': 'Account does not exist!'
      });
    }

    const { invoiceKey, walletKey } = account.keys;

    if (walletKey !== apikey) {
      return res.status(200).json({ 
        'status': 'ERROR', 
        'reason': 'You are not authorized to withdraw!'
      });
    }
    
    const decryptedKey = await decrypt(invoiceKey)
    const { balance } = await getBalance(decryptedKey);

    if (!balance) {
      return res.status(200).json({ 
        'status': 'ERROR', 
        'reason': 'Failed to fetch a balance! Try again later.'
      });
    }

    const ref = Buffer.from(utils.randomBytes(5)).toString('base64url'),
          msg = utils.bytesToHex(utils.randomBytes(32)),
          withdrawAmt = Math.min(amt, (balance / 1000 - 10));

    pending.set(ref, { msg, walletKey, withdrawAmt })
        
    return res.status(200).json({
      'tag': 'withdrawRequest',
      'callback': `https://${host}/api/withdraw/claim?ref=${ref}`,
      'k1': msg,
      'defaultDescription': `Withdraw from sats4.tips/${slug}: ${memo}`,
      'minWithdrawable': withdrawAmt,
      'maxWithdrawable': withdrawAmt
    });

  } catch(err) { 
    console.error(err);
    return res.status(200).json({ 
      'status': 'ERROR', 
      'reason': 'Server failed!. Please try again later.'
    });
  }
}

async function processWithdraw(req, res) {
  const { ref, k1, pr } = req.query;

  if (pending.has(ref)) {
    const { msg, walletKey, withdrawAmt } = pending.get(ref);
    const { millisatoshis } = bolt11.decode(pr);

    if (Number(withdrawAmt) !== Number(millisatoshis)) {
      return res.status(200).json({
        'status': 'ERROR', 
        'reason': 'Unauthorized withdraw amount.'
      })
    }

    if (msg === k1) {
      const decryptedKey = await decrypt(walletKey)
      const data = await payInvoice(pr, decryptedKey);

      if (data?.payment_hash) {
        pending.delete(ref)
        return res.status(200).json({ 'status': 'OK' });
      }

      console.error(data)
      
      return res.status(200).json({
        'status': 'ERROR', 
        'reason': data?.detail
      })
    }
  }

  return res.status(200).json({
    'status': 'ERROR', 
    'reason': 'Withdraw expired! Generate a new invoice and try again.'
  })
}
