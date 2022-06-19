import { listPayments }  from '@/lib/api'
import { decrypt }       from '@/lib/crypto';
import { errorHandler }  from '@/lib/error';
import { mockWithdraws } from '@/lib/mockdata';

export default async function getWithdraws(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Grab access key from the query.
  let { invoiceKey } = req.query;

  if (!invoiceKey) res.status(400).end();

  try {
    const decryptedKey = await decrypt(invoiceKey)
          transactions = await listPayments(decryptedKey);

    let withdraws;
    
    if (process.env.MOCK_PAYMENTS === 'true') {
      withdraws = mockWithdraws()
    } else {
      withdraws = transactions
        .filter(t => !t.pending)
        .filter(t => t.amount < 0)
        .map(item => {
          return {
            amount: item.amount,
            msg: item.extra.comment,
            date: item.time
          }
        })
    }
    
    return res.status(200).json({ withdraws })
  } catch(err) { errorHandler(req, res, err) }
}