import { listPayments } from '@/lib/api'
import { decrypt }      from '@/lib/crypto';
import { errorHandler } from '@/lib/error';

export default async function getTransactions(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Grab the slug and url from the post body.
  let { invoiceKey } = req.query;

  if (!invoiceKey) res.status(400).end();

  try {
    const decryptedKey = await decrypt(invoiceKey),
          transactions = await listPayments(decryptedKey);
    
    const payments = transactions.map(item => {
      return {
        amount: item.amount,
        msg: item.extra.comment,
        date: item.time,
        txid: null,
      }
    })
    
    return res.status(200).json({payments: payments})
  } catch(err) { errorHandler(req, res, err) }
}