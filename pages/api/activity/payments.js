import { listPayments } from '@/lib/api'
import { decrypt }      from '@/lib/crypto';
import { errorHandler } from '@/lib/error';
import { mockPayments } from '@/lib/mockdata';

export default async function getPayments(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Grab access key from the query.
  let { apikey } = req.query;

  if (!apikey) res.status(400).end();

  try {
    const decryptedKey = await decrypt(apikey),
          transactions = await listPayments(decryptedKey);

    let payments;
    
    if (process.env.MOCK_PAYMENTS === 'true') {
      payments = mockPayments()
    } else {
      payments = transactions
        .filter(t => !t.pending)
        .filter(t => t.amount > 0)
        .map(t => {
          return {
            amt  : t.amount,
            msg  : t.extra.comment,
            date : t.time
          }
        })
    }
    
    return res.status(200).json({ payments })
  } catch(err) { errorHandler(req, res, err) }
}