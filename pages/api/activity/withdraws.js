import { listPayments }  from '@/lib/api'
import { decrypt }       from '@/lib/crypto';
import { errorHandler }  from '@/lib/error';
import { mockWithdraws } from '@/lib/mockdata';
import { hasAccountEntry } from '@/lib/auth';
import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(getWithdraws);

async function getWithdraws(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(400).end();

  // Reject sessions without a login or wallet.
  if (!req?.session?.user) {
    return res.status(401).end()
  }

  const { slug } = req.query;
  
  // Reject users without a key stored for this account.
  if (!hasAccountEntry(req.session, slug)) {
    return res.status(403).end()
  }

  // Grab access key from the query.
  const apikey = req.session.wallet[slug]

  try {
    const decryptedKey = await decrypt(apikey),
          transactions = await listPayments(decryptedKey);

    let withdraws;
    
    if (process.env.MOCK_PAYMENTS === 'true') {
      // withdraws = mockWithdraws()
    } else {
      withdraws = transactions
        .filter(t => !t.pending)
        .filter(t => t.amount < 0)
        .map(t => {
          console.log(t)
          return {
            amt  : t.amount,
            fee  : t.fee,
            msg  : t.memo,
            date : t.time
          }
        })
    }
    
    return res.status(200).json({ withdraws })
  } catch(err) { errorHandler(req, res, err) }
}